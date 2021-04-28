const Web3 = require("web3");
var request = require('request');
var sleepi = require('sleep');
const config = require('./config.js');

var abi = [{ "inputs": [{ "internalType": "contract IvUSD", "name": "_vusd", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "provider", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "token", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "liquidityAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "vusdAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "tokenAmount", "type": "uint256" }], "name": "AddLiquidity", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "provider", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "token", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "liquidityAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "vusdAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "tokenAmount", "type": "uint256" }], "name": "RemoveLiquidity", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "address", "name": "tokenIn", "type": "address" }, { "indexed": true, "internalType": "address", "name": "tokenOut", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amountOut", "type": "uint256" }], "name": "Swap", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }, { "indexed": false, "internalType": "uint256[]", "name": "values", "type": "uint256[]" }], "name": "TransferBatch", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "TransferSingle", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "string", "name": "value", "type": "string" }, { "indexed": true, "internalType": "uint256", "name": "id", "type": "uint256" }], "name": "URI", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "_token", "type": "address" }, { "internalType": "uint256", "name": "liquidity", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }], "name": "_removeLiquidity", "outputs": [{ "internalType": "uint256", "name": "poolValue", "type": "uint256" }, { "internalType": "uint256", "name": "liquidityIn", "type": "uint256" }, { "internalType": "uint256", "name": "vusdOut", "type": "uint256" }, { "internalType": "uint256", "name": "tokenOut", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_token", "type": "address" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }], "name": "addLiquidity", "outputs": [{ "internalType": "uint256", "name": "liquidity", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_token", "type": "address" }, { "internalType": "uint256", "name": "vusdAmount", "type": "uint256" }, { "internalType": "uint256", "name": "tokenAmount", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }], "name": "addLiquidityPair", "outputs": [{ "internalType": "uint256", "name": "liquidity", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_token", "type": "address" }, { "internalType": "uint112", "name": "_price", "type": "uint112" }], "name": "addOfficialToken", "outputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "id", "type": "uint256" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "accounts", "type": "address[]" }, { "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }], "name": "balanceOfBatch", "outputs": [{ "internalType": "uint256[]", "name": "", "type": "uint256[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenIn", "type": "address" }, { "internalType": "address", "name": "tokenOut", "type": "address" }, { "internalType": "uint256", "name": "amountOut", "type": "uint256" }], "name": "getAmountIn", "outputs": [{ "internalType": "uint256", "name": "tokenInPrice", "type": "uint256" }, { "internalType": "uint256", "name": "tokenOutPrice", "type": "uint256" }, { "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "uint256", "name": "tradeVusdValue", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenIn", "type": "address" }, { "internalType": "address", "name": "tokenOut", "type": "address" }, { "internalType": "uint256", "name": "amountIn", "type": "uint256" }], "name": "getAmountOut", "outputs": [{ "internalType": "uint256", "name": "tokenInPrice", "type": "uint256" }, { "internalType": "uint256", "name": "tokenOutPrice", "type": "uint256" }, { "internalType": "uint256", "name": "amountOut", "type": "uint256" }, { "internalType": "uint256", "name": "tradeVusdValue", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_token", "type": "address" }], "name": "getPool", "outputs": [{ "internalType": "uint256", "name": "poolValue", "type": "uint256" }, { "internalType": "uint256", "name": "tokenBalanceVusdValue", "type": "uint256" }, { "internalType": "uint256", "name": "vusdCredit", "type": "uint256" }, { "internalType": "uint256", "name": "vusdDebt", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_token", "type": "address" }, { "internalType": "uint112", "name": "_price", "type": "uint112" }, { "internalType": "uint256", "name": "vusdAmount", "type": "uint256" }, { "internalType": "uint256", "name": "tokenAmount", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }], "name": "listNewToken", "outputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "liquidity", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "poolSize", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "pools", "outputs": [{ "internalType": "uint256", "name": "pid", "type": "uint256" }, { "internalType": "uint256", "name": "lastPoolValue", "type": "uint256" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "enum Monoswap.PoolStatus", "name": "status", "type": "uint8" }, { "internalType": "uint112", "name": "vusdDebt", "type": "uint112" }, { "internalType": "uint112", "name": "vusdCredit", "type": "uint112" }, { "internalType": "uint112", "name": "tokenBalance", "type": "uint112" }, { "internalType": "uint112", "name": "price", "type": "uint112" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_token", "type": "address" }, { "internalType": "uint256", "name": "liquidity", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "minVusdOut", "type": "uint256" }, { "internalType": "uint256", "name": "minTokenOut", "type": "uint256" }], "name": "removeLiquidity", "outputs": [{ "internalType": "uint256", "name": "vusdOut", "type": "uint256" }, { "internalType": "uint256", "name": "tokenOut", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "safeBatchTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint16", "name": "_devFee", "type": "uint16" }], "name": "setDevFee", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_feeTo", "type": "address" }], "name": "setFeeTo", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint16", "name": "_fees", "type": "uint16" }], "name": "setFees", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenIn", "type": "address" }, { "internalType": "address", "name": "tokenOut", "type": "address" }, { "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "uint256", "name": "amountOutMin", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "swapExactTokenForToken", "outputs": [{ "internalType": "uint256", "name": "amountOut", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenIn", "type": "address" }, { "internalType": "address", "name": "tokenOut", "type": "address" }, { "internalType": "uint256", "name": "amountInMax", "type": "uint256" }, { "internalType": "uint256", "name": "amountOut", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "swapTokenForExactToken", "outputs": [{ "internalType": "uint256", "name": "amountIn", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "tokenPoolStatus", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "uri", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_credit", "type": "uint256" }, { "internalType": "uint256", "name": "_debt", "type": "uint256" }, { "internalType": "uint256", "name": "delta", "type": "uint256" }], "name": "vusdBalanceAdd", "outputs": [{ "internalType": "uint256", "name": "_newCredit", "type": "uint256" }, { "internalType": "uint256", "name": "_newDebt", "type": "uint256" }], "stateMutability": "pure", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_credit", "type": "uint256" }, { "internalType": "uint256", "name": "_debt", "type": "uint256" }, { "internalType": "uint256", "name": "delta", "type": "uint256" }], "name": "vusdBalanceSub", "outputs": [{ "internalType": "uint256", "name": "_newCredit", "type": "uint256" }, { "internalType": "uint256", "name": "_newDebt", "type": "uint256" }], "stateMutability": "pure", "type": "function" }]
var address = config.CONTRACT_ADDRESS

