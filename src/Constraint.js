export default class Constraint
{
    constructor ()
    {
        this.isValid = false;
        this.isValidating = false;
    }

    get type ()
    {
        this.prototype.constructor.type;
    }

    /**
     * @param {any} value
     * @return {boolean|Promise<boolean>}
     */
    validate (value)
    {
        this.isValidating = true;
        return new Promise((resolve) => {
            Promise.resolve(this._validate(value))
                .then(isValid => {
                    this.isValidating = false;
                    this.isValid = isValid;
                    resolve(isValid);
                })
                .catch(e => {
                    console.log("validation error", e);
                    this.isValidating = false;
                    this.isValid = false;
                    resolve(false);
                })
            ;
        });
    }

    /**
     * @param {any} value
     * @return {boolean|Promise<boolean>}
     */
    _validate ()
    {
        return this.isValid;
    }
}
