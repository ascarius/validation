import Collection from "./Collection";

export default class Factory
{
    constructor (constraints = [])
    {
        this.constraints = {};

        if (constraints.length) {
            constraints.forEach(constraint => this.add(constraint));
        }
    }

    create (options)
    {
        if (options instanceof Collection) {
            return options;
        }

        if (Array.isArray(options)) {
            return this.createFromArray(options);
        }

        if (typeof options === "object") {
            return this.createFromObject(options);
        }

        return new Collection();
    }

    createFromArray (options)
    {
        let constraints = options
            .map(c => {
                if (c instanceof Constraint) {
                    return c;
                }

                if (typeof c === "string") {
                    return this.createByName(c);
                }

                return null;
            })
            .filter(c => c !== null)
        ;

        return new Collection(constraints);
    }

    createFromObject (options)
    {
        let constraints = [];

        for (let name in options) {
            return this.createByName(name, options[name]);
        }

        return new Collection(constraints);
    }

    createByName (name, options)
    {
        let constructor = this.get(name);

        if (!constructor) {
            throw new Error(`Constraint "${name}" not recognized`);
        }

        return new constructor(options);
    }

    add (constructor)
    {
        this.constraints[constructor.name] = constructor;
    }

    remove (constructor)
    {
        this.constraints[constructor.name] = undefined;
    }

    get (name)
    {
        return this.constraints[name];
    }

    has (name)
    {
        return !!this.get(name);
    }
}
