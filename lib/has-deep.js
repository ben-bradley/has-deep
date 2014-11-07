module.exports = function (object, path) {
  return test(object, path.split('.'));
}

function hasProperty(object, prop) {
  return object &&
    object.toString() === '[object Object]' &&
    object.hasOwnProperty(prop);
}

function hasArray(object, prop, index) {
  return object &&
    object.toString() === '[object Object]' &&
    object[prop] &&
    Array.isArray(object[prop]) &&
    object[prop][index];
}

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
