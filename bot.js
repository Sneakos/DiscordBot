var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var http = require('http');
var cheerio = require("cheerio");
//var request = require("request");
const request = require("tinyreq");

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
var commands = [ 'ping', 'you pass butter', 'commands', 'hands up', 'bang', 'animal *animalname*'];

var animals = [];
			
bot.on('ready', function (evt) {
    logger.info('Connected');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!' || message === 'good bot') {
		message = message.replace(/\s/g, '');
		message = message.toLowerCase();
		message = message.substring(1,message.length);
            if(message === 'ping')
			{
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
			}
            else if(message === 'youpassbutter')
			{
				bot.sendMessage({
                    to: channelID,
                    message: 'Oh My God'
                });			
			}
			else if(message === 'commands')
			{
				var output = '{\n';
				for(var i = 0; i < commands.length; i++)
				{
					output += "\t!" + commands[i] + '\n';
				}
				output += '\t(and maybe some hidden ones)\n}';
				bot.sendMessage({
                    to: channelID,
                    message: output
                });	
			}
			else if(message === 'handsup')
			{
				bot.sendMessage({
                    to: channelID,
                    message: 'Don\'t Shoot'
                });			
			}
			else if(message === 'bang')
			{
				bot.sendMessage({
                    to: channelID,
                    message: 'Pew Pew'
                });	
			}
			else if(message.includes('animal'))
			{
				var temp = message.substring(6,message.length);
				if(temp === "doggo" || temp === "pupper" || temp === "doge" || temp === "good boy"
					|| temp === "good boi" || temp === "good boye")
					temp = "dog";				
				if(temp === '')
				{
					bot.sendMessage({
						to: channelID,
						message: 'Try entering an animal name after this command ( ͡° ͜ʖ ͡°) (ex: animal otter)'
					});
				} else {
					var validLinks = [];
					var req = "https://a-z-animals.com/animals/" + temp + "/pictures/";
					request(req, function (err, body) {
						var $ = cheerio.load(body);
						var len = $('img[class^="az-phobia-"]').length - 1;
						 $('img[class*="az-phobia-"]').each(function(i, element){
							var a = $(this).attr("src");
							validLinks.push(a);
						 if(len == i)
						 {
							if(validLinks.length == 0)
							{
								temp = temp.charAt(0).toUpperCase() + temp.slice(1);
								var message = 'Cannot find ' + temp + '. Are you sure that\'s really an animal? (ex: animal otter)';
								bot.sendMessage({
									to: channelID,
									message: message
								});
							} else {
								var index = Math.floor(Math.random() * validLinks.length);
								validLinks[index] = validLinks[index].replace('100x100', '470x370');
								temp = 'https://a-z-animals.com' + validLinks[index];
								bot.sendMessage({
									to: channelID,
									message: temp
								});
							}
						 }
						});													
					});
				}
			}			
			//hidden commands
			else if(message === 'oodbot') //g gets cut off
			{
				bot.sendMessage({
                    to: channelID,
                    message: 'Thanks love!'
                });	
			}
			else if(message === 'theanswertolifetheuniverseandeverything')
			{
				bot.sendMessage({
                    to: channelID,
                    message: '42'
                });			
			}
			
			//unknown command
			else
			{
					bot.sendMessage({
                    to: channelID,
                    message: 'Unknown command. For a list of commands, type !commands'
                });
			}
         }
});
