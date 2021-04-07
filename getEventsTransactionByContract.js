const Web3 = require("web3");
const config = require('./config.js');

var abi = [{ "inputs": [{ "internalType": "contract IvUSD", "name": "_vusd", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "provider", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "token", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "liquidityAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "vusdAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "tokenAmount", "type": "uint256" }], "name": "AddLiquidity", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "provider", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "token", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "liquidityAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "vusdAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "tokenAmount", "type": "uint256" }], "name": "RemoveLiquidity", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "address", "name": "tokenIn", "type": "address" }, { "indexed": true, "internalType": "address", "name": "tokenOut", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amountOut", "type": "uint256" }], "name": "Swap", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }, { "indexed": false, "internalType": "uint256[]", "name": "values", "type": "uint256[]" }], "name": "TransferBatch", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "TransferSingle", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "string", "name": "value", "type": "string" }, { "indexed": true, "internalType": "uint256", "name": "id", "type": "uint256" }], "name": "URI", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "_token", "type": "address" }, { "internalType": "uint256", "name": "liquidity", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }], "name": "_removeLiquidity", "outputs": [{ "internalType": "uint256", "name": "poolValue", "type": "uint256" }, { "internalType": "uint256", "name": "liquidityIn", "type": "uint256" }, { "internalType": "uint256", "name": "vusdOut", "type": "uint256" }, { "internalType": "uint256", "name": "tokenOut", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_token", "type": "address" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }], "name": "addLiquidity", "outputs": [{ "internalType": "uint256", "name": "liquidity", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_token", "type": "address" }, { "internalType": "uint256", "name": "vusdAmount", "type": "uint256" }, { "internalType": "uint256", "name": "tokenAmount", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }], "name": "addLiquidityPair", "outputs": [{ "internalType": "uint256", "name": "liquidity", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_token", "type": "address" }, { "internalType": "uint112", "name": "_price", "type": "uint112" }], "name": "addOfficialToken", "outputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "id", "type": "uint256" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "accounts", "type": "address[]" }, { "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }], "name": "balanceOfBatch", "outputs": [{ "internalType": "uint256[]", "name": "", "type": "uint256[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenIn", "type": "address" }, { "internalType": "address", "name": "tokenOut", "type": "address" }, { "internalType": "uint256", "name": "amountOut", "type": "uint256" }], "name": "getAmountIn", "outputs": [{ "internalType": "uint256", "name": "tokenInPrice", "type": "uint256" }, { "internalType": "uint256", "name": "tokenOutPrice", "type": "uint256" }, { "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "uint256", "name": "tradeVusdValue", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenIn", "type": "address" }, { "internalType": "address", "name": "tokenOut", "type": "address" }, { "internalType": "uint256", "name": "amountIn", "type": "uint256" }], "name": "getAmountOut", "outputs": [{ "internalType": "uint256", "name": "tokenInPrice", "type": "uint256" }, { "internalType": "uint256", "name": "tokenOutPrice", "type": "uint256" }, { "internalType": "uint256", "name": "amountOut", "type": "uint256" }, { "internalType": "uint256", "name": "tradeVusdValue", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_token", "type": "address" }], "name": "getPool", "outputs": [{ "internalType": "uint256", "name": "poolValue", "type": "uint256" }, { "internalType": "uint256", "name": "tokenBalanceVusdValue", "type": "uint256" }, { "internalType": "uint256", "name": "vusdCredit", "type": "uint256" }, { "internalType": "uint256", "name": "vusdDebt", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_token", "type": "address" }, { "internalType": "uint112", "name": "_price", "type": "uint112" }, { "internalType": "uint256", "name": "vusdAmount", "type": "uint256" }, { "internalType": "uint256", "name": "tokenAmount", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }], "name": "listNewToken", "outputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "liquidity", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "poolSize", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "pools", "outputs": [{ "internalType": "uint256", "name": "pid", "type": "uint256" }, { "internalType": "uint256", "name": "lastPoolValue", "type": "uint256" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "enum Monoswap.PoolStatus", "name": "status", "type": "uint8" }, { "internalType": "uint112", "name": "vusdDebt", "type": "uint112" }, { "internalType": "uint112", "name": "vusdCredit", "type": "uint112" }, { "internalType": "uint112", "name": "tokenBalance", "type": "uint112" }, { "internalType": "uint112", "name": "price", "type": "uint112" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_token", "type": "address" }, { "internalType": "uint256", "name": "liquidity", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "minVusdOut", "type": "uint256" }, { "internalType": "uint256", "name": "minTokenOut", "type": "uint256" }], "name": "removeLiquidity", "outputs": [{ "internalType": "uint256", "name": "vusdOut", "type": "uint256" }, { "internalType": "uint256", "name": "tokenOut", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "safeBatchTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint16", "name": "_devFee", "type": "uint16" }], "name": "setDevFee", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_feeTo", "type": "address" }], "name": "setFeeTo", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint16", "name": "_fees", "type": "uint16" }], "name": "setFees", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenIn", "type": "address" }, { "internalType": "address", "name": "tokenOut", "type": "address" }, { "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "uint256", "name": "amountOutMin", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "swapExactTokenForToken", "outputs": [{ "internalType": "uint256", "name": "amountOut", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenIn", "type": "address" }, { "internalType": "address", "name": "tokenOut", "type": "address" }, { "internalType": "uint256", "name": "amountInMax", "type": "uint256" }, { "internalType": "uint256", "name": "amountOut", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "swapTokenForExactToken", "outputs": [{ "internalType": "uint256", "name": "amountIn", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "tokenPoolStatus", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "uri", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_credit", "type": "uint256" }, { "internalType": "uint256", "name": "_debt", "type": "uint256" }, { "internalType": "uint256", "name": "delta", "type": "uint256" }], "name": "vusdBalanceAdd", "outputs": [{ "internalType": "uint256", "name": "_newCredit", "type": "uint256" }, { "internalType": "uint256", "name": "_newDebt", "type": "uint256" }], "stateMutability": "pure", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_credit", "type": "uint256" }, { "internalType": "uint256", "name": "_debt", "type": "uint256" }, { "internalType": "uint256", "name": "delta", "type": "uint256" }], "name": "vusdBalanceSub", "outputs": [{ "internalType": "uint256", "name": "_newCredit", "type": "uint256" }, { "internalType": "uint256", "name": "_newDebt", "type": "uint256" }], "stateMutability": "pure", "type": "function" }]
var address = config.CONTRACT_ADDRESS

