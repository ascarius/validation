import Email from "./constraints/Email";
import NotBlank from "./constraints/NotBlank";

import Factory from "./Factory";

const factory = new Factory([
    Email,
    NotBlank
]);

export default factory;