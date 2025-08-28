/**
 *this function is a middleware to handle asynchronous errors in Express routes.
 *
 * @param {*} fn
 */
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
