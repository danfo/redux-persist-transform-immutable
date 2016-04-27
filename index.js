var transit = require('transit-immutable-js')
var reduxPersist = require('redux-persist')

module.exports = function (config) {
  // Optionally accept Immutable records for transit
  if(typeof config === 'object' && Array.isArray(config.records)) {
    transit = transit.withRecords(config.records)
  }

  return reduxPersist.createTransform(
    function(state){
      if(state && typeof state === 'object'){
        return transit.toJSON(state)
      }
      return state
    },
    function(raw){
      if(typeof raw === 'string'){
        return transit.fromJSON(raw)
      }
      return raw
    },
    config
  )
}
