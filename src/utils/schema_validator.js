import Joi from "joi";
import { BadRequestError } from "./app_errors.js";

const songSchema = Joi.object({
  title: Joi.string().required(),
  artist: Joi.string().required(),
}).strict();

const addSongSchema = Joi.object({
  songId: Joi.string().required(),
}).strict();

/**
 *this function validates a song object against the defined schema.
 In case of validation failure, it throws a BadRequestError.
 *
 * @export
 * @param {*} body
 * @param {string} [instance=""]
 */
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

/**
 *this function validates an add song request object against the defined schema.
  In case of validation failure, it throws a BadRequestError.  
 *
 * @export
 * @param {*} body
 * @param {string} [instance=""]
 */
export function validateAddSongSchema(body, instance = "") {
  const { error } = addSongSchema.validate(body, { abortEarly: true });
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
