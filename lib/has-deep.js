module.exports = function (object, path) {
  return test(object, path.split('.'));
}

function hasProperty(object, prop) {
  return object &&
    object.toString() === '[object Object]' &&
    object.hasOwnProperty(prop);
}

function test(object, properties) {
  if (properties.length === 0)
    return object;
  var property = properties.shift();
  if (hasProperty(object, property))
    return test(object[property], properties);
  return undefined;
}
