import Constraint from "./Constraint";

export default class NotBlank extends Constraint
{
    _validate (value)
    {
        return !!(value && typeof value === "string" && value.trim().length > 0);
    }
}

NotBlank.type = "notBlank";