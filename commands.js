const got =require('got')
const Discord=require('discord.js')
const { search } = require('ffmpeg-static')
const downloadYT=require('ytdl-core')
const searchYT=require('yt-search')
const fetch = require("node-fetch");
async function play(msg,...args){
const vc=msg.member.voice.channel

const connection=await vc.join()
const video=await findVideo(args.join(' '))

if(video){
    const stream=downloadYT(video.url,{filter:'audioonly'})
    connection.play(stream,{seek:0,volume:10})

    await msg.reply(`Neengal ketu kondu irupathu     ${video.title}`)
}else{
    await msg.reply(`Error!Serithu neram after try seyavum!`)
}

}
async function findVideo(query){
    const result=await searchYT(query)
    return (result.videos.length>1)?result.videos[0]:null
}

async function stop(msg){
    const vc=msg.member.voice.channel
    await vc.leave()

    await msg.reply("Stopped!")
}
async function getJoke(msg) {
   
    fetch('https://icanhazdadjoke.com/', {
      headers: {
        'Accept': 'application/json'
      }
    }).then(function(response) {
      
      return response.json();
    }).then(function(data) {
 
      const joke = data.joke;
     
       msg.reply(joke)
       console.log(joke);

    }).catch(function(error) {

  
      console.log(error);
    });
  }
  async function getHelp(msg){
    msg.reply("Thanks for contacting Help Portal @Sound_saroja \n Commands You can use:\n--> #podu {Name of video in Youtube } Make sure you already in a voice channel\n--> #stop {Stop an already playing song and exists the voice channel!}\n--> #joke {Replys you with a random joke and we 100% sure it wont be funny}\n--> #help {Replys you with set of commands avaiable!}")
  }

 async function getMeme(msg){
  const embed = new Discord.MessageEmbed()
  got('https://www.reddit.com/r/memes/random/.json').then(response => {
      let content = JSON.parse(response.body);
      let permalink = content[0].data.children[0].data.permalink;
      let memeUrl = `https://reddit.com${permalink}`;
      let memeImage = content[0].data.children[0].data.url;
      let memeTitle = content[0].data.children[0].data.title;
      let memeUpvotes = content[0].data.children[0].data.ups;
      let memeDownvotes = content[0].data.children[0].data.downs;
      let memeNumComments = content[0].data.children[0].data.num_comments;
      embed.setTitle(`${memeTitle}`)
      embed.setURL(`${memeUrl}`)
      embed.setImage(memeImage)
      embed.setColor('RANDOM')
      embed.setFooter(`👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`)
      msg.reply(embed);
  
    })
  }
 

  module.exports.play=play
module.exports.stop=stop
module.exports.getJoke=getJoke
module.exports.getHelp=getHelp
module.exports.getMeme=getMeme

