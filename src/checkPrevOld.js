import fs from 'fs'
import Promise from 'bluebird'


var writeFile = Promise.promisify(fs.writeFile);
var readFile = Promise.promisify(fs.readFile);



export default async function(resultName, newValue) {
  
  let fileName = './data/'+resultName+'.txt';

  try {
    var prevValue = await readFile(fileName, 'utf8');
    // value changed
    if (prevValue != newValue) {
      await writeFile(fileName, newValue);
      return newValue;
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