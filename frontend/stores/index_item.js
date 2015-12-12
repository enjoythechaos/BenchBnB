var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var IndexItemStore = new Store(AppDispatcher);
var BenchConstants = require('../constants/bench_constants');

var _hoveredBenchId = null;

IndexItemStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case BenchConstants.RECEIVE_HOVERED_BENCH:
      _hoveredBenchId = payload.benchId;
      IndexItemStore.__emitChange();
      break;
  }
};

IndexItemStore.getHighlightedBenchId = function() {
  console.log("Store function was called.")
  return _hoveredBenchId;
};

module.exports = IndexItemStore;
