var AppDispatcher = require('../dispatcher/dispatcher');
var BenchConstants = require('../constants/bench_constants');

var ApiActions = {
  receiveAll: function(benches) {
    AppDispatcher.dispatch({
      actionType: BenchConstants.BENCHES_RECEIVED,
      benches: benches
    });
  },

  receiveHoveredBench: function(benchId) {
    AppDispatcher.dispatch({
      actionType: BenchConstants.RECEIVE_HOVERED_BENCH,
      benchId: benchId
    })
  }
};

module.exports = ApiActions;
