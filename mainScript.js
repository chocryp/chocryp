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

const chocolatier_abi = [{"inputs":[{"internalType":"contract IChocoToken","name":"_choco","type":"address"},{"internalType":"uint256","name":"_rewardPerBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"diamondTime","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"deepValueTime","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"boostApr","type":"uint256"}],"name":"DiamondStatsUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"},{"indexed":true,"internalType":"contract IERC20","name":"lpToken","type":"address"}],"name":"LogPoolAddition","type":"event"},
{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"LogRewardPerBlock","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lockDuration","type":"uint256"}],"name":"LogSetLockDuration","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"}],"name":"LogSetPool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lpSupply","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"accRewardPerShare","type":"uint256"}],"name":"LogUpdatePool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},
{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"chocoLP","type":"address"}],"name":"setChocoLP","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"startBlock","type":"uint256"}],"name":"startBlockSet","type":"event"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IERC20","name":"_lpToken","type":"address"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"boostApr","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"lockEndedTimestamp","type":"uint256"},{"internalType":"uint256","name":"diamondStamp","type":"uint256"},{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"calculateDiamond","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"choco","outputs":[{"internalType":"contract IChocoToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"chocoLp","outputs":[{"internalType":"contract IUniswapPair","name":"","type":"address"}],"stateMutability":"view","type":"function"},
{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deepValueTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"diamondTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBlockNumber","outputs":[{"internalType":"uint256","name":"blockNumber","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"getLpBalance","outputs":[{"internalType":"uint256","name":"lpSupply","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lockDurations","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lpTokens","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},
{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accRewardPerShare","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"time","type":"uint256"}],"name":"secondsToBlocks","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_chocoLp","type":"address"}],"name":"setChocoLp","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_diamondTime","type":"uint256"},{"internalType":"uint256","name":"_deepValueTime","type":"uint256"},{"internalType":"uint256","name":"_boostApr","type":"uint256"}],"name":"setDiamondStats","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_lockDuration","type":"uint256"}],"name":"setLockDuration","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_startBlock","type":"uint256"}],"name":"setStartBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardPerBlock","type":"uint256"}],"name":"updateRewardPerBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"uploadBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"uploadTimeStamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"},{"internalType":"uint256","name":"lockEndedTimestamp","type":"uint256"},{"internalType":"uint256","name":"diamondStamp","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"weakHands","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]



const chocotoken_abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"epoch","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"prevChocoScalingFactor","type":"uint256"},
{"indexed":false,"internalType":"uint256","name":"newChocoScalingFactor","type":"uint256"}],"name":"Rebase","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},
{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"router","type":"address"}],"name":"addedRouter","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"percent","type":"uint256"}],"name":"percentChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"success","type":"bool"}],"name":"transfered","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"treasury","type":"address"}],"name":"treasurySet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"router","type":"address"}],"name":"untrackRouter","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"vault","type":"address"}],"name":"untrackVault","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"vault","type":"address"}],"name":"vaultAdded","type":"event"},{"inputs":[],"name":"BASE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DOMAIN_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINTER_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"REBASER_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"choco","type":"uint256"}],"name":"_chocoToFragment","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"_fragmentTochoco","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"indexDelta","type":"uint256"},{"internalType":"bool","name":"positive","type":"bool"}],"name":"_getChocoScaling","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_router","type":"address"}],"name":"addRouter","outputs":[],"stateMutability":"nonpayable","type":"function"},
{"inputs":[{"internalType":"address","name":"_vault","type":"address"}],"name":"addVault","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOfUnderlying","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burnFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"chocoScalingFactor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"choco","type":"uint256"},{"internalType":"uint256","name":"_chocoScalingFactor","type":"uint256"}],"name":"chocoToFragment","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"principal","type":"uint256"},{"internalType":"uint256","name":"ratio","type":"uint256"},{"internalType":"uint256","name":"n","type":"uint256"}],"name":"compound","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"compoundRatio","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},
{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"_chocoScalingFactor","type":"uint256"}],"name":"fragmentToChoco","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"getBlockNumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getChocoScaling","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getRoleMember","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleMemberCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"initializeLastBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},
{"inputs":[],"name":"internalDecimals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxScalingFactor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pBase","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"percentage","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},
{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"int128","name":"x","type":"int128"},{"internalType":"uint256","name":"n","type":"uint256"}],"name":"pow","outputs":[{"internalType":"int128","name":"r","type":"int128"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"epoch","type":"uint256"},{"internalType":"uint256","name":"indexDelta","type":"uint256"},{"internalType":"bool","name":"positive","type":"bool"}],"name":"rebase","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_router","type":"address"}],"name":"removeRouter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_vault","type":"address"}],"name":"removeVault","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"to","type":"address"},
{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"rescueTokens","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"router","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"routers","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_percent","type":"uint256"}],"name":"setPercentage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_treasury","type":"address"}],"name":"setTeasury","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"treasury","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"vaults","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}]











