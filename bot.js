const {Client}=require('discord.js')
const {play,stop} =require('./commands')
const bot=new Client();


bot.login("NzgwNzc4ODMyODM5MzExMzgw.X70C8w.wzcyz_pvdPyeaEOxTwwuRjeooqI")
bot.on('ready',()=>{
   
    console.log("BOT IS UP AND RUNNING")})

bot.on('message',(msg)=>{
    if(msg.author.bot)return
 const prefix="#"
 if(!msg.content.startsWith(prefix))return
const commandName=getCommandName(prefix,msg.content)
const args=getCommandArgs(prefix,msg.content)

if(commandName==='podu'){
    return play(msg,args)}

  if(commandName==='kelambu'){
    return stop(msg,args)
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