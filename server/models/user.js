import Waterline from 'waterline';
import Joi from 'joi';

import { toWaterline, validate } from '../utils/schema';

const connection = 'mongo';
const identity = 'user';

/**
 * Do custom things on model input
 */
const onModelInput = (values, next) => {
    next();
}

/**
 * Despite it's called `onValidationEnd` it's in fact validate input with Joi
 */
const onValidationEnd = (values, next) => {
    validate(values, joiSchema, (validation) => {
        if (!validation.isValid) {
            return next(validation.errors);
        }

        next();
    });
}

/**
 * Joi schema for our model advanced validation
 */
const joiSchema = Joi.object().keys({
    name: Joi.string().min(5).required(),
    password: Joi.string().required(),
    email: Joi.string().email(),
    roles: Joi.array().min(1).items(Joi.string().valid('admin', 'user'))
});

/* Waterline attributes extended with methods to overwrite */
const attributes = Object.assign(toWaterline(joiSchema), {
    toJSON: function () {

      var model = this.toObject();

      /* safety */
      delete model.password;

      return model;
    }
});

export default Waterline.Collection.extend({
    connection,
    identity,
    attributes,

    beforeDestroy: onModelInput,
    beforeValidate: onModelInput,
    afterValidate: onValidationEnd
});
