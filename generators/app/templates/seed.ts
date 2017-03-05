/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */
// List of the component facades (name in plural form)
//const moduleName1s = require('./components/moduleName1/facade');
//const moduleName2s = require('./components/moduleName2/facade');

Promise.all([
    // Populate agencies table
    /*moduleName1s.Schema.find({}).remove()
        .then(() => moduleName1s.Schema.create({
            _id: "1000000032fbdd001ede0005",
            property1: "value1",
            property2: "value2",
            _deactivated: null,
            _modified: "2017-02-01T11:35:12.081Z",
            _created: "2017-01-30T14:26:02.298Z"
        }, {
            _id: "1000000032fbdd001ede0006",
            property1: "value1",
            property2: "value2",
            _deactivated: null,
            _modified: "2017-02-01T13:27:17.004Z",
            _created: "2017-02-01T11:26:38.699Z"
        })),
    moduleName2s.Schema.find({}).remove()
        .then(() => moduleName2s.Schema.create({
            _id: "1000000032fbdd001ede0007",
            property1: "value1",
            property2: "value2"
        }))*/
]).then(() => {
    console.log('Finished populating DB.');
});
