import * as mongoose from "mongoose";

const Schema = mongoose.Schema;


const componentSchema = new Schema({

    // Schema meta peroperties (starting with '_')
    _created: {type: Date, default: Date.now},
    _modified: {type: Date, default: Date.now},
    _deactivated: {type: Date, default: null},

    // Schema properties
    //property1: {type: String, default: null},
    //property2: {type: String, default: null}

});

// TODO: export with module name.
module.exports = mongoose.model('moduleName1s', componentSchema);


