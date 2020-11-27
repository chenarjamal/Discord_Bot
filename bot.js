const {Client}=require('discord.js')
const {play,stop} =require('./commands')
const bot=new Client();
const fetch = require("node-fetch");


bot.login("NzgwNzc4ODMyODM5MzExMzgw.X70C8w.wzcyz_pvdPyeaEOxTwwuRjeooqI")
bot.on('ready',()=>{
   
    console.log("BOT IS UP AND RUNNING")})
    getJoke()
bot.on('message',(msg)=>{
    if(msg.author.bot)return
 const prefix="#"
 if(!msg.content.startsWith(prefix))return
const commandName=getCommandName(prefix,msg.content)
const args=getCommandArgs(prefix,msg.content)

if(commandName==='padu'){
    return play(msg,args)}

  if(commandName==='kelambu'){
    return stop(msg,args)
  }
if(commandName=="joke"){
  return getJoke(msg)
}

})

function getCommandName(prefix,content){
    return content
    .slice(prefix.length)
    .split(' ')[0]
}


function getCommandArgs(prefix,content){
    return content
    .slice(prefix.length)
    .split(' ')
    .slice(1)
}
function getJoke(msg) {
  
  fetch('https://icanhazdadjoke.com/', {
    headers: {
      'Accept': 'application/json'
    }
  }).then(function(response) {
    
    return response.json();
  }).then(function(data) {

    const joke = data.joke;
   
     msg.reply("JOKE! HA HA HA")
     console.log(joke);

  }).catch(function(error) {


    console.log(error);
  });
}