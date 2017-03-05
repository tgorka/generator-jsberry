class Controller {

    constructor(facade) {
        this.facade = facade;
    }

    find(req, res, next) {
        return this.facade.find(req.query, '-__v')
            .then(collection => res.status(200).json(collection))
            .catch(err => next(err));
    }

    findOne(req, res, next) {
        return this.facade.findOne(req.query, '-__v')
            .then(doc => res.status(200).json(doc))
            .catch(err => next(err));
    }

    findById(req, res, next) {
        return this.facade.findById(req.params.id, '-__v')
            .then(doc => {
                if (!doc) {
                    return res.status(404).end();
                }
                return res.status(200).json(doc);
            })
            .catch(err => next(err));
    }

    create(req, res, next) {
        this.facade.create(this.validateParams(req.body))
            .then(doc => res.status(201).json(doc))
            .catch(err => next(err));
    }

    update(req, res, next) {
        const conditions = {_id: req.params.id};
        this.facade.findById(req.params.id)
            .then(doc => {
                if (!doc) {
                    return res.status(404).end();
                }
                let input = this.validateParams(req.body);
                return this.facade.update(conditions, input)
                    .then(db => res.status(200).json(db));
            }).catch(err => next(err));
    }

    remove(req, res, next) {
        this.facade.remove(req.params.id)
            .then(doc => {
                if (!doc) {
                    return res.status(404).end();
                }
                return res.status(204).end();
            })
            .catch(err => next(err));
    }

    import(req, res, next) {
        this.facade.import(req.params.id); // only notify about the import
        return res.status(204).end();
    }

    validateParams(input) {
        if (input) {
            Object.keys(input).forEach(key => {
                if (/^_/g.test(key)) {
                    delete input[key];
                }
            });
        }
        return input;
    }

}

module.exports = Controller;
