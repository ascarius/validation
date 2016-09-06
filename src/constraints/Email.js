import validator from "email-validator";

import Constraint from "./Constraint";

export default class Email extends Constraint
{
    _validate (value)
    {
        if (!value || value.length === 0) {
            return null;
        }

        return validator.validate(value);
    }
}

Email.type = "email";