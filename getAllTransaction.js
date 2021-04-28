const Web3 = require("web3");
var request = require('request');
const config = require('./config.js');

var abi = [{ "inputs": [{ "internalType": "contract IvUSD", "name": "_vusd", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "provider", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "token", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "liquidityAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "vusdAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "tokenAmount", "type": "uint256" }], "name": "AddLiquidity", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "provider", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "token", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "liquidityAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "vusdAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "tokenAmount", "type": "uint256" }], "name": "RemoveLiquidity", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "address", "name": "tokenIn", "type": "address" }, { "indexed": true, "internalType": "address", "name": "tokenOut", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amountOut", "type": "uint256" }], "name": "Swap", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }, { "indexed": false, "internalType": "uint256[]", "name": "values", "type": "uint256[]" }], "name": "TransferBatch", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "TransferSingle", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "string", "name": "value", "type": "string" }, { "indexed": true, "internalType": "uint256", "name": "id", "type": "uint256" }], "name": "URI", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "_token", "type": "address" }, { "internalType": "uint256", "name": "liquidity", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }], "name": "_removeLiquidity", "outputs": [{ "internalType": "uint256", "name": "poolValue", "type": "uint256" }, { "internalType": "uint256", "name": "liquidityIn", "type": "uint256" }, { "internalType": "uint256", "name": "vusdOut", "type": "uint256" }, { "internalType": "uint256", "name": "tokenOut", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_token", "type": "address" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }], "name": "addLiquidity", "outputs": [{ "internalType": "uint256", "name": "liquidity", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_token", "type": "address" }, { "internalType": "uint256", "name": "vusdAmount", "type": "uint256" }, { "internalType": "uint256", "name": "tokenAmount", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }], "name": "addLiquidityPair", "outputs": [{ "internalType": "uint256", "name": "liquidity", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_token", "type": "address" }, { "internalType": "uint112", "name": "_price", "type": "uint112" }], "name": "addOfficialToken", "outputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "id", "type": "uint256" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "accounts", "type": "address[]" }, { "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }], "name": "balanceOfBatch", "outputs": [{ "internalType": "uint256[]", "name": "", "type": "uint256[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenIn", "type": "address" }, { "internalType": "address", "name": "tokenOut", "type": "address" }, { "internalType": "uint256", "name": "amountOut", "type": "uint256" }], "name": "getAmountIn", "outputs": [{ "internalType": "uint256", "name": "tokenInPrice", "type": "uint256" }, { "internalType": "uint256", "name": "tokenOutPrice", "type": "uint256" }, { "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "uint256", "name": "tradeVusdValue", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenIn", "type": "address" }, { "internalType": "address", "name": "tokenOut", "type": "address" }, { "internalType": "uint256", "name": "amountIn", "type": "uint256" }], "name": "getAmountOut", "outputs": [{ "internalType": "uint256", "name": "tokenInPrice", "type": "uint256" }, { "internalType": "uint256", "name": "tokenOutPrice", "type": "uint256" }, { "internalType": "uint256", "name": "amountOut", "type": "uint256" }, { "internalType": "uint256", "name": "tradeVusdValue", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_token", "type": "address" }], "name": "getPool", "outputs": [{ "internalType": "uint256", "name": "poolValue", "type": "uint256" }, { "internalType": "uint256", "name": "tokenBalanceVusdValue", "type": "uint256" }, { "internalType": "uint256", "name": "vusdCredit", "type": "uint256" }, { "internalType": "uint256", "name": "vusdDebt", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_token", "type": "address" }, { "internalType": "uint112", "name": "_price", "type": "uint112" }, { "internalType": "uint256", "name": "vusdAmount", "type": "uint256" }, { "internalType": "uint256", "name": "tokenAmount", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }], "name": "listNewToken", "outputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "liquidity", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "poolSize", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "pools", "outputs": [{ "internalType": "uint256", "name": "pid", "type": "uint256" }, { "internalType": "uint256", "name": "lastPoolValue", "type": "uint256" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "enum Monoswap.PoolStatus", "name": "status", "type": "uint8" }, { "internalType": "uint112", "name": "vusdDebt", "type": "uint112" }, { "internalType": "uint112", "name": "vusdCredit", "type": "uint112" }, { "internalType": "uint112", "name": "tokenBalance", "type": "uint112" }, { "internalType": "uint112", "name": "price", "type": "uint112" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_token", "type": "address" }, { "internalType": "uint256", "name": "liquidity", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "minVusdOut", "type": "uint256" }, { "internalType": "uint256", "name": "minTokenOut", "type": "uint256" }], "name": "removeLiquidity", "outputs": [{ "internalType": "uint256", "name": "vusdOut", "type": "uint256" }, { "internalType": "uint256", "name": "tokenOut", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "safeBatchTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint16", "name": "_devFee", "type": "uint16" }], "name": "setDevFee", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_feeTo", "type": "address" }], "name": "setFeeTo", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint16", "name": "_fees", "type": "uint16" }], "name": "setFees", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenIn", "type": "address" }, { "internalType": "address", "name": "tokenOut", "type": "address" }, { "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "uint256", "name": "amountOutMin", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "swapExactTokenForToken", "outputs": [{ "internalType": "uint256", "name": "amountOut", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenIn", "type": "address" }, { "internalType": "address", "name": "tokenOut", "type": "address" }, { "internalType": "uint256", "name": "amountInMax", "type": "uint256" }, { "internalType": "uint256", "name": "amountOut", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "swapTokenForExactToken", "outputs": [{ "internalType": "uint256", "name": "amountIn", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "tokenPoolStatus", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "uri", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_credit", "type": "uint256" }, { "internalType": "uint256", "name": "_debt", "type": "uint256" }, { "internalType": "uint256", "name": "delta", "type": "uint256" }], "name": "vusdBalanceAdd", "outputs": [{ "internalType": "uint256", "name": "_newCredit", "type": "uint256" }, { "internalType": "uint256", "name": "_newDebt", "type": "uint256" }], "stateMutability": "pure", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_credit", "type": "uint256" }, { "internalType": "uint256", "name": "_debt", "type": "uint256" }, { "internalType": "uint256", "name": "delta", "type": "uint256" }], "name": "vusdBalanceSub", "outputs": [{ "internalType": "uint256", "name": "_newCredit", "type": "uint256" }, { "internalType": "uint256", "name": "_newDebt", "type": "uint256" }], "stateMutability": "pure", "type": "function" }]
var address = config.CONTRACT_ADDRESS