const { createClient } = require('@supabase/supabase-js')
const supabase = createClient(config.SUPABASEURL, config.SUPABASEKEY)

const web3http = new Web3(`https://kovan.infura.io/v3/${config.INFURA_KEY}`);

// agrega cualquier dato a una tabla espesifica en supabase
function setToDB(data) {
    console.log("entro")
    var options = {
        'method': 'POST',
        'url': `${config.SUPABASEURL}/rest/v1/AllTx4?apikey=${config.SUPABASEKEY}`,
        'headers': {
            'Content-Type': 'application/json'
        },
        "body": JSON.stringify(data),
    };
    request(options, function(error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
    });
}


function insertAllTransactionOfAlltokenInDB() {
    var bandera = true
    var options = {
        'method': 'GET',
        'url': 'https://api.monox.finance/kovan/pools',
        'headers': {
            'Cookie': '__cfduid=d9b1ee0cee7584ef125e1a65e8328aa321617999164'
        }
    };
    request(options, async function(error, response) {
        if (error) throw new Error(error);
        var info = JSON.parse(response.body)
        while (bandera == true) {
            bandera = true
            for (let item of info) {
                var ptoken = item.token
                console.log(ptoken)
                    // listenTransactionRealTime(ptoken)
                    // sleepi.sleep(1);
                var vblockNumber = 0
                const { data, error } = await supabase
                    .from('AllTx4')
                    .select(`id, blockNumber`)
                    .order('blockNumber', { ascending: false })
                    .eq('token', ptoken)
                console.log(data[0])
                if (data[0] != null) {
                    vblockNumber = data[0].blockNumber
                    console.log("db no es null ", vblockNumber)
                } else {
                    console.log('db si es nulo ', vblockNumber)
                    vblockNumber = 0
                }
                getEvent(ptoken, vblockNumber)
                sleepi.sleep(5);
            }
        }
    });
}

function loopTokenAndListeNewsTransactios() {
    var options = {
        'method': 'GET',
        'url': 'https://api.monox.finance/kovan/pools',
        'headers': {
            'Cookie': '__cfduid=d9b1ee0cee7584ef125e1a65e8328aa321617999164'
        }
    };
    request(options, async function(error, response) {
        if (error) throw new Error(error);
        var data = JSON.parse(response.body)
        for (let item of data) {
            var ptoken = item.token
            console.log(ptoken)
            pastLogs(ptoken)
                // sleepi.sleep(1);
        }
    });
}