const presale_addr = "0x70f4301840A701d5cFf900bdA1F210772cb09E8a";  
const chocolatier_addr = "0xb204034fb8c87a84a92ccb277855c8fbdf2aa576";
const chocotoken_addr = "0xb204034fb8c87a84a92ccb277855c8fbdf2aa576";
const camelot_router_addr = "0xc873fEcbd354f5A56E00E710B90EF4201db2448d";
const camelot_LP_CHOCO_WETH_addr = "0x9BAA5861b70174830Cf8A0f5CE25d3211B9d8D28";



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
        _chocolatier_contract = new web3.eth.Contract(chocolatier_abi, chocolatier_addr);
        _presale_contract = new web3.eth.Contract(presale_abi, presale_addr);
        
        _camelot_LP_CHOCO_WETH_contract = new web3.eth.Contract(chocotoken_abi, camelot_LP_CHOCO_WETH_addr);

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
      _chocolatier_contract = new _web3.eth.Contract(chocolatier_abi, chocolatier_addr);
      _presale_contract = new _web3.eth.Contract(presale_abi, presale_addr);
      _chocotoken_contract = new _web3.eth.Contract(chocotoken_abi, chocotoken_addr);
      _camelot_LP_CHOCO_WETH_contract = new _web3.eth.Contract(chocotoken_abi, camelot_LP_CHOCO_WETH_addr);
    } else {
      _web3 = new Web3(new Web3.providers.HttpProvider(ArbProvider));
      _chocolatier_contract = new _web3.eth.Contract(chocolatier_abi, chocolatier_addr);
      _presale_contract = new _web3.eth.Contract(presale_abi, presale_addr);
      _chocotoken_contract = new _web3.eth.Contract(chocotoken_abi, chocotoken_addr);
      _camelot_LP_CHOCO_WETH_contract = new _web3.eth.Contract(chocotoken_abi, camelot_LP_CHOCO_WETH_addr);
    }
    updateInterval();
    const accounts = await window.ethereum.request({method: 'eth_accounts'});
    choco = new web3.eth.Contract(presale_abi, presale_addr);

    if (accounts.length) {
        fetchWallData();
    }
  } else {
    _web3 = new Web3(new Web3.providers.HttpProvider(ArbProvider));
    _chocolatier_contract = new _web3.eth.Contract(chocolatier_abi, chocolatier_addr);
    _presale_contract = new _web3.eth.Contract(presale_abi, presale_addr);
    _chocotoken_contract = new _web3.eth.Contract(chocotoken_abi, chocotoken_addr);
    _camelot_LP_CHOCO_WETH_contract = new _web3.eth.Contract(chocotoken_abi, camelot_LP_CHOCO_WETH_addr);
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



async function isArbiChain() {
if (chain != arbChain) {
  await window.ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: '0xA4B1' }], // chainId must be in hexadecimal numbers
  });
  return false;
 } 
 return true;
}

















// claim $CHOCO's from Presale contract 
async function presale_claim() {
  if (chain != arbChain) {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0xA4B1' }], // chainId must be in hexadecimal numbers
    });
    return;
   }
  var presale_contract = new web3.eth.Contract(presale_abi, presale_addr);
  presale_contract.methods.claim().send({from: addr}).then(function(receipt){
    console.log(receipt);
});
}