// let web3 = new Web3(`wss://kovan.infura.io/ws/v3/${config.INFURA_KEY}`);
var add = `wss://kovan.infura.io/ws/v3/${config.INFURA_KEY}`
var web3 = new Web3(new Web3.providers.WebsocketProvider(add, {
    clientConfig: {
        maxReceivedFrameSize: 10000000000,
        maxReceivedMessageSize: 10000000000,
    }
}));

const { createClient } = require('@supabase/supabase-js')
const supabase = createClient(config.SUPABASEURL, config.SUPABASEKEY)

var contract = new web3.eth.Contract(abi, address);

const tableAddLiquidity = async(pblocknumber, pprovider, ppid, ptoken, pliquidityAmount, pvusdAmout, ptokenAmount) => {
    const { data, error } = await supabase
        .from('addliquidity1')
        .insert([{
            id: pblocknumber,
            provider: pprovider,
            pid: ppid,
            token: ptoken,
            liquidityAmount: pliquidityAmount,
            vusdAmout: pvusdAmout,
            tokenAmount: ptokenAmount,
        }, ])
}

const tableRemoveLiquidity = async(pblocknumber, pprovider, ppid, ptoken, pliquidityAmount, pvusdAmout, ptokenAmount) => {
    const { data, error } = await supabase
        .from('removeliquidity1')
        .insert([{
            id: pblocknumber,
            provider: pprovider,
            pid: ppid,
            token: ptoken,
            liquidityAmount: pliquidityAmount,
            vusdAmout: pvusdAmout,
            tokenAmount: ptokenAmount,
        }, ])
}

