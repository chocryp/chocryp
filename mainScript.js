// const Web3Modal = window.Web3Modal.default;
var addr;
var chain;
var arbChain = 42161;
var maxBuyAmount = 6;
var balance;
var choco;
var web3;
var BN;
// const detectEthereumProvider = window.metamask.detectEthereumProvider;
// const provider = await detectEthereumProvider();



const ArbOSInfo = [
  {"inputs":[],"name":"getPricesInWei","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
   {"inputs":[],"name":"getPricesInArbGas","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},];
const ArbProvider = "https://arb-mainnet.g.alchemy.com/v2/55xb2eMwGkuw51UFLZkUipOqNENijpgn"
const presale_abi = [{"inputs":[{"internalType":"uint256","name":"_startTime","type":"uint256"},{"internalType":"address","name":"_CHOCO","type":"address"},{"internalType":"uint256","name":"_max","type":"uint256"},{"internalType":"address","name":"_treasury","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"ethAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"chocoAmount","type":"uint256"}],"name":"AddedLiquidity","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Burn","type":"event"},{"inputs":[],"name":"CAMELOT_ROUTER","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"CHOCO","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"addLiquidity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"amountPurchased","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},
{"inputs":[],"name":"burned","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buyPresale","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"endTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"liquidityAdded","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxPerWallet","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pending","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"presaleMax","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"presalePrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_max","type":"uint256"}],"name":"setMax","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalPurchased","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"treasury","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]



const presale_addr = "0x70f4301840A701d5cFf900bdA1F210772cb09E8a";  

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
var _web3;
function registerEventsListeners() {
  if (window.ethereum) {
    ethereum.on('accountsChanged', (accounts) => {

        if(!accounts.length) {
        document.getElementById("connect_wallet").value = "Connect Wallet";
        } else {
            fetchWallData();
        }
        });    

    ethereum.on('chainChanged', (chainId) => {
        console.log(chainId)
        // chain = chainId;
        window.location.reload(); 
        });  
      } else {
        _web3 = new Web3(new Web3.providers.HttpProvider(ArbProvider));
      }
}

async function connect() {
    if (window.ethereum) {
     await window.ethereum.request({ method: "eth_requestAccounts" });
     web3 = new Web3(window.ethereum);
     BN = web3.utils.BN;

    //  await fetchAccountData();
    } else {
        console.log("please install metamask");
    }
   }


   async function isConnected() {
    if (typeof(window.ethereum) !== 'undefined') {
      web3 = new Web3(window.ethereum); 
      BN = web3.utils.BN;  
      chain = await ethereum.request({ method: 'eth_chainId' });
      if (chain == arbChain) {
        _web3 = new Web3(window.ethereum);
      } else {
        _web3 = new Web3(new Web3.providers.HttpProvider(ArbProvider));
      }
      updateInterval();
      const accounts = await window.ethereum.request({method: 'eth_accounts'});
      choco = new web3.eth.Contract(presale_abi, presale_addr);
    
      if (accounts.length) {
          fetchWallData();
      }
    } else {
      _web3 = new Web3(new Web3.providers.HttpProvider(ArbProvider));
      updateInterval();
    }
  }

async function placemax() {
    // metamask provider shows 2000%..just reduce 0.005 instead of querying arbsys for gasInfo * gasPrice
    console.log(balance)
    if (balance < 0.005) {
      document.getElementById("amount").value = "0";
      return;}
      console.log(typeof(balance))
    balanceEth = web3.utils.fromWei(balance.toString(), "ether") - 0.005;
    maxAmount = balanceEth > maxBuyAmount ? maxBuyAmount : parseFloat(Math.floor(balanceEth * 1000) / 1000).toFixed(3)
    document.getElementById("amount").value = maxAmount;
}

async function getArbGasPrice() {
  var gp;
  var arbOs = new web3.eth.Contract(ArbOSInfo, "0x000000000000000000000000000000000000006C");
    arbOs.methods.getPricesInWei().call({from: addr}).then((result) => {
    // arbOs.methods.getPricesInArbGas().call({from: addr}).then((result) => {

      return result;
    })
    .catch((error) => {
      console.log("err", error)
    });
}

// modify contrib box if user placed more than max amount
// display a soft message to indicate to the user about it
async function placedMoreThanMaxAmount()
{
  placemax();
  document.getElementById("maxAmountMsg").classList.add("smoothTransition");
  document.getElementById("maxAmountMsg").classList.remove("hidden");
  await sleep(3000);
  document.getElementById("maxAmountMsg").classList.add("hidden");
  document.getElementById("maxAmountMsg").classList.remove("smoothTransition");
}

async function contribute() {
  if (chain != arbChain) {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0xA4B1' }], // chainId must be in hexadecimal numbers
    });
    return;
   }
  if (! (new Date > new Date(1677884400000))) { return;}

  amount = document.getElementById("amount").value;
 if (!amount){return;}
 
 if (amount > maxBuyAmount) {
    console.log("max contrib amount is ", maxBuyAmount);
    placedMoreThanMaxAmount();
    amount = document.getElementById("amount").value;
 } 
  amountInWei = web3.utils.toWei(amount, "ether");
  console.log(amountInWei)

  amountInWeiHex = web3.utils.numberToHex(amountInWei);

  // var choco = new web3.eth.Contract(presale_abi, presale_addr);
  
  var choco = new web3.eth.Contract(presale_abi, "0x70f4301840A701d5cFf900bdA1F210772cb09E8a");

  txdata = choco.methods.buyPresale().encodeABI()
  var transactionParameters = {
    from: addr, 
    to: presale_addr, 
    value: amountInWeiHex, 
    data: txdata, 
    chainId: chain,
  };

  ethereum
    .request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    })
    .then((result) => {
      console.log("succes")
      console.log(result)
    })
    .catch((error) => {
      console.log("err", error)
    });
}