// Chocolatier deposit   LP  --- FRIDGE
async function chocolatier_deposit_fridge() {
  if (chain != arbChain) {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0xA4B1' }], // chainId must be in hexadecimal numbers
    });
    return;
   }

  var amount = document.getElementById("deposit_fridge_input").value;
   if (!amount){return;}

   amountInWei = web3.utils.toWei(amount, "ether");
   amountInWei = web3.utils.numberToHex(amountInWei);
   // pid 1 = LP PID
   var pid = web3.utils.padLeft(web3.utils.toHex(1), 64)
 
  var chocolatier_contract = new web3.eth.Contract(chocolatier_abi, chocolatier_addr);
  // var txdata = chocolatier_contract.methods.claim().encodeABI()
  chocolatier_contract.methods.deposit(pid, amountInWei).send({from: addr}).then(function(receipt){
    console.log(receipt);
});
}




// Chocolatier deposit   LP  --- FRIDGE
async function chocolatier_withdraw_fridge() {
  if (chain != arbChain) {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0xA4B1' }], // chainId must be in hexadecimal numbers
    });
    return;
   }

  var amount = document.getElementById("withdraw_fridge_input").value;
   if (!amount){return;}

   amountInWei = web3.utils.toWei(amount, "ether");
   amountInWei = web3.utils.numberToHex(amountInWei);
   // _pid = 1 ===  Fridge LP
   var pid = web3.utils.padLeft(web3.utils.toHex(1), 64)
 
  var chocolatier_contract = new web3.eth.Contract(chocolatier_abi, chocolatier_addr);
  // var txdata = chocolatier_contract.methods.claim().encodeABI()
  chocolatier_contract.methods.withdraw(pid, amountInWei).send({from: addr}).then(function(receipt){
    console.log(receipt);
  });
}






// Chocolatier claim LP === FRIDGE
async function chocolatier_claim_fridge() {
  if (chain != arbChain) {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0xA4B1' }], // chainId must be in hexadecimal numbers
    });
    return;
   }


   // _pid = 1 ===  Fridge LP
  var pid = web3.utils.padLeft(web3.utils.toHex(1), 64)
  var chocolatier_contract = new web3.eth.Contract(chocolatier_abi, chocolatier_addr);
  // var txdata = chocolatier_contract.methods.claim().encodeABI()
  chocolatier_contract.methods.claim(pid).send({from: addr}).then(function(receipt){
    console.log(receipt);
  });
}




/////todo
async function approve_chocolatier_on_camelot() {
  if (chain != arbChain) {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0xA4B1' }], // chainId must be in hexadecimal numbers
    });
    return;
   }
   // approve high amount for improved UX
  approvalAmount = web3.utils.toWei("9999999999999999999999999999", "ether");
  approvalAmount = web3.utils.numberToHex(approvalAmount);

  var _camelot_LP_CHOCO_WETH_contract = new web3.eth.Contract(chocotoken_abi, camelot_LP_CHOCO_WETH_addr);
  // var txdata = chocolatier_contract.methods.claim().encodeABI()
  _camelot_LP_CHOCO_WETH_contract.methods.approve(chocolatier_addr, approvalAmount).send({from: addr}).then(function(receipt){
    console.log(receipt);
  });
}



















// Chocolatier deposit CHOCO TOKEN  ---> FREEZER
async function chocolatier_deposit_freezer() {
  if (chain != arbChain) {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0xA4B1' }], // chainId must be in hexadecimal numbers
    });
    return;
   }

  var amount = document.getElementById("deposit_lp_input").value;
   if (!amount){return;}

   amountInWei = web3.utils.toWei(amount, "ether");
   amountInWei = web3.utils.numberToHex(amountInWei);
   // pid 0 = choco single sided PID
   var pid = web3.utils.padLeft(web3.utils.toHex(0), 64)
 
  var chocolatier_contract = new web3.eth.Contract(chocolatier_abi, chocolatier_addr);
  // var txdata = chocolatier_contract.methods.claim().encodeABI()
  chocolatier_contract.methods.deposit(pid, amountInWei).send({from: addr}).then(function(receipt){
    console.log(receipt);
});
}




// Chocolatier deposit CHOCO TOKEN  ---> FREEZER
async function chocolatier_withdraw_freezer() {
  if (chain != arbChain) {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0xA4B1' }], // chainId must be in hexadecimal numbers
    });
    return;
   }

  var amount = document.getElementById("deposit_lp_input").value;
   if (!amount){return;}

   amountInWei = web3.utils.toWei(amount, "ether");
   amountInWei = web3.utils.numberToHex(amountInWei);
   // pid 0 = choco single sided PID
   var pid = web3.utils.padLeft(web3.utils.toHex(0), 64)
 
  var chocolatier_contract = new web3.eth.Contract(chocolatier_abi, chocolatier_addr);
  // var txdata = chocolatier_contract.methods.claim().encodeABI()
  chocolatier_contract.methods.deposit(pid, amountInWei).send({from: addr}).then(function(receipt){
    console.log(receipt);
});
}



