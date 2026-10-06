const Joi = require('joi');

const validateUser = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.number().integer().positive().required(),
    name: Joi.string().min(2).max(50).trim().required()
  });

  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    return res.status(400).json({
      success: false,
      errors: error.details.map(d => d.message)
    });
  }

  req.body = value; // clean chesina data
  next();
};

module.exports = validateUser;