import config from '../../../config/index.js'
import {HT_MAIN_CHAINID, HT_TEST_CHAINID} from '../../../config/coinbase/nodeConfig'
import {
  NAME,
  SYMBOL,
  DECIMALS,
  EXCHANGE_ADDRESS,
  REDEEM_MAX_NUM,
  REDEEM_MIN_NUM,
  FEE,
  MAXFEE,
  MINFEE,
  ISSWITCH,
  ISDEPOSIT,
  ISREDEEM,
  DEPOSIT_ADDRESS,
  DEPOSIT_TYPE,
  DEPOSIT_MAX_NUM,
  DEPOSIT_MIN_NUM,
  EXTENDOBJ,
} from '../methods/mode'
import {dirSwitch} from '../methods/common'

export default {
  [HT_MAIN_CHAINID]: {
    '0x538cee985e930557d16c383783ca957fa90b63b3': { // ANY
      [NAME]: 'Anyswap' + config.suffix,
      [SYMBOL]: 'ANY',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x58ded31f93669eac7b18d4d19b0d122fa5e9263d',
      [REDEEM_MAX_NUM]: 3000000,
      [REDEEM_MIN_NUM]: 40,
      [FEE]: 0.001,
      [MAXFEE]: 100,
      [MINFEE]: 20,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x08c266b93286e706222714dea42be2a7627039b1',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 5000000,
      [DEPOSIT_MIN_NUM]: 30,
      [EXTENDOBJ]: {
        BRIDGE: [
          { type: 32659, isSwitch: 1 }
        ],
        VERSION: 'V2'
      },
    },
    '0x66a79d23e58475d2738179ca52cd0b41d73f0bea': { // HBTC
      [NAME]: 'Heco-Peg HBTC',
      [SYMBOL]: 'HBTC',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x14044302cc082bba6703a30a8eae4062fcf76955',
      [REDEEM_MAX_NUM]: 1000000,
      [REDEEM_MIN_NUM]: 0.1,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
      [EXTENDOBJ]: {},
    },
    '0xc8f62c36e2b92fe60e68c14eb783293dc5bf2ae0': { // BTC
      [NAME]: 'Bitcoin' + config.suffix,
      [SYMBOL]: 'anyBTC',
      [DECIMALS]: 8,
      [EXCHANGE_ADDRESS]: '0xae7192340719674a3cfd0da9259dab902c71d6a7',
      [REDEEM_MAX_NUM]: 100,
      [REDEEM_MIN_NUM]:  0.01,
      [FEE]: 0.001,
      [MAXFEE]: 0.01,
      [MINFEE]: 0.002,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '1EirLGdwhgGXH8DTd5PVLoi7x6izkbYijS',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 100,
      [DEPOSIT_MIN_NUM]: 0.01,
      [EXTENDOBJ]:  {
        VERSION: 'V2'
      }
    },
    '0x64ff637fb478863b7468bc97d30a5bf3a428a1fd': { // HETH
      [NAME]: 'Heco-Peg ETH',
      [SYMBOL]: 'HETH',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x7b7b9fba56cd7c22d278488985e5713c80a0edfc',
      [REDEEM_MAX_NUM]: 1000000,
      [REDEEM_MIN_NUM]: 0.1,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
      [EXTENDOBJ]: {},
    },
    '0x62c10412d69823a98db5c09cf6e82810e0df5ad7': { // ETH
      [NAME]: 'Ethereum',
      [SYMBOL]: 'anyETH',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x8a6f33665144eb69f67e9460686b68f85a2decf9',
      [REDEEM_MAX_NUM]: 1000,
      [REDEEM_MIN_NUM]: 0.05,
      [FEE]: 0.001,
      [MAXFEE]: 0.1,
      [MINFEE]: 0.008,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xd779967f8b511c5edf39115341b310022900efed',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 1000,
      [DEPOSIT_MIN_NUM]: 0.01,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x0298c2b32eae4da002a15f36fdf7615bea3da047': { // HUSD
      [NAME]: 'Heco-Peg HUSD',
      [SYMBOL]: 'HUSD',
      [DECIMALS]: 8,
      [EXCHANGE_ADDRESS]: '0xe1eacc72830ae81668457bb2b3bd214dab9e3d0f',
      [REDEEM_MAX_NUM]: 1000000,
      [REDEEM_MIN_NUM]: 0.1,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
      [EXTENDOBJ]: {},
    },
    '0x721bc1af56fa923ab4c4a43bde49d7d1f8dd3076': { // USDT-ERC20
      [NAME]: 'Tether',
      [SYMBOL]: 'anyUSDT',
      [DECIMALS]: 6,
      [EXCHANGE_ADDRESS]: '0x70611b9cf3f89a7e6e39a5242afefc19a50d8091',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xd779967f8b511c5edf39115341b310022900efed',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 200000,
      [DEPOSIT_MIN_NUM]: 1,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x42aaa9151c2f7a6a5ae70869aa9236b6f3fbae49': { // FSN
      [NAME]: 'Fusion' + config.suffix,
      [SYMBOL]: 'anyFSN',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x89e81634124353bc5242324697882a89059736de',
      [REDEEM_MAX_NUM]: 5000000,
      [REDEEM_MIN_NUM]: 40,
      [FEE]: 0.001,
      [MAXFEE]: 200,
      [MINFEE]: 20,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x08c266b93286e706222714dea42be2a7627039b1',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 5000000,
      [DEPOSIT_MIN_NUM]: 1,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 32659, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0xecb56cf772b5c9a6907fb7d32387da2fcbfb63b4': { // HLTC
      [NAME]: 'Heco-Peg HLTC',
      [SYMBOL]: 'HLTC',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xfefacbe5e6f6438c6a5aa0ec9c0d09be1b130574',
      [REDEEM_MAX_NUM]: 1000000,
      [REDEEM_MIN_NUM]: 0.1,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
      [EXTENDOBJ]: {},
    },
    '0x471e265ab5b8513032721acef0a53b79185ae6f9': { // BNB 8
      [NAME]: 'Binance' + config.suffix,
      [SYMBOL]: 'anyBNB',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xa87d23f354d0f53eeb2dc622cd730fbfa4ea4bf1',
      [REDEEM_MAX_NUM]: 10000,
      [REDEEM_MIN_NUM]: 0.5,
      [FEE]: 0.001,
      [MAXFEE]: 2,
      [MINFEE]: 0.2,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xe09c98f97dafb1f954cea0ce550383e2bd0c8829',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 10000,
      [DEPOSIT_MIN_NUM]: 0.2,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 56, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0xae3a768f9ab104c69a7cd6041fe16ffa235d1810': { // HFIL 29
      [NAME]: 'Heco-Peg HFIL',
      [SYMBOL]: 'HFIL',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x671f6349901a3eff3e7baa757a397647230ad221',
      [REDEEM_MAX_NUM]: 1000000,
      [REDEEM_MIN_NUM]: 0.1,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
      [EXTENDOBJ]: {},
    },
    '0xef3cebd77e0c52cb6f60875d9306397b5caca375': { // HBCH
      [NAME]: 'Heco-Peg HBCH',
      [SYMBOL]: 'HBCH',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x3ffb3098e978429b27443f22da177f96cae65412',
      [REDEEM_MAX_NUM]: 1000000,
      [REDEEM_MIN_NUM]: 0.1,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
      [EXTENDOBJ]: {},
    },
    '0xa2c49cee16a5e5bdefde931107dc1fae9f7773e3': { // HDOT
      [NAME]: 'Heco-Peg HDOT',
      [SYMBOL]: 'HDOT',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x4e7a4f2720115051717706f548ee64c5f0a7a5b3',
      [REDEEM_MAX_NUM]: 1000000,
      [REDEEM_MIN_NUM]: 0.1,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
      [EXTENDOBJ]: {},
    },
    '0xc2cb6b5357ccce1b99cd22232942d9a225ea4eb1': { // HBSV
      [NAME]: 'Heco-Peg HBSV',
      [SYMBOL]: 'HBSV',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xbf6ef20abba64bdd662ec0f5ac9d9bae6dd325c0',
      [REDEEM_MAX_NUM]: 1000000,
      [REDEEM_MIN_NUM]: 0.1,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
      [EXTENDOBJ]: {},
    },
    '0x45e97dad828ad735af1df0473fc2735f0fd5330c': { // HXTZ
      [NAME]: 'Heco-Peg HXTZ',
      [SYMBOL]: 'HXTZ',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xc4a5f66bab71a42a72b0394d25eb1629d5917646',
      [REDEEM_MAX_NUM]: 1000000,
      [REDEEM_MIN_NUM]: 0.1,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
      [EXTENDOBJ]: {},
    },
    '0x734922e7b793b408cd434eedaa407c9c0c575d1e': { // HTC
      [NAME]: 'HTCToken',
      [SYMBOL]: 'HTC',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xae9b79172b6cd61f1e312b0bf05399f643111900',
      [REDEEM_MAX_NUM]: 1000000,
      [REDEEM_MIN_NUM]: 0.1,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
      [EXTENDOBJ]: {},
    },
    '0x68a0a1fef18dfcc422db8be6f0f486dea1999edc': { // EDC
      [NAME]: 'EarnDefiCoin',
      [SYMBOL]: 'EDC',
      [DECIMALS]: 9,
      [EXCHANGE_ADDRESS]: '0x8dc32d332fa98f230fecf6276b5165e0dbfcead3',
      [REDEEM_MAX_NUM]: 1000000,
      [REDEEM_MIN_NUM]: 0.1,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
      [EXTENDOBJ]: {},
    },
    '0xe2f45b8fbcb2b5bb544fe9f796bcfeaa3a4dcdbf': { // SDC
      [NAME]: 'StableCoin',
      [SYMBOL]: 'SDC',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x39bb62da68fc7f9c1271baba01f5eb636379fa12',
      [REDEEM_MAX_NUM]: 1000000,
      [REDEEM_MIN_NUM]: 0.1,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
      [EXTENDOBJ]: {},
    },
    '0x9e83d30380177da5dece77f71f093194de60b6a5': { // Hi
      [NAME]: 'Hipay',
      [SYMBOL]: 'Hi',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x6b2b9ebfaa009163306a245327be34589daa618e',
      [REDEEM_MAX_NUM]: 1000000,
      [REDEEM_MIN_NUM]: 0.1,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
      [EXTENDOBJ]: {},
    },
    '0x7eed8a3ccfe3d507ec4df443773eae792b9ef2d7': { // PTT
      [NAME]: 'OpenLand',
      [SYMBOL]: 'PTT',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x3d6e66054ba75434dfd49ab6cda55b6153feb94b',
      [REDEEM_MAX_NUM]: 1000000,
      [REDEEM_MIN_NUM]: 0.1,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
      [EXTENDOBJ]: {},
    },
    '0x1fef77f57f9c29c38c7c484d3f2cdaaa4157909f': { // HWBTB
      [NAME]: 'HWBTB',
      [SYMBOL]: 'HWBTB',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xe356e60f3219e9287aecc08a4910f961be544952',
      [REDEEM_MAX_NUM]: 1000000,
      [REDEEM_MIN_NUM]: 0.1,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
      [EXTENDOBJ]: {},
    },
    '0x2a4070407242721ad321208ac47208cb48fb1356': { // HWBTE
      [NAME]: 'HWBTE',
      [SYMBOL]: 'HWBTE',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x0ed2b3af34b3c58cf61b4db1a9ced9c027eb04b1',
      [REDEEM_MAX_NUM]: 1000000,
      [REDEEM_MIN_NUM]: 0.1,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
      [EXTENDOBJ]: {},
    },
    '0xa78e888599747389dea47c2c106e47f2853bb005': { // ZOL
      [NAME]: 'ZeroLimit',
      [SYMBOL]: 'ZOL',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xd6dac35200a8ce09b904a82a0aa15a6e2c247808',
      [REDEEM_MAX_NUM]: 1000000,
      [REDEEM_MIN_NUM]: 0.1,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
      [EXTENDOBJ]: {},
    },
    '0x48c859531254f25e57d1c1a8e030ef0b1c895c27': { // DEP
      [NAME]: 'Depth',
      [SYMBOL]: 'DEP',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x82f5014280b781c61108161cecf7f769cff0ada7',
      [REDEEM_MAX_NUM]: 1000000,
      [REDEEM_MIN_NUM]: 0.1,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
      [EXTENDOBJ]: {},
    },
    '0x9ef1918a9bee17054b35108bd3e2665e2af1bb1b': { // TPT
      [NAME]: 'TokenPocket' + config.namePrefix,
      [SYMBOL]: 'TPT',
      [DECIMALS]: 4,
      [EXCHANGE_ADDRESS]: '0xb360e1be24c0ab06516ec16ed87ebad640c00bda',
      [REDEEM_MAX_NUM]: 10000000,
      [REDEEM_MIN_NUM]: 200,
      [FEE]: 0.001,
      [MAXFEE]: 800,
      [MINFEE]: 80,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xE09C98F97DaFb1f954cEA0Ce550383E2Bd0C8829',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 10000000,
      [DEPOSIT_MIN_NUM]: 200,
      [EXTENDOBJ]: {
        BRIDGE: [
          { type: 56, isSwitch: 1 }
        ],
        VERSION: 'V2',
        APPROVE: {
          token: '0x7b058df35a14b3dd48f148ecbb5753e9281d1fae'
        },
        APPROVELIMIT: 0
      },
    },
    '0x639a647fbe20b6c8ac19e48e2de44ea792c62c5c': { // LAYER
      [NAME]: 'Unilayer',
      [SYMBOL]: 'LAYER',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x3e4da5136f4e1408f15747b91129b599d3c14d07',
      [REDEEM_MAX_NUM]: 1000,
      [REDEEM_MIN_NUM]: 0.05,
      [FEE]: 0.001,
      [MAXFEE]: 0.1,
      [MINFEE]: 0.008,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xd779967f8b511c5edf39115341b310022900efed',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 1000,
      [DEPOSIT_MIN_NUM]: 0.01,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x765277eebeca2e31912c9946eae1021199b39c61': { // BIFI
      [NAME]: 'beefy.finance' + config.suffix,
      [SYMBOL]: 'BIFI',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xa45ed150f92d1f18e8e1fd8c7fbbf38ebe6e734e',
      [REDEEM_MAX_NUM]: 10000,
      [REDEEM_MIN_NUM]: 0.5,
      [FEE]: 0.001,
      [MAXFEE]: 2,
      [MINFEE]: 0.2,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xe09c98f97dafb1f954cea0ce550383e2bd0c8829',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 10000,
      [DEPOSIT_MIN_NUM]: 0.2,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 56, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x818ec0a7fe18ff94269904fced6ae3dae6d6dc0b': { // PKG
      [NAME]: 'PKG Token',
      [SYMBOL]: 'PKG',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xb0b6dbc518ea64d34a07911a343b7fb65d8f979c',
      [REDEEM_MAX_NUM]: 1000,
      [REDEEM_MIN_NUM]: 0.05,
      [FEE]: 0.001,
      [MAXFEE]: 0.1,
      [MINFEE]: 0.008,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xd779967f8b511c5edf39115341b310022900efed',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 1000,
      [DEPOSIT_MIN_NUM]: 0.01,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0xefaeee334f0fd1712f9a8cc375f427d9cdd40d73': { // WOW
      [NAME]: 'WOWswap' + config.suffix,
      [SYMBOL]: 'WOW',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x32d53947a36d4520f7e2c3fd4003aaec3490debc',
      [REDEEM_MAX_NUM]: 10000,
      [REDEEM_MIN_NUM]: 0.5,
      [FEE]: 0.001,
      [MAXFEE]: 2,
      [MINFEE]: 0.2,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xe09c98f97dafb1f954cea0ce550383e2bd0c8829',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 10000,
      [DEPOSIT_MIN_NUM]: 0.2,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 56, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x461d52769884ca6235b685ef2040f47d30c94eb5': { // SAFEMOON
      [NAME]: 'SafeMoon' + config.suffix,
      [SYMBOL]: 'SAFEMOON',
      [DECIMALS]: 9,
      [EXCHANGE_ADDRESS]: '0x210aaa219ace3aaadb8e69d164ac01a0a2ec5807',
      [REDEEM_MAX_NUM]: 10000,
      [REDEEM_MIN_NUM]: 0.5,
      [FEE]: 0.001,
      [MAXFEE]: 2,
      [MINFEE]: 0.2,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xe09c98f97dafb1f954cea0ce550383e2bd0c8829',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 10000,
      [DEPOSIT_MIN_NUM]: 0.2,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 56, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
  },
  [HT_TEST_CHAINID]: {
    '0x4373ca233c17b8bf1bf8159d56019d3394a0670d': { // ANY
      [NAME]: 'Anyswap',
      [SYMBOL]: 'ANY',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x6fee8abb295f6103e7c355d924be28f843d89881',
      [REDEEM_MAX_NUM]: 1000000,
      [REDEEM_MIN_NUM]: 0.1,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
      [EXTENDOBJ]: {},
    },
    '0x3b2c595173831bc4ceea2406fe49577bdb95d90a': { // HTC
      [NAME]: 'HTCToken',
      [SYMBOL]: 'HTC',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xf963995ab33c801a5801be905db4da7f9b89ccf5',
      [REDEEM_MAX_NUM]: 1000000,
      [REDEEM_MIN_NUM]: 0.1,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
      [EXTENDOBJ]: {},
    },
  }
}