import fs from 'fs'
import Promise from 'bluebird'
import { CronJob } from 'cron'
import Koa from 'koa-mr'

import getCached from './getCached'
import getNotCached from './getNotCached'
import checkPrev from './checkPrev'
import checkPrevFile from './checkPrevFile'
import Notifier from './notifier'

const app = new Koa()
let notifier = null;
let lastValue = null;

async function run() {

  console.log('====================')

  lastValue = await getValue();

  // save and check if changed
  var changedValue = await checkPrevFile('zapis.html', lastValue);
  
  // update last value
  notifier.updateLast(lastValue);

  // if changed
  if (changedValue) {
    console.log('Value Changed, Notify!'); 
    notifier.send(changedValue, {address:'me'});
  }
  else {
    console.log('Not Changed.');
  }

}

async function getValue() {

  console.log('====================')

  var $ = await getNotCached(
    'http://www.gofortravel.ru/usa/visa/application/our-help/latest-news'
  )
  
  // get newValue
  var comm = $('.comments-list')
  var bodies = comm.find('.comment-body')

  var bds = [];
  bodies.each(function(i, elem) {
    bds[i] = $(this).text();
  });

  lastValue = bds.slice(0,3).join('\n========================\n');

  return lastValue;
}

notifier = Notifier({getValue})

// return 
/*app.get('/', function (ctx) {
  ctx.body = lastValue
})*/

// create check job
let job = new CronJob(
  '*/5 * * * * *', 
  // fire
  function () {
    //console.log('You will see this message every second', new Date());
    run();
  }, 
  // stop
  function () {
    console.log('Stop')
  }, 
  // start
  true, 
  // timezone
  'America/Los_Angeles'
);