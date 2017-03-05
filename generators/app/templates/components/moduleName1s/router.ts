import {Router} from "express";

const router = Router();

const controller = require('./controller');


router.route('/')
    .get((...args) => controller.find(...args))
    .post((...args) => controller.create(...args));

router.route('/:id')
    .put((...args) => controller.update(...args))
    .get((...args) => controller.findById(...args))
    .delete((...args) => controller.remove(...args));

module.exports = router;
