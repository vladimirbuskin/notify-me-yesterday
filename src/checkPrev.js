import fs from 'fs'
import Promise from 'bluebird'


var writeFile = Promise.promisify(fs.writeFile);
var readFile = Promise.promisify(fs.readFile);

var res = {

}

export default async function(resultName, newValue) {
  

  // get prevValue
  var prevValue = res[resultName];
  res[resultName] = newValue;

  // value changed
  if (prevValue != newValue) {
    return newValue;
  }
  return null;
}