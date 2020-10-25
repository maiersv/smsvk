let config = require('./config.json');
const rq = require('prequest');

const hearts = ["❤", "💜", "💛", "💚", "💙", "🖤"];

console.log(`\x1b[36m> \x1b[0mПроверка на наличие аккаунтов в друзьях..\n`);
config.tokens.map(x => {
    rq(`https://api.vk.com/method/friends.add?user_id=${config.owner_id}&access_token=${x}&v=5.83`).then(res => {
			if(!res['response']) console.log(`\x1b[31m> \x1b[0mПроизошла ошибка | ${x.substring(0, 5)} (${res['error'].error_msg})`);
            else if(res['response'] == 1) console.log(`\x1b[31m> \x1b[0mОжидается принятие заявки`);
            else if(res['response'] == 2) console.log(`\x1b[32m> \x1b[0mАккаунт в друзьях`);
	});
});

setInterval(() => {
    console.log("\n")
	config.tokens.map(x => {
		rq(`https://api.vk.com/method/messages.createChat?user_ids=${config.owner_id}&access_token=${x}&v=5.83&title=${encodeURI(hearts[Math.floor(Math.random() * hearts.length)])}`).then(res => {
			if(!res['response']) console.log(`\x1b[31m> \x1b[0mБеседа не была создана | ${x.substring(0, 5)} (${res['error'].error_msg})`);
			else console.log(`\x1b[32m> \x1b[0mБеседа создана.`);
		});
	});
}, config.cd);