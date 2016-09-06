import find from "lodash.find";

export default class Collection
{
    constructor (constraints = [])
    {
        this.constraints = [];

        constraints.forEach(constraint => {
            this.add(constraint);
        });
    }

    /**
     * @return {Promise<boolean>}
     */
    validate (value)
    {
        if (this.constraints.length === 0) {
            return Promise.resolve(true);
        }

        return new Promise((resolve, reject) => {

            var promises = this.constraints.map(c => c.validate(value));

            Promise.all(promises)
                .then(results => results.filter(isValid => isValid === false).length === 0)
                .then(resolve)
                .catch(e => {
                    console.log("validation error", e);
                    reject(e);
                })
            ;
        });
    }

    get length ()
    {
        return this.constraints.length;
    }

    get isValidating ()
    {
        if (this.constraints.length === 0) {
            return false;
        }

        return !!find(this.constraints, c => c.isValidating);
    }

    get isValid ()
    {
        if (this.constraints.length === 0) {
            return true;
        }

        return !find(this.constraints, c => !c.isValid);
    }

    add (constraint)
    {
        if (!this.has(constraint.type)) {
            this.constraints.push(constraint);
        }
    }

    get (type)
    {
        if (this.constraints.length > 0) {
            for (let c of this.constraints) {
                if (c.type === type) {
                    return c;
                }
            }
        }

        return null;
    }

    has (type)
    {
        return !!this.get(type);
    }

    filter (callback) { return this.constraints.filter(callback); }
    forEach (callback) { return this.constraints.forEach(callback); }
    map (callback) { return this.constraints.map(callback); }
    reduce (callback, initialValue) { return this.constraints.reduce(callback, initialValue); }

    get errors ()
    {
        if (this.constraints.length === 0) {
            return null;
        }

        return this.reduce((errors, c) => {
            if (c.isValid === false) {
                errors[c.type] = c.isValid;
            }
            return errors;
        }, {});
    }
}

Collection.create = function (constraints) {
    if (constraints instanceof Collection) {
        return constraints;
    }

    return new Collection(constraints);
};
