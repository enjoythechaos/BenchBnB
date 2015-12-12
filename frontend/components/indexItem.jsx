var React = require('react');
var ApiUtil = require('../util/api_util.js');

var IndexItem = React.createClass({
  _onHover: function() {
    ApiUtil.updateHoveredBench(this.props.id);
  },

  _offHover: function() {
    ApiUtil.updateHoveredBench(null);
  },

  render: function() {
    return (
      <div onMouseEnter={this._onHover} onMouseLeave={this._offHover}>
        {this.props.description}
      </div>
    )
  }
});

module.exports = IndexItem;
