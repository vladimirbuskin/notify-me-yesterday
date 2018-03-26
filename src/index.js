import fs from 'fs'
import Promise from 'bluebird'
import { CronJob } from 'cron'
import Koa from 'koa-mr'

import getCached from './getCached'
import getNotCached from './getNotCached'
import checkPrev from './checkPrev'
import Notifier from './notifier'

const app = new Koa()
const notifier = Notifier();
let lastValue = null;

async function run() {

  console.log('====================')

  var $ = await getNotCached(
    'http://www.gofortravel.ru/usa/visa/application/our-help/latest-news'
  )

  // get newValue
  var comm = $('#comment-body-16658')
  lastValue = comm[0].children[2].data;

  // save and check if changed
  var changedValue = await checkPrev('zapis', lastValue);
  
  // update last value
  notifier.updateLast(lastValue);

  // if changed
  if (changedValue) {
    console.log('Value Changed, Notify!'); 
    notifier.send(changedValue);
  }
  else {
    console.log('Not Changed.');
  }
}

// return 
app.get('/', function (ctx) {
  ctx.body = lastValue
})

// create check job
let job = new CronJob(
  '*/30 * * * * *', 
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
