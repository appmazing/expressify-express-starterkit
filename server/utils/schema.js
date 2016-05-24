import Joi from 'joi';

export const mapErrors = (errors) => {
    const map = {};

    if(errors !== null) {
        errors.details.forEach((error) => {
            let { path, type, message } = error;

            if(!Array.isArray(map[path])) {
                map[path] = [];
            }

            map[path].push({
                type,
                message,
            });
        });
    }

    return map;
};

/**
 * Convert Joi schema compiled object to Waterline attributes
 * Warning: basic `type` attribute handling only, Joi should do validation
 *
 * @param {Object} schema - Schema
 * @return {Object} attributes
 */
export const toWaterline = (schema) => {
    let attributtes = {};

    schema._inner.children.forEach((rule) => {
         attributtes[rule.key] = {
            type: rule.schema._type,
         };
     });

     return attributtes;
};

export const validate = (values, schema, cb) => {

    let options = {
        /* otherwise returns all the errors found */
        abortEarly: false,

        /* allows object to contain unknown keys which are ignored */
        allowUnknown: true,

        /* ignores unknown keys with a function value */
        skipFunctions: true,
    };

    Joi.validate(values, schema, options, (err, values) => {
        const validation = {
            values,
            raw: err,
            isValid: (err === null),
            errors: mapErrors(err),
        };

        cb(validation);
    });
};
