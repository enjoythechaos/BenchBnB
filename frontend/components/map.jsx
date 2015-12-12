var React = require('react');
var BenchStore = require('../stores/bench');
var IndexItemStore = require('../stores/index_item');
var ApiUtil = require('../util/api_util');

//api key = AIzaSyB4uHOvxYp5dvx4v2gybIUuv2bYcs12HbE

var Map = React.createClass({
  getInitialState: function() {
    this.highlightedBenchId = null;
    return {markers: {}}
  },

  _updateHighlightedMarker: function() {
    console.log("got into view listener")
    var highlightedBenchId = IndexItemStore.getHighlightedBenchId();
    if (this.highlightedBenchId !== null) {
      this.state.markers[this.highlightedBenchId].setAnimation(null);
    }
    if (highlightedBenchId !== null) {
      this.state.markers[highlightedBenchId].setAnimation(google.maps.Animation.BOUNCE);
    }
    this.highlightedBenchId = highlightedBenchId;
  },

  _onChange: function() {
    var benchArray = BenchStore.all();
    var benches = {};
    // set up a benches object corresponding to benchArray

    benchArray.forEach(function(bench){
      benches[bench.id] = bench;
    });

    var result = {};

    // If old markers are still needed, make sure they are in the result
    // object.  Otherwise, set their map to null.

    for(var oldBenchId in this.state.markers) {
      if(this.state.markers.hasOwnProperty(oldBenchId)){
        if (typeof benches[oldBenchId] === 'undefined') {
          this.state.markers[oldBenchId].setMap(null);
        } else {
          result[oldBenchId] = this.state.markers[oldBenchId];
        }
      }
    }

    var that = this;

    // Add new markers for the benches that were not already on the map.

    for(var newBenchId in benches) {
      if (benches.hasOwnProperty(newBenchId)) {
        if (typeof this.state.markers[newBenchId] === 'undefined') {
          var bench = benches[newBenchId];
          var myLatLng = {lat: bench.lat, lng: bench.lng};
          result[newBenchId] = new google.maps.Marker({
            position: myLatLng,
            map: that.map,
            title: bench.description
          });
        }
      }
    }

    // Update the markers in state to match the result object we created.

    this.setState({markers: result});
  },

  componentDidMount: function(){
    var map = React.findDOMNode(this.refs.map);
    var mapOptions = {
      center: {lat: 37.7758, lng: -122.435},
      zoom: 13
    };
    this.map = new google.maps.Map(map, mapOptions);
    var that = this;
    this.map.addListener('idle', function() {
      console.log(that.state.markers);
      var bounds = that.map.getBounds();
      var northEast = bounds.getNorthEast();
      var southWest = bounds.getSouthWest();
      var obj = {
        northEast: {
          lat: northEast.lat(),
          lng: northEast.lng(),
        },
        southWest: {
          lat: southWest.lat(),
          lng: southWest.lng()
        }
      }
      ApiUtil.fetchBenches({bounds: obj});
    });

    BenchStore.addListener(this._onChange);
    IndexItemStore.addListener(this._updateHighlightedMarker);
  },

  render: function() {
    return (
      <div className="Map" ref="map">
      </div>
    )
  }
});

module.exports = Map;
