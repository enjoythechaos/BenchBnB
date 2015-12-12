var React = require('react');
var ReactDOM = require('react-dom');
var ApiUtil = require('./util/api_util');
var BenchStore = require('./stores/bench');
var IndexItemStore = require('./stores/index_item');
var Index = require('./components/index');
var Map = require('./components/map');
var Search = require('./components/search');

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(<Search/>, document.getElementById('content'))
})
