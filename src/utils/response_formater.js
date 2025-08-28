/**
 *this function formats a response by wrapping the provided data in an object with a 'data' key.
 *
 * @export
 * @param {*} data
 * @return {*} 
 */
export default function formatResponse(data) {
  return { data };
}
