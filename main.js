const Discord = require('discord.js');
  
const fetch = require('node-fetch');

const client = new Discord.Client();

const prefix = '$';

const shuffle = (arr) => {
  var j, temp;
  for(var i = arr.length - 1; i > 0; i--){
      j = Math.floor(Math.random()*(i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
  }
  return arr;
}

var mArray = new Array();

const Tenor = require("tenorjs").client({
    "Key": "D2TALXVG6F64", // https://tenor.com/developer/keyregistration
    "Filter": "off", // "off", "low", "medium", "high", not case sensitive
    "Locale": "en_US", // Your locale here, case-sensitivity depends on input
    "MediaFilter": "minimal", // either minimal or basic, not case sensitive
    "DateFormat": "D/MM/YYYY - H:mm:ss A" // Change this accordingly
});

client.once('ready', () => {
    console.log('DingoBot is Online!');
});

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping') {
        message.channel.send('pong!');
    }

    if(command.startsWith('m')) {
      if(command === 'm') {
        let out = "Movies in the Pot:\n";
        for (var i in mArray) {
          var num = Number(i) + 1;
          out += num + ": " + mArray[i][0];
          out += ", " + mArray[i][1];
          out += "\n";
        }
        let embedMsg = new Discord.MessageEmbed()
        .setDescription(out)
        .setColor(0x1ED5E7)
        if (out != "") {message.channel.send(embedMsg);}
      } else if(command === 'm.add') {
        let newMovie = message.content.slice(6).split(", ");
        mArray.push(newMovie);
        message.channel.send("Movie added!");
      } else if(command === 'm.vote') {
        let out = "Movies in the Pot:\n";
        for (var i in mArray) {
          var num = Number(i) + 1;
          out += num + ": " + mArray[i][0];
          out += ", " + mArray[i][1];
          out += "\n";
        }
        let emojiList = client.emojis.cache.map(emoji => emoji.id)
        let randEmojis = shuffle(emojiList).splice(0,mArray.length)
        let embedMsg = new Discord.MessageEmbed()
        .setDescription(out)
        .setColor(0x1ED5E7)
        message.channel.send({embed: embedMsg}).then(embedMessage => {
          randEmojis.map(emoji => embedMessage.react(emoji))
        });
      }
    }

    if(command === 'ass' || command === 'booty' || command === 'butt') {
      if (message.channel.nsfw) {
          fetch(`https://api.tenor.com/v1/random?key=D2TALXVG6F64&q=anime+butt&limit=8`)
        .then(res => res.json())
        .then(json => message.channel.send(json.results[0].url))
        .catch(e => {
          message.channel.send('Failed to find a gif :slight_frown:');
          // console.error(e);
          return;
        });
      } else {message.channel.send('Sorry, hun! We can\'t do that here. :heart:');}
    }

    if(command === 'bittys' || command === 'boobs' || command === 'tits' || command === 'titties') {
      if (message.channel.nsfw) {
          fetch(`https://api.tenor.com/v1/random?key=D2TALXVG6F64&q=anime+boobs&limit=8`)
        .then(res => res.json())
        .then(json => message.channel.send(json.results[0].url))
        .catch(e => {
          message.channel.send('Failed to find a gif :slight_frown:');
          // console.error(e);
          return;
        });
      } else {message.channel.send('Sorry, hun! We can\'t do that here. :heart:');}
    }

    if(command === 'hubby') {
        fetch(`https://api.tenor.com/v1/random?key=D2TALXVG6F64&q=sesshomaru&limit=8`)
      .then(res => res.json())
      .then(json => message.channel.send(json.results[0].url))
      .catch(e => {
        message.channel.send('Failed to find a gif :slight_frown:');
        // console.error(e);
        return;
      });
    }
});


client.login('TOKEN HERE');