const tableSwap = async(pblocknumber, puser, ptokenIn, ptokenOut, pamountIn, pamountOut) => {
    const { data, error } = await supabase
        .from('swap1')
        .insert([{
            id: pblocknumber,
            user: puser,
            tokenIn: ptokenIn,
            tokenOut: ptokenOut,
            amountIn: pamountIn,
            amountOut: pamountOut,
        }, ])
}

function insertEventInDB() {
    contract.events.allEvents({
            fromBlock: 0
        }, function(error, event) { console.log(event); })
        .on('data', function(event) {
            var pblocknumber = event["blockNumber"]
            var pprovider = event["returnValues"]["provider"]
            var ppid = event["returnValues"]["pid"]
            var ptoken = event["returnValues"]["token"]
            var pliquidityAmount = event["returnValues"]["liquidityAmount"]
            var pvusdAmout = event["returnValues"]["vusdAmount"]
            var ptokenAmount = event["returnValues"]["tokenAmount"]
            if (event["event"] == "AddLiquidity") {
                tableAddLiquidity(pblocknumber, pprovider, ppid, ptoken, pliquidityAmount, pvusdAmout, ptokenAmount)
            } else if (event["event"] == "RemoveLiquidity") {
                tableRemoveLiquidity(pblocknumber, pprovider, ppid, ptoken, pliquidityAmount, pvusdAmout, ptokenAmount)
            } else if (event["event"] == "Swap") {
                var ppblocknumber = event["blockNumber"]
                var puser = event["returnValues"]["user"]
                var ptokenIn = event["returnValues"]["tokenIn"]
                var ptokenOut = event["returnValues"]["tokenOut"]
                var pamountIn = event["returnValues"]["amountIn"]
                var pamountOut = event["returnValues"]["amountOut"]
                tableSwap(ppblocknumber, puser, ptokenIn, ptokenOut, pamountIn, pamountOut)
            }
        })
        .on('error', console.error);
}
// insertEventInDB()

async function listenToEvent() {
    var i = 0
    var tbname = ''
    var listblocknumber = []
    while (i < 3) {
        console.log(i)
        if (i == 0) {
            tbname = 'addliquidity1'
        } else if (i == 1) {
            tbname = 'removeliquidity1'
        } else if (i == 2) {
            tbname = 'swap1'
        }
        i++;
        const { data, error } = await supabase
            .from(tbname)
            .select('id')
            .order('id', { ascending: false })
        if (typeof data[0] == 'undefined') {
            listblocknumber.push(0)
        } else {
            listblocknumber.push(parseInt(data[0].id))
        }
    }
    var max = Math.max(...listblocknumber)
    contract.events.allEvents({
            fromBlock: max
        }, function(error, event) {
            console.log(event);
            var pblocknumber = event["blockNumber"]
            var pprovider = event["returnValues"]["provider"]
            var ppid = event["returnValues"]["pid"]
            var ptoken = event["returnValues"]["token"]
            var pliquidityAmount = event["returnValues"]["liquidityAmount"]
            var pvusdAmout = event["returnValues"]["vusdAmount"]
            var ptokenAmount = event["returnValues"]["tokenAmount"]
            if (event["event"] == "AddLiquidity") {
                tableAddLiquidity(pblocknumber, pprovider, ppid, ptoken, pliquidityAmount, pvusdAmout, ptokenAmount)
            } else if (event["event"] == "RemoveLiquidity") {
                tableRemoveLiquidity(pblocknumber, pprovider, ppid, ptoken, pliquidityAmount, pvusdAmout, ptokenAmount)
            } else if (event["event"] == "Swap ") {
                var pblocknumber = event["blockNumber"]
                var puser = event["returnValues"]["user"]
                var ptokenIn = event["returnValues"]["tokenIn"]
                var ptokenOut = event["returnValues"]["tokenOut"]
                var pamountIn = event["returnValues"]["amountIn"]
                var pamountOut = event["returnValues"]["amountOut"]
                tableSwap(pblocknumber, puser, ptokenIn, ptokenOut, pamountIn, pamountOut)
            }
        })
        .on('error', function(error, receipt) {});
}
listenToEvent()