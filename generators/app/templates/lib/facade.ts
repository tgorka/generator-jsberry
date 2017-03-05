
class Facade {
    constructor(Schema) {
        this.Schema = Schema;
    }

    create(input) {
        const schema = new this.Schema(input);
        return schema.save();
    }

    update(conditions, update) {
        update._modified = Date.now();

        return this.Schema
            .findOneAndUpdate(conditions, update, {new: true})
            .exec();
    }

    find(query) { // returns [] of not found
        query._deactivated = null;
        return this.Schema
            .find(query)
            .exec();
    }

    findOne(query) { // returns null if not found
        query._deactivated = null;
        return this.Schema
            .findOne(query)
            .exec();
    }

    findById(id) {
        return this.Schema
            .findById(id)
            .exec()
            .then(doc => (doc && !doc._deactivated) ? doc : null);
    }

    remove(id) {
        return this.update({_id: id}, {_deactivated: Date.now()});
        //return this.Schema
        //    .findByIdAndRemove(id)
        //    .exec();
    }

    importFun() {
        return input => this.import(input);
    }

    import(id) {
        console.log("TODO: implement import function. Called for id:", id);
    }
}

module.exports = Facade;
