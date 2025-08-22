import Joi from "joi";
import { BadRequestError } from "./app_errors.js";

const songSchema = Joi.object({
  title: Joi.string().required(),
  artist: Joi.string().required(),
}).strict();

export function validateSongSchema(body, instance = "") {
  const { error } = songSchema.validate(body, { abortEarly: true });
  if (error) {
    throw new BadRequestError({
      type: "https://example.com/validation-error",
      title: "Bad Request Error",
      status: 400,
      detail: error.details[0].message,
      instance,
    });
  }
}
