import Joi from 'joi';

export const productIdSchema = Joi.object().keys({
  id: Joi.string().length(36).required(),
});

export const productNameSchema = Joi.object().keys({
  name: Joi.string().min(3).required(),
});