// Chocolatier claim LP === FREEZER
async function chocolatier_claim_freezer() {
  if (chain != arbChain) {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0xA4B1' }], // chainId must be in hexadecimal numbers
    });
    return;
   }

  var amount = document.getElementById("withdraw_fridge_input").value;
   if (!amount){return;}

   // _pid = 1 ===  Fridge LP
  var pid = web3.utils.padLeft(web3.utils.toHex(0), 64)
  var chocolatier_contract = new web3.eth.Contract(chocolatier_abi, chocolatier_addr);
  // var txdata = chocolatier_contract.methods.claim().encodeABI()
  chocolatier_contract.methods.claim(pid).send({from: addr}).then(function(receipt){
    console.log(receipt);
  });
}





async function approve_chocolatier_on_choco() {
  if (chain != arbChain) {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0xA4B1' }], // chainId must be in hexadecimal numbers
    });
    return;
   }

  approvalAmount = web3.utils.toWei("99999999999999999999999", "ether");
  approvalAmount = web3.utils.numberToHex(approvalAmount);

  var chocotoken_contract = new web3.eth.Contract(chocotoken_abi, chocotoken_addr);
  // var txdata = chocolatier_contract.methods.claim().encodeABI()
  chocotoken_contract.methods.approve(chocolatier_addr, approvalAmount).send({from: addr}).then(function(receipt){
    console.log(receipt);
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























var _chocotoken_contract;
var _chocolatier_contract;
var _presale_contract;
var _camelot_LP_CHOCO_WETH_contract;



var chocoPresale;
async function updateInterval() {
  // stats puller 
  updatePresaleStats()
var x = setInterval(function() {
  updatePresaleStats()
 }, 50000)
}


function updatePresaleStats() {

  var pendingchoc = document.getElementById("pending_choco");

  _chocoPresale.methods.pending().call().then((res) => {
    console.res("pending chock", res)
    res = web3.utils.fromWei(res, "ether");
    res = parseFloat(Math.floor(res * 1000) / 1000).toFixed(0) 
    pending_choco.innerHTML = res;
  }).catch((error) => {});





  var chocolatier_lp_balance = document.getElementById("chocolatier_lp_balance");

  _chocoPres_camelot_LP_CHOCO_WETH_contractale.methods.balanceOf(chocolatier_addr).call().then((res) => {
    console.res("pending chock", res)
    res = web3.utils.fromWei(res, "ether");
    res = parseFloat(Math.floor(res * 1000) / 1000).toFixed(0) 
    chocolatier_lp_balance.innerHTML = res;

    // use divide #of blocks per year * rewards / TVL ..  later add diamond calculations with dedicated backend


  }).catch((error) => {});


  var chocolatier_claimable = document.getElementById("freezer_awaiting_claim");
  // todo
  _chocolatier_contract.methods.balanceOf(chocolatier_addr).call().then((res) => {
    console.res("pending chock", res)
    res = web3.utils.fromWei(res, "ether");
    res = parseFloat(Math.floor(res * 1000) / 1000).toFixed(0) 
    chocolatier_claimable.innerHTML = res;
  }).catch((error) => {});



  var chocolatier_claimable = document.getElementById("freezer_awaiting_claim");
  // todo
  _chocolatier_contract.methods.balanceOf(chocolatier_addr).call().then((res) => {
    console.res("pending chock", res)
    res = web3.utils.fromWei(res, "ether");
    res = parseFloat(Math.floor(res * 1000) / 1000).toFixed(0) 
    chocolatier_claimable.innerHTML = res;
  }).catch((error) => {});





  //FRIDGE 

  var fridge_balanceOf = document.getElementById("chilled_chocos");
  // todo
  _chocotoken_contract.methods.balanceOf(chocolatier_addr).call().then((res) => {
    console.res("pending chock", res)
    res = web3.utils.fromWei(res, "ether");
    res = parseFloat(Math.floor(res * 1000) / 1000).toFixed(0) 
    fridge_balanceOf.innerHTML = res;
  }).catch((error) => {});






}

