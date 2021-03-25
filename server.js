const { Telegraf } = require('telegraf');




const bot = new Telegraf(process.env.BOT_TOKEN);


const wellcomeMsg = "Hoş Geldiniz! suponiBot -v 1.0";

const helpMsg = "yardim mesaji";

const badWords = ["amk","sikiş","sik","am","yarrak","sikiş","sikeyim","amını sikeyim","amina koyim","orospu","orospu cocugu","göt"];

const Filter = require('bad-words'),
    filter = new Filter();

    filter.addWords("amk","sikiş","sik","am","yarrak","sikiş","sikeyim","amını sikeyim","amina koyim","orospu","orospu cocugu","göt");


//basic cmds
bot.start((ctx) => ctx.reply(wellcomeMsg));
bot.help((ctx) => ctx.reply(helpMsg));

// listen to commands
bot.on('photo', (ctx) => ctx.reply('çok güzel bir resim'));
bot.on('sticker', (ctx) => ctx.reply('👍'));

bot.hears(['sa','Sa'], (ctx) => ctx.reply('as'));
bot.hears(['botInfo','botinfo'], (ctx) => ctx.reply(ctx.getMe()));
bot.hears(['Beni duyuyon mu','beni duyuyon mu'], (ctx) => ctx.reply('evet efendim'));


bot.startPolling();

bot.hears(['slm','naber','nbr','nabıyon'],(ctx)=>{
    ctx.reply(`Hi! ${ctx.message.from.first_name}, how are you?`)
});

bot.hears('randomPic', (ctx) => ctx.replyWithPhoto({
    url: 'https://picsum.photos/200/300/?random',
    filename: 'kitten.jpg'
  }));

bot.on('message', (ctx) => {
    // let user = ctx.from.first_name;
    let message = ctx.message.text.trim().replace(/\s/g, "").toLowerCase();;
     
  
  var n = badWords.some(substring=>message.includes(substring));
            
  if(n){
  ctx.reply('küfür saptandı  BAN'+ctx.message.from.first_name+ ' ' +ctx.message.from.last_name );
    
   
    ctx.deleteMessage(message.message_id);
    
     }
  
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));