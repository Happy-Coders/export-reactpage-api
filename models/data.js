var mongoose = require('mongoose')
const Schema = mongoose.Schema;

const DataSchema = new Schema({
    componentsArray: {
      type: Object,
      required: true
    }
  });
  
  exports.Components =  mongoose.model("Components", DataSchema);