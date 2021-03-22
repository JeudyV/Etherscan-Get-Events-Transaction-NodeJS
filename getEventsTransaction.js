const WebSocket = require('ws')

const socket = new WebSocket(`wss://kovan.infura.io/ws/v3/e2e4990c4d1d45739c1d02c29f00806f`)

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
    socket.send('{ "id": 1, "method": "eth_subscribe", "params": ["logs", { "address": "0x4A8F68F2d3BEac759BE305399E1c3817f5F5ffB8" }] }')
})

// Response Handler
const responseHandler = event => {
        const data = JSON.parse(event.data)
        console.log('New Event', data.id, data)
    }
    // Listen for messages
socket.addEventListener('message', responseHandler)