var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
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
var commands = [ 'ping', 'you pass butter', 'commands', 'hands up' ];
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
		message = message.replace(/\s/g, '');
		message = message.toLowerCase();
		message = message.substring(1,message.length);
        switch(message) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
            break;
			case 'youpassbutter':
				bot.sendMessage({
                    to: channelID,
                    message: 'Oh My God'
                });			
			break;
			case 'commands':
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
			break;
			case 'handsup':
				bot.sendMessage({
                    to: channelID,
                    message: 'Don\'t Shoot'
                });			
			break;
			case 'bang':
				bot.sendMessage({
                    to: channelID,
                    message: 'Pew Pew'
                });	
			
			//hidden commands
			/*obviously these are hidden*/
			
			//unknown command
			default:
					bot.sendMessage({
                    to: channelID,
                    message: 'Unknown command. For a list of commands, type !commands'
                });	
            // Just add any case commands if you want to..
         }
     }
});
