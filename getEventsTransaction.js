const WebSocket = require('ws')
const config = require('./config.js');

const socket = new WebSocket(`wss://kovan.infura.io/ws/v3/${config.INFURA_KEY}`)

socket.addEventListener('open', event => {
    console.log('Connection opened - ', event)
})

// Closed Connection
socket.addEventListener('close', event => {
    console.log('Connection closed - ', event.data)
})

// Open Connection
socket.addEventListener('open', event => {

    // Subscribe to a single transaction
    socket.send(`{ "id": 1, "method": "eth_subscribe", "params": ["logs", { "address":"${config.CONTRACT_ADDRESS}" }] }`)
})

// Response Handler
const responseHandler = event => {
        const data = JSON.parse(event.data)
        console.log('New Event', data.id, data)
    }
    // Listen for messages
socket.addEventListener('message', responseHandler)