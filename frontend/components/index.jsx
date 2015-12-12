var React = require('react');
var BenchStore = require('../stores/bench');
var ApiUtil = require('../util/api_util');
var IndexItem = require('./indexItem');

var Index = React.createClass({
  getInitialState: function() {
    return ({benches: BenchStore.all()});
  },

  _onChange: function() {
    this.setState({benches: BenchStore.all()});
  },

  componentDidMount: function(){
    //refactor using a listener token.
    BenchStore.addListener(this._onChange);
    ApiUtil.fetchBenches();
  },

  componentWillUnmount: function() {
    //refactor using a listener token.
    BenchStore.removeListener(this.onChange);
  },

  render: function() {
    console.log("Here we are inside Index.render");
    console.log(this.state.benches);
    return (
      <div>
        {
          this.state.benches.map(function(bench){
            return <IndexItem id={bench.id} description={bench.description}/>
          })
        }
      </div>
    );
  }

});

module.exports = Index;
