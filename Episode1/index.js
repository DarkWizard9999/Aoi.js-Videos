const Aoijs = require("aoi.js")
const keepAlive = require("./server")
const mySecret = process.env['TOKEN']

const bot = new Aoijs.Bot({
  sharding: false, //true or false 
  shardAmount: 2, //Shard amount 
  mobile: false, //true or false - Discord Mobile Status
  //dbhToken: "API KEY", Remove // if using, get an API Key from their Server
  token: mySecret, 
  prefix: "$getServerVar[prefix]",
  autoUpdate: false, 

})

bot.onMessage()

bot.loadCommands(`./commands/`)

bot.status({
  text: "MUSIC",
  type: "LISTENING",
  time: 12
})

bot.readyCommand({
channel: "", //You can use this or not.
code: `$log[Ready on $userTag[$clientID]]`
})

bot.musicStartCommand({ 
channel: "$channelID", 
code: `
$color[BLUE]
$description[
Now Playing: **[$songInfo[title]]($songInfo[url])** Requested by: <@$songInfo[userID]>
]
` 
})

bot.musicEndCommand({ 
channel: "$channelID", 
code: `` 
})

bot.awaitedCommand({
name: "clqyes",
code: `
$clearSongQueue
$editIn[5ms;{description:$replaceText[$getVar[clearsong];{amount};$queueLength]. **Music Playback** will stop after the current song finishes!} {color:BLUE} {timestamp}] ⚠️ Clearing...
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;Nothing is playing.]`
})

bot.awaitedCommand({
name: "clqno",
code: `$description[Clearqueue was cancelled.]
$color[RED]
$addTimestamp
$deleteIn[3s]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;Nothing is playing.]`
})

bot.awaitedCommand({
name: "playlistPlayer",
code:`
$playSong[$message;15s;yes;yes;Something went wrong...]
`
})

bot.variables({
  prefix: "!",
  skip: "**⏩ Skipped!**",
  remove: "**Removed song on** {d-amount}.",
  join: "**✅ Joined Voice Channel** {join}",
  clearsong: "✅ Cleared queue. from **{amount} song(s)** to **0**",
  dc: "Disconnected.",
  shuffle: "**Shuffle Queue**",
  userused: "0",
  commanduserused: "0",
  playlist1: "",
  playlist2: "",
  playlist3: "", 
  theme: "BLUE",
  errorjoin: "**⛔ You need to join the voice channel first**"
})

keepAlive()