async function updateConnectedButton(mainaddress) {
    // shortened = accounts;
    shortened = mainaddress.slice(0,6) +"..."+ mainaddress.slice(-4);
    document.getElementById("connect_wallet").value = shortened;
}

function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log('Please connect to MetaMask.');
    } else if (accounts[0] !== currentAccount) {
      fetchWallData();
      // Do any other work!
    }
  }
  
async function updateChainButton(chain) {
    if (chain == 4) {
        console.log("mainnet");
        // document.getElementById("chain_button").src = "ethereum-eth-logo";
        document.getElementById("chain_button").innerHTML="ethereum-eth-logo.svg";
    }  else if (chain == 42161) {
        console.log()
        // set visible arb vector
    } else {
        console.log(chain, "wrong chain");
    }
}

async function fetchWallData() {
    chain = await ethereum.request({ method: 'eth_chainId' });
    addr =   await ethereum.request({ method: 'eth_accounts' })
    addr = addr[0];
    balance = await web3.eth.getBalance(addr);
    updateConnectedButton(addr);
    // updateChainButton(chain);
}

var chocoPresale;
async function updateInterval() {

  // ensure 
  chocoPresale = new _web3.eth.Contract(presale_abi, presale_addr);
  updatePresaleStats()
var x = setInterval(function() {
  updatePresaleStats()
 }, 50000)
}
function updatePresaleStats() {


  var totalEth = document.getElementById("totalE");
  var choceth = document.getElementById("choceth");
  var pendingchoc = document.getElementById("pedingchoc");

  chocoPresale.methods.totalPurchased().call().then((res) => {
    res = web3.utils.fromWei(res, "ether");
    res = parseFloat(Math.floor(res * 1000) / 1000).toFixed(3)      
    totalEth.innerHTML = res;

  }).catch((error) => {});
  choceth.innerHTML = "7,000,000,000";

//   chocoPresale.methods.presalePrice().call().then((res) => {
//     res = web3.utils.fromWei(res, "ether");
//     res = parseFloat(Math.floor(res * 1000) / 1000).toFixed(0)
//     choceth.innerHTML = res.toLocaleString();
//   }).catch((error) => {});

//     chocoPresale.methods.pending().call().then((res) => {
//     res = web3.utils.fromWei(res, "ether");
//     res = parseFloat(Math.floor(res * 1000) / 1000).toFixed(0) 
//     pendingchoc.innerHTML = res;
//   }).catch((error) => {});
}

