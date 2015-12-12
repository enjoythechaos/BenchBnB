var ApiActions = require('../actions/api_actions')

ApiUtil = {
  fetchBenches: function(bounds) {
    $.get("api/benches", bounds, function(benches){
      ApiActions.receiveAll(benches);
    });
  },

  updateHoveredBench: function(benchId) {
    ApiActions.receiveHoveredBench(benchId);
  }
}

window.ApiUtil = ApiUtil;

module.exports = ApiUtil;
