import axios from 'axios'
import fs from 'fs'
import Promise from 'bluebird'
import cheerio from 'cheerio'


var writeFile = Promise.promisify(fs.writeFile);
var readFile = Promise.promisify(fs.readFile);

var access = Promise.promisify(fs.access);


export default async function(url, options = {}) {
  
  let fileName = './index.html';
  let content = "";
  let skipParse = !!options.skipParse
  let skipCache = !!options.skipCache

  try {
    if (skipCache) throw new Error('load');

    var st = await access(fileName);
    console.log('file exists: ' + fileName);
    content = await readFile(fileName, 'utf8');
  }
  catch(e) {
    // not exists
    // load and cache
    console.log('load from url');
    var res = await axios.get('http://www.gofortravel.ru/usa/visa/application/our-help/latest-news');
    await writeFile('./index.html', res.data)
    content = res.data;
  }

  console.log('content length: ' + content.length)


  return skipParse ? content : cheerio.load(content);
}