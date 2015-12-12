var React = require('react');
var Map = require('./map');
var Index = require('./index');

var Search = React.createClass({
  render: function() {
    return (
      <div>
        <Index/>
        <Map/>
      </div>
    );
  }
});

module.exports = Search;
