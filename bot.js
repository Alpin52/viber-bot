'use strict';

const ViberBot = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;
var fs = require('fs');

const bot = new ViberBot({
	authToken: "MY_TOKEN",
	name: "EchoBot",
	avatar: "http://viber.com/avatar.jpg" // It is recommended to be 720x720, and no more than 100kb.
});
bot.onSubscribe(response => console.log(`Subscribed: ${response.userProfile.id}`));
// Perfect! Now here's the key part:
bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
	// Echo's back the message to the client. Your bot logic should sit here.
	console.log(message);
	response.send(message);
});

// Wasn't that easy? Let's create HTTPS server and set the webhook:
const https = require('https');
const port = process.env.PORT || 8181;

// Viber will push messages sent to this URL. Web server should be internet-facing.
var webhookUrl = process.env.WEBHOOK_URL || 'https://math.alpin52.ru';
//var webhookUrl = process.env.WEBHOOK_URL || 'https://webhook.site/c024831c-82bd-46b6-989b-4fbc3ec5b54d';
//echo 'webhookUrl';

var httpsOptions = {
  cert: fs.readFileSync('/home/admin/conf/web/ssl.math.alpin52.ru.crt'),
  key: fs.readFileSync('/home/admin/conf/web/ssl.math.alpin52.ru.key'),
  ca: fs.readFileSync('/home/admin/conf/web/ssl.math.alpin52.ru.ca')
};

/*const httpsOptions = {
	cert: /home/admin/conf/web/ssl.math.alpin52.ru.pem,
	key: "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",
	ca: "MSQwIgYDVQQKExtEaWdpdGFsIFNpZ25hdHVyZSBUcnVzdCBDby4xFzAVBgNVBAMTDkRTVCBSb290IENBIFgzMB4XDTIwMTAwNzE5MjE0MFoXDTIxMDkyOTE5MjE0MFowMjELMAkGA1UEBhMCVVMxFjAUBgNVBAoTDUxldCdzIEVuY3J5cHQxCzAJBgNVBAMTAlIzMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuwIVKMz2oJTTDxLsjVWSw/iC8ZmmekKIp10mqrUrucVMsa+Oa/l1yKPXD0eUFFU1V4yeqKI5GfWCPEKpTm71O8Mu243AsFzzWTjn7c9p8FoLG77AlCQlh/o3cbMT5xys4Zvv2+Q7RVJFlqnBU840yFLuta7tj95gcOKlVKu2bQ6XpUA0ayvTvGbrZjR8+muLj1cpmfgwF126cm/7gcWt0oZYPRfH5wm78Sv3htzB2nFd1EbjzK0lwYi8YGd1ZrPxGPeiXOZT/zqItkel/xMY6pgJdz+dU/nPAeX1pnAXFK9jpP+Zs5Od3FOnBv5IhR2haa4ldbsTzFID9e1RoYvbFQIDAQABo4IBaDCCAWQwEgYDVR0TAQH/BAgwBgEB/wIBADAOBgNVHQ8BAf8EBAMCAYYwSwYIKwYBBQUHAQEEPzA9MDsGCCsGAQUFBzAChi9odHRwOi8vYXBwcy5pZGVudHJ1c3QuY29tL3Jvb3RzL2RzdHJvb3RjYXgzLnA3YzAfBgNVHSMEGDAWgBTEp7Gkeyxx+tvhS5B1/8QVYIWJEDBUBgNVHSAETTBLMAgGBmeBDAECATA/BgsrBgEEAYLfEwEBATAwMC4GCCsGAQUFBwIBFiJodHRwOi8vY3BzLnJvb3QteDEubGV0c2VuY3J5cHQub3JnMDwGA1UdHwQ1MDMwMaAvoC2GK2h0dHA6Ly9jcmwuaWRlbnRydXN0LmNvbS9EU1RST09UQ0FYM0NSTC5jcmwwHQYDVR0OBBYEFBQusxe3WFbLrlAJQOYfr52LFMLGMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjANBgkqhkiG9w0BAQsFAAOCAQEA2UzgyfWEiDcx27sT4rP8i2tiEmxYt0l+PAK3qB8oYevO4C5z70kHejWEHx2taPDY/laBL21/WKZuNTYQHHPD5b1tXgHXbnL7KqC401dk5VvCadTQsvd8S8MXjohyc9z9/G2948kLjmE6Flh9dDYrVYA9x2O+hEPGOaEOa1eePynBgPayvUfLqjBstzLhWVQLGAkXXmNs+5ZnPBxzDJOLxhF2JIbeQAcH5H0tZrUlo5ZYyOqA7s9pO5b85o3AM/OJ+CktFBQtfvBhcJVd9wvlwPsk+uyOy2HI7mNxKKgsBTt375teA2TwUdHkhVNcsAKX1H7GNNLOEADksd86wuoXvg"
};*/ // Trusted SSL certification (not self-signed).
https.createServer(httpsOptions, bot.middleware()).listen(port, () => bot.setWebhook(webhookUrl));

const TextMessage = require('viber-bot').Message.Text;
const { exec } = require('child_process');
var saveStdout = "";

function intervalFunc() {
	var child = require('child_process').execFile('/home/admin/top'); 
	child.stdout.on('data', function(data) {
		console.log(data.toString());
		let toptopic = fs.readFileSync('./toptopic_new.txt', 'utf8');
		console.log(toptopic);
		bot.sendMessage({id: "yDMJdgHFgmTbyOgm4rFxtg=="}, new TextMessage(toptopic));
		
	});
  //console.log('Cant stop me now!');
/*  exec('echo "y" | mv toptopic_new.txt toptopic_old.txt');
  exec('elinks https://m.nn.ru/f/1238 | /home/admin/toptopic > toptopic_new.txt');
  exec('sleep 3s');
  exec('echo "y" | cp toptopic_new.txt 1');
  exec('echo "*bJ69bue" | sudo chmod 777 toptopic_new.txt');
*///  exec('/home/admin/top'/*'diff toptopic_old.txt toptopic_new.txt'*/, (err, stdout, stderr) => {
/*	if (err) {
		// node couldn't execute the command
		//return;
	}

	// the *entire* stdout and stderr (buffered)
	console.log(`${stdout}`);
	//if (saveStdout != `$(stdout)`)  {
	//	saveStdout = `$(stdout)`;
		let toptopic = fs.readFileSync('./toptopic_new.txt', 'utf8');
		console.log(toptopic);
		bot.sendMessage({id: "yDMJdgHFgmTbyOgm4rFxtg=="}, new TextMessage(toptopic));
	//}
	//console.log(`stderr: ${stderr}`);
  });*/
}

setInterval(intervalFunc, 60000);
