import TeleBot from 'telebot'


// replace the value below with the Telegram token you receive from @BotFather
const { TELEGRAM_BOT_NOTIFYME_TOKEN } = process.env

const addresses = {
  '3521887': 1,
  '7573518': 1
}

const addressMe = '3521887';

let lastMessage = ''

export default function({getValue}) {

  // Create a bot that uses 'polling' to fetch new updates
  const bot = new TeleBot({
    token: TELEGRAM_BOT_NOTIFYME_TOKEN
  });

  // check
  bot.on(['/check'], async (msg, match) => {
    const chatId = msg.from.id;

    var val = await getValue();
    await bot.sendMessage(chatId, val);
  });

  // any message
  bot.on('*', (msg) => {
    console.log('* got')
    addresses[msg.from.id + ''] = 1;
  });

  // start
  bot.start();

  // response
  return {
    bot: bot,

    // methods
    send: function(message, options) {

      let addr = Object.keys(addresses);
      if (options.address == 'me')
      {
        addr = [addressMe];
      }

      // send
      addr.forEach(async a => {
        try {
          await bot.sendMessage(a, message, /*{ parseMode: 'Markdown' }*/)
        } catch(e) {
          console.log('error', e);
        }
      })
    },

    // update
    updateLast: function(message) {
      lastMessage = message;
    }
  }
}