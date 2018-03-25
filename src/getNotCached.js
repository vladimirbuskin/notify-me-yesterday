import axios from 'axios'
import cheerio from 'cheerio'

export default async function(url, options = {}) {
  var content = '';

  console.log('load from url');
  var res = await axios.get('http://www.gofortravel.ru/usa/visa/application/our-help/latest-news');
  content = res.data;
  console.log('content length: ' + content.length)

  return cheerio.load(content);
}