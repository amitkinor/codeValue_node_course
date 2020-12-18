import Joi from 'joi';

export const productIdSchema = Joi.object().keys({
  id: Joi.string().min(3).required(),
});

export const productNameSchema = Joi.object().keys({
  name: Joi.string().min(3).required(),
});