const { createClient } = require('@supabase/supabase-js')
const supabase = createClient(config.SUPABASEURL, config.SUPABASEKEY)

const web3http = new Web3(`https://kovan.infura.io/v3/${config.INFURA_KEY}`);
var add = `wss://kovan.infura.io/ws/v3/${config.INFURA_KEY}`
var web3 = new Web3(new Web3.providers.WebsocketProvider(add, {
    clientConfig: {
        maxReceivedFrameSize: 10000000000,
        maxReceivedMessageSize: 10000000000,
    }
}));

// var contract = new web3.eth.Contract(abi, address);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function setToDB(data) {
    console.log("entro")
    var options = {
        'method': 'POST',
        'url': `${config.SUPABASEURL}/rest/v1/alltransacciones9?apikey=${config.SUPABASEKEY}`,
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

function getAllTransactions() {
    try {
        var options = {
            'method': 'GET',
            'url': 'https://api.monox.finance/kovan/pools',
            'headers': {
                'Cookie': '__cfduid=d9b1ee0cee7584ef125e1a65e8328aa321617999164'
            }
        };
        request(options, function(error, response) {
            if (error) throw new Error(error);
            var info = JSON.parse(response.body)
            info.forEach(element => {
                var contract = new web3http.eth.Contract(abi, element.token);
                contract.getPastEvents('allEvents', {
                    fromBlock: 0,
                    toBlock: 'latest'
                }, async(error, event) => {
                    if (event != null) {
                        for (let txHash of event) {
                            let tx = await web3.eth.getTransaction(txHash.transactionHash);
                            await sleep(9000);
                            console.log("tx tx tx tx ", element.token, txHash.transactionHash, tx.standardV, tx.blockNumber, txHash.id)
                            var data = {
                                "token": element.token,
                                "txHash": txHash.transactionHash,
                                "blockNumber": tx.blockNumber,
                                "txid": txHash.id,
                                "blockHash": tx.blockHash,
                                "chainId": tx.chainId,
                                "condition": tx.condition,
                                "creates": tx.creates,
                                "from": tx.from,
                                "gas": tx.gas,
                                "gasPrice": tx.gasPrice,
                                "hash": tx.hash,
                                "input": tx.input,
                                "nonce": tx.nonce,
                                "publicKey": tx.publicKey,
                                "r": tx.r,
                                "raw": tx.raw,
                                "s": tx.s,
                                "standardV": tx.standardV,
                                "to": tx.to,
                                "transactionIndex": tx.transactionIndex,
                                "v": tx.v,
                                "value": tx.value,
                            }
                            setToDB(data)

                        }
                    }
                })
            });
        });
    } catch (err) {
        console.error(err);
    }
}

// getAllTransactions()

async function listenTransactionRealTime() {
    try {
        var bandera = true
        var options = {
            'method': 'GET',
            'url': 'https://api.monox.finance/kovan/pools',
            'headers': {
                'Cookie': '__cfduid=d9b1ee0cee7584ef125e1a65e8328aa321617999164'
            }
        };
        request(options, async(error, response) => {
            if (error) throw new Error(error);
            var info = JSON.parse(response.body)
            while (bandera == true) {
                bandera = true
                var vblockNumber = 0
                var ident = 0
                var txid = 0
                for (let element of info) {
                    const { data, error } = await supabase
                        .from('alltransacciones8')
                        .select(`id, address, blockNumber, transactionHash, publicKey, txid`)
                        .order('id', { ascending: false })
                        .eq('address', element.token)
                    if (data[0] != null) {
                        vblockNumber = data[0].blockNumber
                        ident = data[0].id
                        txid = data[0].txid
                        console.log("db no es null ", vblockNumber)
                        console.log('element element element ', ident, element.token, vblockNumber, txid)
                    } else {
                        console.log('db si es nulo ', vblockNumber)
                        vblockNumber = 0
                    }
                    var contract2 = new web3.eth.Contract(abi, element.token);
                    contract2.events.allEvents({
                        fromBlock: vblockNumber
                    }, async function(error, event) {
                        if (event != null) {
                            console.log('event event event ', ident, element.token, vblockNumber, txid, event.id)
                            if (event.id != txid) {
                                console.log('ids son diferentes')
                                let tx = await web3.eth.getTransaction(event.transactionHash);
                                console.log("tx tx tx tx ", ident, element.token, vblockNumber, txid, event.id, event.transactionHash, tx)
                                tableaddress2(ptoken, ptxHash, pstandardV, pblockNumber, ppublicKey, ptxid)
                            }
                        }
                    })
                    await sleep(9000);
                }
            }
        });
    } catch (err) {
        console.error(err);
    }
}

listenTransactionRealTime()