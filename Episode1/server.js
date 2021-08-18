const express = require("express")

const server = express()

server.all("/", (req, res) => {
  res.send("Bot started")
})

function keepAlive() {
  server.listen(4000, () => {
    console.log("I am ready")
  })
}

module.exports = keepAlive