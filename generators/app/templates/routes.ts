import {Router} from "express";

const router = Router();

// List of the component router instances  (name in plural form)
//const moduleName1s = require('./components/moduleName1/router');
//const moduleName2s = require('./components/moduleName2/router');


router.route('/').get((req, res) => {
    res.json({message: 'Welcome to <%= name %> API!'});
});

// Redirect urls with prefix to the right module
// (hint: a API version as a prefix to the route)
//router.use('/v1/moduleName1', moduleName1s);
//router.use('/v1/moduleName2', moduleName2s);

module.exports = router;
