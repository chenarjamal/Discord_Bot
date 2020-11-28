const { search } = require('ffmpeg-static')
const downloadYT=require('ytdl-core')
const searchYT=require('yt-search')

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
async function getJoke() {
   
    fetch('https://icanhazdadjoke.com/', {
      headers: {
        'Accept': 'application/json'
      }
    }).then(function(response) {
      
      return response.json();
    }).then(function(data) {
 
      const joke = data.joke;
     
       msg.reply("JOKE!")
       console.log(joke);

    }).catch(function(error) {

  
      console.log(error);
    });
  }

module.exports.play=play
module.exports.stop=stop
module.exports.getJoke=getJoke

