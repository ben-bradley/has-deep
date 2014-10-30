module.exports = function (object, path) {
  var properties = path.split('.'),
    has = true;
  while (properties.length) {
    var prop = properties.shift();
    if (!has) continue;
    else if (hasProp(object, prop)) object = object[prop];
    else if (has) has = false;
  }
  if (has) return object;
  else return has;
}

function hasProp(thing, prop) {
  return thing &&
    thing.toString() === '[object Object]' &&
    thing.hasOwnProperty(prop);
}
