module.exports = hasDeep;

/**
 * Core function
 * @param   {Object} object The object to check for deep-property definition
 * @param   {String} path   A string representing the property path to validate
 * @returns {Multi}  Returns the value if defined, else undefined
 */
function hasDeep(object, path) {
  if (!isObject(object))
    throw new Error('Invalid object: ', object);
  else if (typeof path !== 'string')
    throw new Error('Invalid property path: ', path);
  return test(object, path.split('.'));
}

/**
 * Simple object validation
 * @param   {Object}  object The object to validate
 * @returns {Boolean} True if object is an Object
 */
function isObject(object) {
  return object &&
    typeof object === 'object' &&
    object.toString() === '[object Object]';
}

/**
 * Basic property checker
 * @param   {Object}  object This is the object to check
 * @param   {String}  prop   This is the property to check on the object
 * @returns {Boolean} Returns true if property exists, else undefined
 */
function hasProperty(object, prop) {
  return isObject(object) &&
    object.hasOwnProperty(prop);
}

/**
 * Checks if the element exists in an array
 * @param   {Object}  object The object to check
 * @param   {String}  prop   The property that should be an array
 * @param   {Number}  index  The array index to check on object.prop
 * @returns {Boolean} Returns true if element in array on object.prop is defined
 */
function hasArray(object, prop, index) {
  return hasProperty(object, prop) &&
    Array.isArray(object[prop]) &&
    object[prop][index] !== undefined;
}

/**
 * Recursive function to evaluate if an object has a property deeply
 * @param   {Object} object     This is the root object to check
 * @param   {Array}  properties This is an array of strings of property names
 * @returns {Multi}  Returns the value if defined, else undefiend
 */
function test(object, properties) {
  if (properties.length === 0)
    return object;
  var property = properties.shift();
  var propHasArrayIndex = property.match(/(.+)\[(\d+)\]$/);
  if (propHasArrayIndex) {
    var prop = propHasArrayIndex[1],
      index = propHasArrayIndex[2];
    if (hasArray(object, prop, index))
      return test(object[prop][index], properties);
  } else if (hasProperty(object, property))
    return test(object[property], properties);
  return undefined;
}
