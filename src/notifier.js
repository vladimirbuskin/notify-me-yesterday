import TelegramBot from 'node-telegram-bot-api'


// replace the value below with the Telegram token you receive from @BotFather
const { TELEGRAM_BOT_NOTIFYME } = process.env

const addresses = {
  '3521887': 1,
  '7573518': 1
}
let lastMessage = ''

export default function() {

  // Create a bot that uses 'polling' to fetch new updates
  const bot = new TelegramBot(TELEGRAM_BOT_NOTIFYME, {polling: true});

  // check
  bot.onText(/\/check/, (msg, match) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, lastMessage || '(no value yet, check later)');
  });

  // any message
  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    addresses[chatId + ''] = 1;
  });


  // response
  return {
    bot: bot,

    // methods
    send: function(message) {
      // send to all addresses
      let addr = Object.keys(addresses);
      addr.forEach(a => {
        bot.sendMessage(a, message)
      })
    },

    // update
    updateLast: function(message) {
      lastMessage = message;
    }
  }
}