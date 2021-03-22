const WebSocket = require('ws')

const socket = new WebSocket(`wss://kovan.infura.io/ws/v3/INFURA_KEY`)

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
    socket.send('{ "id": 1, "method": "eth_subscribe", "params": ["logs", { "address": "contract-address" }] }')
})

// Response Handler
const responseHandler = event => {
        const data = JSON.parse(event.data)
        console.log('New Event', data.id, data)
    }
    // Listen for messages
socket.addEventListener('message', responseHandler)