//mismos datos q PastEvents, con algunas diferencias
//puedo obtener los eventos de un token desde un  fromBlock definido 
function pastLogs(ptoken) {
    console.log('pastLogs ', ptoken)
    web3http.eth.getPastLogs({
        fromBlock: 0,
        address: ptoken
    }).then(res => {
        for (let item of res) {
            transaction(item, ptoken)
        }
    }).catch(err => console.log(token, " getPastLogs failed", err));
}


// puedo obtener los eventos de un contrato desde un fromBlock hasta un toBlock
function pastEvents(paddress) {
    var contract = new web3http.eth.Contract(abi, paddress);
    contract.getPastEvents('allEvents', {
            fromBlock: 0,
            toBlock: 'latest'
        }, function(error, events) { console.log(events); })
        .then(function(events) {
            console.log(events)
        });
}


// obtengo las transacciones de los tokens y los agrego a la db
function transaction(item, ptoken) {
    console.log('transaction')
    web3http.eth.getTransaction(
        item.transactionHash
    ).then(function(data) {
        var evid = item.id
        var thash = item.transactionHash
        console.log(evid, thash, ptoken)
            // sleepi.sleep(2);
        prepareDataInsertDb(evid, thash, ptoken, data)
    }).catch(err => console.log(" getTransaction failed", err));
}


async function listenTransactionRealTime(ptoken) {
    var vblockNumber = 0
    const { data, error } = await supabase
        .from('AllTx4')
        .select(`id, blockNumber`)
        .order('blockNumber', { ascending: false })
        .eq('token', ptoken)
    console.log(data[0])
    if (data[0] != null) {
        vblockNumber = data[0].blockNumber
        console.log("db no es null ", vblockNumber)
    } else {
        console.log('db si es nulo ', vblockNumber)
        vblockNumber = 0
    }
    getEvent(ptoken, vblockNumber)

}


function getEvent(ptoken, vblockNumber) {
    var add = `wss://kovan.infura.io/ws/v3/${config.INFURA_KEY}`
    var web3ws = new Web3(new Web3.providers.WebsocketProvider(add, {
        clientConfig: {
            maxReceivedFrameSize: 10000000000,
            maxReceivedMessageSize: 10000000000,
        }
    }));
    var contract = new web3ws.eth.Contract(abi, ptoken);
    contract.events.allEvents({
        fromBlock: vblockNumber
    }, function(error, event) {
        console.log(event)
        if (event != null) {
            console.log(event)
            transaction(event, ptoken)
        }
    })
}


// prepara los datos de las transacciones en forma de json y llama a la funcion q los agregara a la db
function prepareDataInsertDb(evid, thash, ptoken, pdata) {
    var data = {
            "id": evid,
            "token": ptoken,
            "txHash": thash,
            "blockNumber": pdata.blockNumber,
            "blockHash": pdata.blockHash,
            "chainId": pdata.chainId,
            "condition": pdata.condition,
            "creates": pdata.creates,
            "from": pdata.from,
            "gas": pdata.gas,
            "gasPrice": pdata.gasPrice,
            "hash": pdata.hash,
            "input": pdata.input,
            "nonce": pdata.nonce,
            "publicKey": pdata.publicKey,
            "r": pdata.r,
            "raw": pdata.raw,
            "s": pdata.s,
            "standardV": pdata.standardV,
            "to": pdata.to,
            "transactionIndex": pdata.transactionIndex,
            "v": pdata.v,
            "value": pdata.value,
        }
        // console.log(data)
    setToDB(data)
}


// pastLogs('0x60A95E1D27B7d204D837357795Ddf0734F22168d')
// pastEvents('0x4A8F68F2d3BEac759BE305399E1c3817f5F5ffB8')
// transaction('0xc2bb3af62d3bfc9d289dee18cda0a09aab98098931408c3ecac310b2d9ea2f03')
// insertAllTransactionOfAlltokenInDB()
// getEvent('0xb6B6FEf89Cd84eeeDE0bFe642182914b4F197105', 24254442)
// listenTransactionRealTime('0xb6B6FEf89Cd84eeeDE0bFe642182914b4F197105')
insertAllTransactionOfAlltokenInDB()