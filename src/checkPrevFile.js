import fs from 'fs'
import Promise from 'bluebird'
import jsdiff from 'diff'

var writeFile = Promise.promisify(fs.writeFile);
var readFile = Promise.promisify(fs.readFile);



export default async function(resultName, newValue) {
  
  let fileName = './data/'+resultName;

  try {
    var prevValue = await readFile(fileName, 'utf8');
    // value changed
    if (prevValue != newValue) {
      await writeFile(fileName, newValue);

      var diff = jsdiff.diffChars(prevValue, newValue);

      console.log(diff);

      return diff;
    }
    // value the same
    else
    {
      return null;
    }
  }
  catch(e) {
    // file not exists, write value
    await writeFile(fileName, newValue);
    return newValue;
  }
}