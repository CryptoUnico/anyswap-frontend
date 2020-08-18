import React, { useState, useReducer, useEffect, useRef } from 'react'
// import ReactGA from 'react-ga'
import { createBrowserHistory } from 'history'
import { ethers } from 'ethers'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import { useWeb3React, useSwapTokenContract } from '../../hooks'
import { brokenTokens } from '../../constants'
import { amountFormatter, isAddress } from '../../utils'

// import { useExchangeContract } from '../../hooks'
import { useTokenDetails, INITIAL_TOKENS_CONTEXT } from '../../contexts/Tokens'
import { useTransactionAdder } from '../../contexts/Transactions'
import { useAddressBalance, useExchangeReserves } from '../../contexts/Balances'
import { useAddressAllowance } from '../../contexts/Allowances'
import { useWalletModalToggle } from '../../contexts/Application'

import { Button, TitleBox } from '../../theme'
import CurrencyInputPanel from '../CurrencyInputPanel'
import AddressInputPanel from '../AddressInputPanel'
import OversizedPanel from '../OversizedPanel'
// import TransactionDetails from '../TransactionDetails'
import WarningCard from '../WarningCard'
import { transparentize } from 'polished'
import WalletConnectData from '../WalletModal/WalletConnectData'
import Modal from '../Modal'
import { ReactComponent as QRcode } from '../../assets/images/QRcode.svg'
import TokenLogo from '../TokenLogo'

import { GetServerInfo, RegisterAddress } from '../../utils/axios'
import { copyTxt } from '../../utils/tools'

import config from '../../config'
import {getWeb3ConTract, getWeb3BaseInfo} from '../../utils/web3/txns'
import swapBTCABI from '../../constants/abis/swapBTCABI'
import swapETHABI from '../../constants/abis/swapETHABI'

import HardwareTip from '../HardwareTip'
import ResertSvg from '../../assets/images/icon/revert.svg'
import BirdgeIcon from '../../assets/images/icon/bridge-white.svg'
import BirdgeBtnIcon from '../../assets/images/icon/bridge-white-btn.svg'
import WarningIcon from '../../assets/images/icon/warning.svg'
import BulbIcon from '../../assets/images/icon/bulb.svg'
import DepositIcon from '../../assets/images/icon/deposit.svg'
import DepositActiveIcon from '../../assets/images/icon/deposit-purple.svg'
import WithdrawIcon from '../../assets/images/icon/withdraw.svg'
import WithdrawActiveIcon from '../../assets/images/icon/withdraw-purple.svg'
import ScheduleIcon from '../../assets/images/icon/schedule.svg'
import { ReactComponent as Close } from '../../assets/images/x.svg'

import Copy from '../AccountDetails/Copy'

import { useBetaMessageManager } from '../../contexts/LocalStorage'
import WarningTip from '../WarningTip'

import {getErcBalance, HDsendERC20Txns, MMsendERC20Txns, getHashStatus} from '../../utils/web3/Erc20Web3'
import ERC20_TOKEN from '../../contexts/Tokens_erc20'
const INPUT = 0
const OUTPUT = 1

const DownArrowBackground = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  object-fit: contain;
  border-radius: 6px;
  margin: 3px auto;
  cursor:pointer;
`

// const WrappedArrowDown = ({ clickable, active, ...rest }) => <ArrowDown {...rest} />
// const DownArrow = styled(WrappedArrowDown)`
//   color: ${({ theme, active }) => (active ? theme.royalBlue : theme.chaliceGray)};
//   width: 0.625rem;
//   height: 0.625rem;
//   position: relative;
//   padding: 0.875rem;
//   cursor: ${({ clickable }) => clickable && 'pointer'};
// `
const DownArrow = styled.div`
  width: 32px;
  height: 32px;
  padding:8px;
  margin: 3px auto;
  cursor: pointer;
  img {
    height: 100%;
    display: block;
  }
`

const ExchangeRateWrapper = styled.div`
${({ theme }) => theme.FlexEC};
  width: 100%;
  height: 48px;
  object-fit: contain;
  border-radius: 0.5625rem;
  background: ${({ theme }) => theme.dtilContentBg};
  font-family: 'Manrope';
  font-size: 0.75rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-align: right;
  color: #062536;
  padding: 0 2.5rem;
  margin-top:0.625rem;
  span {
    height: 0.75rem;
    font-family: 'Manrope';
    font-size: 0.75rem;
    font-weight: 800;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    text-align: right;
    color: #062536;
  }
`

const ExchangeRate = styled.div`
  flex: 1 1 auto;
  width: 0;
  color: ${({ theme }) => theme.doveGray};
`

const Flex = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;

  button {
    max-width: 20rem;
  }
`
const InputPanel = styled.div`
${({ theme }) => theme.flexColumnNoWrap}
box-shadow: 0 0.25rem 8px 0 ${({ theme }) => transparentize(0.95, theme.shadowColor)};
position: relative;
border-radius: 1.25rem;
background: ${({theme}) => theme.contentBg};
z-index: 1;
padding: 1.5625rem 2.5rem;
margin-top: 0.625rem;
@media screen and (max-width: 960px) {
  padding: 1rem 1.5625rem;
}
`

const ContainerRow = styled.div`
display: flex;
justify-content: center;
align-items: center;
`

const InputContainer = styled.div`
flex: 1;
`

const LabelRow = styled.div`
${({ theme }) => theme.flexRowNoWrap}
align-items: center;
color: ${({ theme }) => theme.doveGray};
font-size: 0.75rem;
font-family: 'Manrope';
line-height: 1rem;
padding: 0.75rem 0;
`

const LabelContainer = styled.div`
flex: 1 1 auto;
width: 0;
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
`

const InputRow = styled.div`
${({ theme }) => theme.flexRowNoWrap}
align-items: center;
padding: 0.25rem 0rem 0.75rem;
`

const Input = styled.input`
outline: none;
border: none;
flex: 1 1 auto;
width: 0;
background-color: transparent;
border-bottom: 0.0625rem solid ${({theme}) => theme.textColorBold};

color: ${({ error, theme }) => (error ? theme.salmonRed : theme.textColorBold)};
overflow: hidden;
text-overflow: ellipsis;
font-family: 'Manrope';
font-size: 24px;
font-weight: 500;
font-stretch: normal;
font-style: normal;
line-height: 1;
letter-spacing: -0.0625rem;
padding: 8px 0.75rem;
::placeholder {
  color: ${({ theme }) => theme.placeholderGray};
}
`

const MintDiv = styled.div`
  width: 100%;
  padding: 1.25rem 1rem;
`

const MintList = styled.div`
  border-bottom: 0.0625rem  solid ${({ error, theme }) => (error ? theme.salmonRed : theme.mercuryGray)};
  padding: 12px 8px;
  font-family: 'Manrope';
  font-size: 0.875rem;
`
const MintListCenter = styled(MintList)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.875rem;
`

const MintListLabel = styled.div`
  width: 100%;
  font-size:12px;
  color:#96989e;
`

const MintListVal = styled.div`
${({ theme }) => theme.FlexSC};
  width: 100%;
  cursor:pointer
  color:#062536;
  font-size:12px;
  .green {
    color: green
  }
  .red {
    color: red
  }
`

const TokenLogoBox = styled(TokenLogo)`
  padding: 0.625rem;
  background: none;
`

const MintTip = styled.div`
  position: fixed;
  top: 100px;
  right: 80px;
  border-radius: 0.25rem;
  box-shadow:0 0 5px 0px #E1902E;
  z-index: 99;
  cursor:pointer;
  .txt {
    width: 0;height: 100%;white-space: nowrap;overflow: hidden;transition: width 0.5s;
  }
  &:hover {
    .txt {
      width: 150px;padding: 0 1.25rem;
    }
  }
`

const MintHahshList = styled.div`
  position:fixed;
  top:100px;
  right:20px;
  z-index: 99;
  cursor:pointer;
  margin:0;
  ul {
    list-style:none;
    cursor:pointer;
    margin:0;
    padding:15px;
    max-height: 200px;
    overflow:auto;
    li {
      border-radius: 0.25rem;
      box-shadow:0 0 5px 0px #E1902E;
      margin:0 0 20px;
      padding: 5px;
      position:relative;
      img {
        display:block;
      }
      .txt {
        width: 0;height: 100%;white-space: nowrap;overflow: hidden;transition: width 0.5s;
      }
      .del {
        ${({ theme }) => theme.FlexC};
        position:absolute;
        top: -9px;
        right:-9px;
        width: 18px;
        height: 18px;
        border:1px solid #ddd;
        border-radius:100%;
        background: rgba(0,0,0,.1);
        line-height:1;
        font-size:12px;
        color:#fff;
        opacity: 0;
      }
      &:hover {
        .txt {
          width: 150px;padding: 0 1.25rem;
        }
        .del {
          opacity: 1;
        }
      }
    }
  }
  .delete {
    ${({ theme }) => theme.FlexC};
    width:100%;
    background: rgba(0,0,0,.1);
  }
`

const FlexCneter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    max-width: 20rem;
  }
`

const StyledQRcode = styled(QRcode)`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  cursor:pointer;
  margin-left: 0.625rem;
`

const MintWarningTip = styled.div`
${({ theme }) => theme.FlexSC};
  padding: 0.625rem 1rem;
  width: 100%;
  // color:red;
  
  color: #734be2;
  font-family: 'Manrope';
  cursor: pointer;
  flex: 1 0 auto;
  align-items: center;
  position: relative;
  padding: 0.5rem 1rem;
  padding-right: 2rem;
  // margin-bottom: 1rem;
  // border: 0.0625rem solid ${({ theme }) => transparentize(0.6, 'red')};
  // background-color: ${({ theme }) => transparentize(0.9, 'red')};
  
  border: solid 0.5px #b398f9;
  background-color: #f2edff;
  border-radius: 1rem;
  font-size: 0.75rem;
  line-height: 1rem;
  text-align: left;
  margin-top: 10px;
  
  flex-wrap:wrap;
  line-height: 1rem;
  .span {
    text-decoration: underline;
    margin: 0 5px;
  }
  a {
    display:inline-block;
    overflow:hidden;
    height: 1rem;
  }
`

// const StyledCopyICON = styled(copyICON)`
//   width: ${({ size }) => size};
//   height: ${({ size }) => size};
//   margin: 0 0.625rem;
//   cursor:pointer;
// `

const StyledBirdgeIcon = styled.div`
  ${({ theme }) => theme.FlexC};
  img {
    margin-right: 1rem
  }
`

const SubCurrencySelectBox = styled.div`
  width: 100%;
  object-fit: contain;
  border-radius: 0.5625rem;
  border: solid 0.5px #b398f9;
  background-color: #f2edff;
  padding: 1rem 1.25rem;
  margin-top: 0.625rem;

  .tip {
    ${({ theme }) => theme.FlexSC};
    font-size: 12px;
    font-weight: 500;
    color: #734be2;
    padding: 2px 20px 18px;
    border-bottom: 1px solid #f1f6fa;
    word-break:break-all;
    img {
      display:inlne-block;
    }
    p {
      ${({ theme }) => theme.FlexSC};
      flex-wrap:wrap;
      display:inline-block;
      margin: 0;
      line-height: 1rem;
      .span {
        text-decoration: underline;
        margin: 0 5px;
      }
      a {
        display:inline-block;
        overflow:hidden;
        height: 1rem;
      }
    }
  }
  .list {
    margin:0;
    padding: 0 0px 0;
    font-size: 12px;
    color: #734be2;
    dt {
      ${({ theme }) => theme.FlexSC};
      font-weight: bold;
      line-height: 1.5;
      img {
        margin-right: 8px;
      }
    }
    dd {
      font-weight: 500;
      line-height: 1.83;
      i{
        display:inline-block;
        width:4px;
        height: 4px;
        border-radius:100%;
        background:#734be2;
        margin-right: 10px;
      }
    }
  }
`

const NavTabBox = styled.div`
  ${({ theme }) => theme.FlexBC};
  align-items: center;
  font-size: 1rem;
  font-family: 'Manrope';
  color: ${({ theme }) => theme.royalBlue};
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 1rem;

  img {
    height: 0.75rem;
    width: 0.75rem;
  }
`
const TabLinkBox = styled.ul`
  ${({theme}) => theme.FlexSC}
  list-style: none;
  margin: 0;
  padding:0;
  li {
    ${({ theme }) => theme.FlexC}
    height: 38px;
    font-family: 'Manrope';
    font-size: 0.75rem;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    color: #96989e;
    border-top: 0.0625rem solid rgba(0, 0, 0, 0.04);
    border-bottom: 0.0625rem solid rgba(0, 0, 0, 0.04);
    border-left: 0.0625rem solid rgba(0, 0, 0, 0.04);
    cursor:pointer;
    text-decoration: none;
    padding: 0 0.625rem;
    background:#fff;
    white-space:nowrap;

    .icon {
      ${({ theme }) => theme.FlexC}
      width: 28px;
      height: 28px;
      background:#f5f5f5;
      border-radius:100%;
      margin-right:0.625rem;
    }
    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
      &.active {
        border: 0.0625rem solid #734be2;
      }
    }
    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
      border-right: 0.0625rem solid rgba(0, 0, 0, 0.04);
      &.active {
        border: 0.0625rem solid #734be2;
      }
    }

    &.active {
      border: 0.0625rem solid #734be2;
      color: #734be2;
      font-weight: bold;
      .icon {
        background: #734be2;
      }
    }
    @media screen and (max-width: 960px) {
      .icon {
        display:none;
      }
    }
  }
`

const TitleBoxPool = styled(TitleBox)`
margin-bottom: 0;
`
const TokenLogoBox1 = styled.div`
  ${({ theme }) => theme.FlexC};
  width: 46px;
  height: 46px;
  background: ${ ({theme}) => theme.white};
  box-sizing:border-box;
  border-radius: 100%;
  margin-top: 30px;
  border:1px solid #ddd;
`

const DepositValue = styled.div`
width:100%;
text-align: center;
p {
  font-size:12px;
  color:#96989e;
  margin: 15px 0 8px;
}
span {
  color:#062536;
  font-size:22px;
}
`

const HashStatus = styled.div`
  ${({ theme }) => theme.FlexBC};
  width: 100%;
  font-size:12px;
  color: ##062536;
  font-weight:bold;
  padding: 12px 15px;
  border-radius:9px;
  margin-top:30px;
  &.yellow {
    border: 1px solid #e3d1aa;
    background: #fff5e0;
  }
  &.green{
    border: 1px solid #a3daab;
    background: #e2f9e5;
  }
`

const CloseIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 0.875rem;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`
const CloseColor = styled(Close)`
  path {
    stroke: ${({ theme }) => theme.chaliceGray};
  }
`

const HeaderRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  padding: 1.5rem 1.5rem;
  font-weight: 500;
  color: ${props => (props.color === 'blue' ? ({ theme }) => theme.royalBlue : 'inherit')};
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1rem;
  `};
`
const HoverText = styled.div`
  :hover {
    cursor: pointer;
  }
`
const Wrapper = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  margin: 0;
  padding: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.backgroundColor};
`


const UpperSection = styled.div`
  position: relative;
  width: 100%;
  font-family: 'Manrope';

  h5 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 400;
  }

  h5:last-child {
    margin-bottom: 0px;
  }

  h4 {
    margin-top: 0;
    font-weight: 500;
  }
`
const ContentWrapper = styled.div`
width: 100%;
  background-color: ${({ theme }) => theme.backgroundColor};
  padding: 0rem;
  ${({ theme }) => theme.mediaWidth.upToMedium`padding: 1rem`};
`

const DEPOSIT_HISTORY = 'DEPOSIT_HISTORY'

function getInitialSwapState(state) {
  return {
    independentValue: state.exactFieldURL && state.exactAmountURL ? state.exactAmountURL : '', // this is a user input
    dependentValue: '', // this is a calculated number
    independentField: state.exactFieldURL === 'output' ? OUTPUT : INPUT,
    // inputCurrency: state.inputCurrencyURL ? state.inputCurrencyURL : state.outputCurrencyURL === 'FSN' ? '' : 'FSN',
    inputCurrency: state.inputCurrencyURL ? state.inputCurrencyURL : config.initBridge,
    outputCurrency: state.outputCurrencyURL
      ? state.outputCurrencyURL === 'FSN'
        ? !state.inputCurrencyURL || (state.inputCurrencyURL && state.inputCurrencyURL !== 'FSN')
          ? 'FSN'
          : ''
        : state.outputCurrencyURL
      : state.initialCurrency
      ? state.initialCurrency
      : config.initBridge,
    hashArr: sessionStorage.getItem('DEPOSIT_HISTORY') ? JSON.parse(sessionStorage.getItem('DEPOSIT_HISTORY')) : []
  }
}

function swapStateReducer(state, action) {
  switch (action.type) {
    case 'FLIP_INDEPENDENT': {
      const { independentField, inputCurrency, outputCurrency } = state
      return {
        ...state,
        dependentValue: '',
        independentField: independentField === INPUT ? OUTPUT : INPUT,
        inputCurrency: outputCurrency,
        outputCurrency: inputCurrency
      }
    }
    case 'SELECT_CURRENCY': {
      const { inputCurrency, outputCurrency } = state
      const { field, currency } = action.payload

      const newInputCurrency = field === INPUT ? currency : inputCurrency
      const newOutputCurrency = field === OUTPUT ? currency : outputCurrency

      if (newInputCurrency === newOutputCurrency) {
        return {
          ...state,
          inputCurrency: field === INPUT ? currency : '',
          outputCurrency: field === OUTPUT ? currency : ''
        }
      } else {
        return {
          ...state,
          inputCurrency: newInputCurrency,
          outputCurrency: newOutputCurrency
        }
      }
    }
    case 'UPDATE_INDEPENDENT': {
      const { field, value, realyValue } = action.payload
      const { dependentValue, independentValue } = state
      return {
        ...state,
        independentValue: value,
        dependentValue: value === independentValue ? dependentValue : '',
        independentField: field,
        realyValue: realyValue
      }
    }
    case 'UPDATE_DEPENDENT': {
      return {
        ...state,
        dependentValue: action.payload
      }
    }
    case 'UPDATE_BREDGETYPE': {
      return {
        ...state,
        bridgeType: action.payload ? action.payload : 'mint'
      }
    }
    case 'UPDATE_SWAPREGISTER': {
      return {
        ...state,
        registerAddress: action.payload ? action.payload : '',
        PlusGasPricePercentage: action.PlusGasPricePercentage ? action.PlusGasPricePercentage : '',
        isDeposit: action.isDeposit,
        depositMaxNum: action.depositMaxNum ? action.depositMaxNum : '',
        depositMinNum: action.depositMinNum ? action.depositMinNum : '',
        isRedeem: action.isRedeem,
        redeemMaxNum: action.redeemMaxNum ? action.redeemMaxNum : '',
        redeemMinNum: action.redeemMinNum ? action.redeemMinNum : '',
        maxFee: action.maxFee ? action.maxFee : '',
        minFee: action.minFee ? action.minFee : '',
        fee: action.fee ? action.fee : '',
      }
    }
    case 'UPDATE_MINTTYPE': {
      return {
        ...state,
        isViewMintModel: action.payload
      }
    }
    case 'UPDATE_MINTHISTORY': {
      return {
        ...state,
        mintHistory: action.payload
      }
    }
    case 'UPDATE_MINTINFOTYPE': {
      return {
        ...state,
        isViewMintInfo: action.payload
      }
    }
    case 'UPDATE_HASH_STATUS': {
      const { hashData,  type, NewHashCount } = action.payload
      const { hashArr, hashCount } = state
      if (!type) {
        hashArr.push(hashData)
      }
      let arr = type ? hashData : hashArr
      sessionStorage.setItem(DEPOSIT_HISTORY, JSON.stringify(arr))
      let count = 0
      if (hashCount && NewHashCount) {
        count = hashCount + NewHashCount
      }
      return {
        ...state,
        hashArr: arr,
        hashCount: count
      }
    }
    default: { //UPDATE_MINTINFOTYPE
      return getInitialSwapState()
    }
  }
}
const selfUseAllToken=[ 
  'FSN',
  config.initToken
 ]
let historyInterval , hashInterval
// let swapInfo = ''

// getErcBalance('USDT')

export default function ExchangePage({ initialCurrency, sending = false, params }) {
  const { t } = useTranslation()
  let { account, chainId, error } = useWeb3React()
  const [showBetaMessage] = useBetaMessageManager()
  let walletType = sessionStorage.getItem('walletType')
  // let HDPath = sessionStorage.getItem('HDPath')
  // account = '0xd7928d762a9abFA269ED7D9B82AE43911E687D04'
  // console.log(useWeb3React())
  
  const urlAddedTokens = {}
  if (params.inputCurrency) {
    urlAddedTokens[params.inputCurrency] = true
  }
  if (params.outputCurrency) {
    urlAddedTokens[params.outputCurrency] = true
  }
  if (isAddress(initialCurrency)) {
    urlAddedTokens[initialCurrency] = true
  }


  // check URL params for recipient, only on send page
  const initialRecipient = () => {
    if (sending && params.recipient) {
      return params.recipient
    }
    return ''
  }


  // core swap state
  const [swapState, dispatchSwapState] = useReducer(
    swapStateReducer,
    {
      initialCurrency: initialCurrency,
      inputCurrencyURL: params.inputCurrency,
      outputCurrencyURL: params.outputCurrency,
      exactFieldURL: params.exactField,
      exactAmountURL: params.exactAmount
    },
    getInitialSwapState
  )
  const {
    independentValue,
    dependentValue,
    independentField,
    inputCurrency,
    outputCurrency,
    bridgeType,
    registerAddress,
    PlusGasPricePercentage,
    isDeposit,
    depositMaxNum,
    depositMinNum,
    isRedeem,
    redeemMaxNum,
    redeemMinNum,
    maxFee,
    minFee,
    fee,
    isViewMintModel,
    mintHistory,
    isViewMintInfo,
    realyValue,
    hashArr,
    hashCount
  } = swapState


  const [recipient, setRecipient] = useState({
    address: initialRecipient(),
    name: ''
  })

  // get swap type from the currency types
  // const swapType = getSwapType(inputCurrency, outputCurrency)

  const [recipientError, setRecipientError] = useState()

  // get decimals and exchange address for each of the currency types
  const {
    symbol: inputSymbol,
    decimals: inputDecimals,
    name: inputName,
    isSwitch,
    depositType,
    depositAddress: initDepositAddress,
    isDeposit: initIsDeposit,
    depositMaxNum: initDepositMaxNum,
    depositMinNum: initDepositMinNum,
    isRedeem: initIsRedeem,
    redeemMaxNum: initRedeemMaxNum,
    redeemMinNum: initRedeemMinNum,
    maxFee: initMaxFee,
    minFee: initMinFee,
    fee: initFee,
  } = useTokenDetails( inputCurrency )
  // console.log(inputSymbol)
  // console.log(inputCurrency)

  const [isRegister, setIsRegister] = useState(false)

  useEffect(() => {
    if (account && config.CoinInfo[inputSymbol] && config.CoinInfo[inputSymbol].url && isSwitch) {
      let url = config.CoinInfo[inputSymbol].url
      let coin = inputSymbol.replace(config.prefix, '')
      RegisterAddress(url, account, coin).then(res => {
        if ( res && (
            (res.result && res.result === 'Success')
            || (res.error && res.error.message === 'mgoError: Item is duplicate')
          )
        ) {
          setIsRegister(true)
        } else {
          setIsRegister(false)
        }
        GetServerInfo(url).then(result => {
          // console.log(result)
          if (result && result.swapInfo && result.swapInfo.SrcToken.DepositAddress) {
            let dObj = result.swapInfo.SrcToken,
                rObj = result.swapInfo.DestToken
            let DepositAddress = res && res.result && res.result.P2shAddress ? res.result.P2shAddress : ''
            if (inputSymbol !== config.prefix + 'BTC') {
              DepositAddress = dObj.DepositAddress
              let erc20Token = ERC20_TOKEN[config.ercConfig.chainID][coin].token
              if (
                (initDepositAddress.toLowerCase() !== DepositAddress.toLowerCase())
                || (inputCurrency.toLowerCase() !== rObj.ContractAddress.toLowerCase())
                || (erc20Token.toLowerCase() !== dObj.ContractAddress.toLowerCase())
              ) {
                dispatchSwapState({
                  type: 'UPDATE_SWAPREGISTER',
                  payload: '',
                  PlusGasPricePercentage: '',
                  isDeposit: 0,
                  depositMaxNum: '',
                  depositMinNum: '',
                  isRedeem: 0,
                  redeemMaxNum: '',
                  redeemMinNum: '',
                  maxFee: '',
                  minFee: '',
                  fee: '',
                })
                return
              }
            }
            dispatchSwapState({
              type: 'UPDATE_SWAPREGISTER',
              payload: DepositAddress,
              PlusGasPricePercentage: dObj.PlusGasPricePercentage,
              isDeposit: !dObj.DisableSwap ? 1 : 0,
              depositMaxNum: dObj.MaximumSwap,
              depositMinNum: dObj.MinimumSwap,
              isRedeem: !rObj.DisableSwap ? 1 : 0,
              redeemMaxNum: rObj.MaximumSwap,
              redeemMinNum: rObj.MinimumSwap,
              maxFee: rObj.MaximumSwapFee,
              minFee: rObj.MinimumSwapFee,
              fee: rObj.SwapFeeRate,
            })
          } else {
            dispatchSwapState({
              type: 'UPDATE_SWAPREGISTER',
              payload: initDepositAddress,
              isDeposit: initIsDeposit,
              depositMaxNum: initDepositMaxNum,
              depositMinNum: initDepositMinNum,
              isRedeem: initIsRedeem,
              redeemMaxNum: initRedeemMaxNum,
              redeemMinNum: initRedeemMinNum,
              maxFee: initMaxFee,
              minFee: initMinFee,
              fee: initFee,
            })
          }
        })
      })
    } else {
      dispatchSwapState({
        type: 'UPDATE_SWAPREGISTER',
        payload: '',
      })
    }
  }, [inputCurrency, account])

  const [outNetBalance, setOutNetBalance] = useState()
  const [outNetETHBalance, setOutNetETHBalance] = useState()
  function getOutBalance () {
    if (depositType === 1 && account) {
      let coin = inputSymbol ? inputSymbol.replace(config.prefix, '') : ''
      if (coin) {
        getErcBalance(coin, account).then(res => {
          // console.log(res)
          if (res) {
            if (Number(outNetBalance) !== res.TOKEN || Number(outNetETHBalance) !== res.ETH) {
              setOutNetBalance(res.TOKEN)
              setOutNetETHBalance(res.ETH)
            }
          }
        })
      }
    }
  }

  useEffect(() => {
    setOutNetBalance('')
    setOutNetETHBalance('')
    getOutBalance()
  }, [inputCurrency, account])

  useEffect(() => {
    getOutBalance()
  }, [hashCount])

  // get balances for each of the currency types
  const inputBalance = useAddressBalance(account, inputCurrency)
  const FSNBalance = useAddressBalance(account, 'FSN')
  const FSNBalanceNum = FSNBalance ? amountFormatter(FSNBalance) : 0
  // console.log(FSNBalanceNum)
  // const outputBalance = useAddressBalance(account, outputCurrency)
  const inputBalanceFormatted = !!(inputBalance && Number.isInteger(inputDecimals))
    ? amountFormatter(inputBalance, inputDecimals, inputDecimals)
    : ''

  // declare/get parsed and formatted versions of input/output values
  // const [independentValueParsed, setIndependentValueParsed] = useState()
  const dependentValueFormatted = !!(dependentValue && (inputDecimals || inputDecimals === 0))
    ? amountFormatter(dependentValue, inputDecimals, Math.min(8, inputDecimals), false)
    : ''
  // const inputValueParsed = independentField === INPUT ? independentValueParsed : dependentValue
  let inputValueFormatted = independentField === INPUT ? independentValue : dependentValueFormatted
  inputValueFormatted = inputValueFormatted ? Number(Number(inputValueFormatted).toFixed(inputDecimals)) : ''
  // console.log(inputValueFormatted)
  function formatBalance(value) {
    return `Balance: ${value}`
  }
  const toggleWalletModal = useWalletModalToggle()

  const newInputDetected =
    inputCurrency !== 'FSN' && inputCurrency && !INITIAL_TOKENS_CONTEXT[chainId].hasOwnProperty(inputCurrency)

  const [showInputWarning, setShowInputWarning] = useState(false)
  // const [showOutputWarning, setShowOutputWarning] = useState(false)
  // console.log(inputDecimals)
  useEffect(() => {
    if (newInputDetected) {
      setShowInputWarning(true)
    } else {
      setShowInputWarning(false)
    }
  }, [newInputDetected, setShowInputWarning])

  const addTransaction = useTransactionAdder()

  const tokenContract = useSwapTokenContract(inputCurrency, swapBTCABI)
  const tokenETHContract = useSwapTokenContract(inputCurrency, swapETHABI)

  const [isHardwareTip, setIsHardwareTip] = useState(false)
  const [isHardwareError, setIsHardwareError] = useState(false)
  const [hardwareTxnsInfo, setHardwareTxnsInfo] = useState('')
  const [isDisabled, setIsDisableed] = useState(true)
  const [isMintBtn, setIsMintBtn] = useState(false)
  const [isRedeemBtn, setIsRedeem] = useState(false)
  const [mintDtil, setMintDtil] = useState({
    coin: '',
    value: '',
    hash: '',
    from: '',
    to: '',
    status: 0,
    timestamp: ''
  })
  const [mintDtilView, setMintDtilView] = useState(false)
  const [mintSureBtn, setMintSureBtn] = useState(false)
  const [mintModelTitle, setMintModelTitle] = useState()
  const [mintModelTip, setMintModelTip] = useState()
  const [balanceError, setBalanceError] = useState()
  useEffect(() => {
    // console.log(inputValueFormatted)
    if (bridgeType && bridgeType === 'redeem') {
      if (Number(inputValueFormatted) > Number(inputBalanceFormatted)) {
        setBalanceError('Error')
      } else {
        setBalanceError('')
      }
    } else {
      if (Number(inputValueFormatted) > Number(outNetBalance)) {
        setBalanceError('Error')
      } else {
        setBalanceError('')
      }
    }
  }, [bridgeType, inputBalanceFormatted, outNetBalance, outNetETHBalance, inputCurrency, dependentValue, inputValueFormatted])

  // !account && !error && isDisabled && !isDeposit && showBetaMessage ? false : !independentValue || !recipient.address || !showBetaMessage
  useEffect(() => {
    if (
      !error
      && isDisabled 
      && isRedeem 
      && !showBetaMessage 
      && inputValueFormatted
      && recipient.address
      && Number(inputBalanceFormatted) >= Number(inputValueFormatted)
      && Number(inputValueFormatted) <= Number(redeemMaxNum)
      && Number(inputValueFormatted) >= Number(redeemMinNum)
    ) {
      if (inputSymbol === config.prefix + 'BTC' && config.reg[inputSymbol] && config.reg[inputSymbol].test(recipient.address)) {
        setIsRedeem(false)
      } else if (inputSymbol !== config.prefix + 'BTC' && isAddress(recipient.address)) {
        setIsRedeem(false)
      } else {
        setIsRedeem(true)
      }
    } else {
      setIsRedeem(true)
    }
  }, [account, isDisabled, isRedeem, showBetaMessage, recipient.address, independentValue, inputSymbol])
  useEffect(() => {
      if (
        isDisabled 
        && isDeposit 
        && !showBetaMessage 
        && inputValueFormatted
        && registerAddress
        && Number(inputValueFormatted) <= depositMaxNum
        && Number(inputValueFormatted) >= depositMinNum
        && Number(inputValueFormatted) <= Number(outNetBalance)
        && Number(outNetETHBalance) >= 0.01
        && isRegister
      ) {
        setIsMintBtn(false)
      } else {
        setIsMintBtn(true)
      }
  }, [account, isDisabled, isDeposit, showBetaMessage, registerAddress, independentValue, inputSymbol, outNetBalance])
  function sendTxns () {
    // console.log(config)
    if (!isDisabled) return
    setIsDisableed(false)
    setTimeout(() => {
      setIsDisableed(true)
    }, 3000)
    let amountVal = Number(inputValueFormatted) * Math.pow(10, inputDecimals)
    amountVal = amountVal.toFixed(0)
    let address = recipient.address
    if (config.supportWallet.includes(walletType)) {
      setIsHardwareError(false)
      setIsHardwareTip(true)
      setHardwareTxnsInfo(inputValueFormatted + " "  + inputSymbol)
      let web3Contract = getWeb3ConTract(swapBTCABI, inputCurrency)
      // let data = web3Contract.Swapout.getData(amountVal, address)
      // console.log(amountVal)
      // console.log(address)
      let data = web3Contract.methods.Swapout(amountVal, address).encodeABI()
      if (inputSymbol !== config.prefix + 'BTC') {
        web3Contract = getWeb3ConTract(swapETHABI, inputCurrency)
        // data = web3Contract.Swapout.getData(amountVal)
        data = web3Contract.methods.Swapout(amountVal, address).encodeABI()
      }
      getWeb3BaseInfo(inputCurrency, inputCurrency, data, account).then(res => {
        if (res.msg === 'Success') {
          addTransaction(res.info)
          dispatchSwapState({
            type: 'UPDATE_INDEPENDENT',
            payload: {
              value: '',
              field: INPUT,
              realyValue: ''
            }
          })
        } else {
          alert(res.error)
        }
        setIsHardwareTip(false)
      })
      return
    }

    if (inputSymbol !== config.prefix + 'BTC') {
      // console.log(amountVal)
      tokenETHContract.Swapout(amountVal, address).then(res => {
        // console.log(res)
        addTransaction(res)
        dispatchSwapState({
          type: 'UPDATE_INDEPENDENT',
          payload: {
            value: '',
            field: INPUT,
            realyValue: ''
          }
        })
        setIsHardwareTip(false)
      }).catch(err => {
        console.log(err)
        setIsHardwareTip(false)
      })
    } else {
      tokenContract.Swapout(amountVal, address).then(res => {
        addTransaction(res)
        dispatchSwapState({
          type: 'UPDATE_INDEPENDENT',
          payload: {
            value: '',
            field: INPUT,
            realyValue: ''
          }
        })
        setIsHardwareTip(false)
      }).catch(err => {
        console.log(err)
        setIsHardwareTip(false)
      })
    }
  }
  function MintModelView () {
    if (!registerAddress) return
    dispatchSwapState({
      type: 'UPDATE_MINTTYPE',
      payload: isViewMintModel ? false : true
    })
  }
  function MintInfoModelView () {
    dispatchSwapState({
      type: 'UPDATE_MINTINFOTYPE',
      payload: isViewMintInfo ? false : true
    })
  }
  function changeMorR () {
    let bt = ''
    if (bridgeType && bridgeType === 'redeem') {
      bt = 'mint'
    } else {
      bt = 'redeem'
    }
    dispatchSwapState({ type: 'UPDATE_BREDGETYPE', payload: bt })
    dispatchSwapState({
      type: 'UPDATE_INDEPENDENT',
      payload: {
        value: '',
        field: INPUT,
        realyValue: ''
      }
    })
  }
  function copyAddr () {
    copyTxt(registerAddress)
  }
  function mintAmount () {
    let coin = inputSymbol.replace(config.prefix, '')
    if (walletType === 'Ledger') {
      setHardwareTxnsInfo(inputValueFormatted + ' ' + coin)
      setIsHardwareTip(true)
      setMintSureBtn(false)
      // MintModelView()
      HDsendERC20Txns(coin, account, registerAddress, inputValueFormatted, PlusGasPricePercentage).then(res => {
        // console.log(res)
        if (res.msg === 'Success') {
          dispatchSwapState({
            type: 'UPDATE_HASH_STATUS',
            payload: {
              type: 0,
              hashData: {
                coin: coin,
                value: inputValueFormatted,
                hash: res.info.hash,
                from: account,
                to: registerAddress,
                status: 0,
                timestamp: Date.now(),
                swapHash: '',
                swapStatus: '',
                swapTime: '',
              }
            }
          })
          dispatchSwapState({
            type: 'UPDATE_INDEPENDENT',
            payload: {
              value: '',
              field: INPUT,
              realyValue: ''
            }
          })
        }
        setIsHardwareTip(false)
        setMintSureBtn(false)
        setMintModelTitle('')
        setMintModelTip('')
      })
    } else {
      setMintSureBtn(false)
      MMsendERC20Txns(coin, account, registerAddress, inputValueFormatted, PlusGasPricePercentage).then(res => {
        // console.log(res)
        if (res.msg === 'Success') {
          dispatchSwapState({
            type: 'UPDATE_HASH_STATUS',
            payload: {
              type: 0,
              hashData: {
                coin: coin,
                value: inputValueFormatted,
                hash: res.info.hash,
                from: account,
                to: registerAddress,
                status: 0,
                timestamp: Date.now(),
                swapHash: '',
                swapStatus: '',
                swapTime: '',
              }
            }
          })
          dispatchSwapState({
            type: 'UPDATE_INDEPENDENT',
            payload: {
              value: '',
              field: INPUT,
              realyValue: ''
            }
          })
        }
        setIsHardwareTip(false)
        setMintSureBtn(false)
        setMintModelTitle('')
        setMintModelTip('')
        // MintModelView()
      })
    }
  }
  function removeHashArr () {
    dispatchSwapState({
      type: 'UPDATE_HASH_STATUS',
      payload: {
        type: 1,
        hashData: []
      }
    })
  }
  const [removeHashStatus, setRemoveHashStatus] = useState()
  function removeHash (index) {
    let arr = []
    for (let i = 0, len = hashArr.length; i < len; i++) {
      if (index === i) continue
      arr.push(hashArr[i])
    }
    dispatchSwapState({
      type: 'UPDATE_HASH_STATUS',
      payload: {
        type: 1,
        hashData: arr,
      }
    })
    setRemoveHashStatus(Date.now())
  }

  function updateHashStatus () {
    if (hashArr.length > 0) {
      for (let i = 0, len = hashArr.length; i < len; i ++) {
        if (
          !hashArr[i].status
          || !hashArr[i].swapStatus
          || hashArr[i].swapStatus === 'confirming'
          || hashArr[i].swapStatus === 'minting'
        ) {
          getHashStatus(hashArr[i].hash, i, hashArr[i].coin, hashArr[i].status).then(res => {
            if (hashArr[res.index] && res.hash === hashArr[res.index].hash) {
              hashArr[res.index].status = res.status
              hashArr[res.index].swapHash = res.swapHash ? res.swapHash : ''
              hashArr[res.index].swapStatus = res.swapStatus ? res.swapStatus : ''
              hashArr[res.index].swapTime = res.swapTime ? res.swapTime : ''
              dispatchSwapState({
                type: 'UPDATE_HASH_STATUS',
                payload: {
                  type: 1,
                  hashData: hashArr,
                  NewHashCount: 1
                }
              })
            }
          })
        }
      }
    }
  }

  useEffect(() => {
    clearInterval(hashInterval)
    updateHashStatus()
    hashInterval = setInterval(() => {
      if (location.pathname.indexOf('bridge') !== -1) {
        updateHashStatus()
      } else {
        clearInterval(hashInterval)
      }
    }, 1000 * 50)
  }, [removeHashStatus])
  // console.log(hashCount)
  return (
    <>
      <HardwareTip
        HardwareTipOpen={isHardwareTip}
        closeHardwareTip={() => {
          setIsHardwareTip(false)
        }}
        error={isHardwareError}
        txnsInfo={hardwareTxnsInfo}
        isSelfBtn={mintSureBtn}
        onSure={() => {
          mintAmount()
        }}
        title={mintModelTitle}
        tipInfo={mintModelTip}
        coin={inputSymbol}
      ></HardwareTip>
      {showInputWarning && (
        <WarningCard
          onDismiss={() => {
            setShowInputWarning(false)
          }}
          urlAddedTokens={urlAddedTokens}
          currency={inputCurrency}
        />
      )}
      <Modal isOpen={isViewMintModel} maxHeight={800}>
        <MintDiv>
          {inputValueFormatted ? (
            <>
              <MintList>
                <MintListLabel>{t('deposit1')} {inputSymbol && inputSymbol.replace(config.prefix, '')} {t('amount')}:</MintListLabel>
                <MintListVal>{inputValueFormatted}</MintListVal>
              </MintList>
            </>
          ) : ''}
          <MintList>
            <MintListLabel>{t('deposit1')} {inputSymbol && inputSymbol.replace(config.prefix, '')} {t('address')}:</MintListLabel>
            <MintListVal onClick={copyAddr}>{registerAddress ? registerAddress : ''}</MintListVal>
          </MintList>
          <MintListCenter>
            <WalletConnectData size={160} uri={registerAddress} />
          </MintListCenter>
          <FlexCneter>
            <Button onClick={MintModelView}  style={{marginRight: '10px'}}  >{t('close')}</Button>
            <Button onClick={mintAmount} >{t('mint')}</Button>
          </FlexCneter>
        </MintDiv>
      </Modal>

      <Modal isOpen={isViewMintInfo} maxHeight={800}>
        <MintDiv>
          <MintList>
            <MintListLabel>{t('hash')}:</MintListLabel>
            <MintListVal>{mintHistory && mintHistory.mintHash ? mintHistory.mintHash : ''}</MintListVal>
          </MintList>
          <MintList>
            <MintListLabel>{t('from')}:</MintListLabel>
            <MintListVal>{mintHistory && mintHistory.from ? mintHistory.from : ''}</MintListVal>
          </MintList>
          <MintList>
            <MintListLabel>{t('to')}:</MintListLabel>
            <MintListVal>{registerAddress ? registerAddress : ''}</MintListVal>
          </MintList>
          <MintList>
            <MintListLabel>{t('value')}:</MintListLabel>
            <MintListVal>{mintHistory && mintHistory.mintValue ? mintHistory.mintValue : ''}</MintListVal>
          </MintList>
          <MintList>
            <MintListLabel>{t('fee')}:</MintListLabel>
            <MintListVal>{mintHistory && mintHistory.mintValue && (fee || fee === 0) ? Number(mintHistory.mintValue) * Number(fee) : 0}</MintListVal>
          </MintList>
          <MintList>
            <MintListLabel>{t('receive')}:</MintListLabel>
            <MintListVal>{mintHistory && mintHistory.mintValue && (fee || fee === 0) ? Number(mintHistory.mintValue) * (1 - Number(fee)) : ''}</MintListVal>
          </MintList>
          <MintList>
            <MintListLabel>{t('receive')} FSN {t('address')}:</MintListLabel>
            <MintListVal>{account}</MintListVal>
          </MintList>
          <FlexCneter style={{marginTop: '30px'}}>
            <Button onClick={MintInfoModelView} >{t('close')}</Button>
          </FlexCneter>
        </MintDiv>
      </Modal>

      <Modal isOpen={mintDtilView} maxHeight={800}>
        <Wrapper>
          <UpperSection>
            <CloseIcon onClick={() =>  {
              setMintDtilView(false)
            }}>
              <CloseColor alt={'close icon'} />
            </CloseIcon>
            <HeaderRow>
              <HoverText>{
                t('txnsDtil')
              }</HoverText>
            </HeaderRow>
            <ContentWrapper>
              <MintDiv>
                <MintList>
                  <MintListLabel>{t('hash')}:</MintListLabel>
                  <MintListVal>
                    <a href={config.ercConfig.lookHash + mintDtil.hash} target="_blank">{mintDtil.hash}</a>
                    <Copy toCopy={mintDtil.hash} />
                  </MintListVal>
                </MintList>
                <MintList>
                  <MintListLabel>{t('from')}:</MintListLabel>
                  <MintListVal>
                    {mintDtil.from}
                    <Copy toCopy={mintDtil.from} />
                  </MintListVal>
                </MintList>
                <MintList>
                  <MintListLabel>{t('to')}:</MintListLabel>
                  <MintListVal>
                    {mintDtil.to}
                    <Copy toCopy={mintDtil.to} />
                  </MintListVal>
                </MintList>
                <MintList>
                  <MintListLabel>{t('value')}:</MintListLabel>
                  <MintListVal>{mintDtil.value}</MintListVal>
                </MintList>
                <FlexCneter>
                  <TokenLogoBox1>
                    <TokenLogo address={mintDtil.coin} size={'26px'} ></TokenLogo>
                  </TokenLogoBox1>
                </FlexCneter>
                <FlexCneter>
                  <DepositValue>
                    <p>{t('ValueDeposited')}</p>
                    <span>{mintDtil.value} {mintDtil.coin}</span>
                  </DepositValue>
                </FlexCneter>
                <HashStatus className={
                  mintDtil.status === 0 ? 'yellow' : 'green'
                }>
                  <div>
                    <img src={ScheduleIcon} alt='' style={{marginRight: '10px'}}/>
                    Ethereum {t('txnsStatus')}
                  </div>
                  {mintDtil.status === 0 ? (<span className='green'>Pending</span>) : ''}
                  {mintDtil.status === 1 ? (<span className='green'>Success</span>) : ''}
                  {mintDtil.status === 2 ? (<span className='red'>Failure</span>) : ''}
                </HashStatus>
                {
                  mintDtil.swapStatus ? (
                    <HashStatus className={
                      mintDtil.swapStatus === 'confirming' || mintDtil.swapStatus === 'minting' ? 'yellow' : 'green'
                    }>
                      <div>
                        <img src={ScheduleIcon} alt='' style={{marginRight: '10px'}}/>
                        Fusion {t('txnsStatus')}
                      </div>
                      <span style={{textTransform: 'Capitalize'}}>{mintDtil.swapStatus}</span>
                    </HashStatus>
                  ) : ''
                }
              </MintDiv>
            </ContentWrapper>
          </UpperSection>
        </Wrapper>
        
      </Modal>

      { (mintHistory && mintHistory.mintTip) ?  
          (
            <>
              <MintTip onClick={MintInfoModelView}>
                <FlexCneter>
                  <FlexCneter><TokenLogoBox size={'34px'} address={inputSymbol ? 'BTC' : inputSymbol.replace(config.prefix, '')} /></FlexCneter>
                  <span className="txt"><FlexCneter>Waiting for deposit</FlexCneter></span>
                </FlexCneter>
              </MintTip>
            </>
          )
          :
          ''
      }

      <MintHahshList key={hashCount}>
        <ul>
          {hashArr.map((item, index) => {
            if (item.from !== account) {
              return ''
            }
            return (
              <li key={hashCount ? index + hashCount : index}>
                <FlexCneter>
                  <TokenLogo address={item.coin} size={'2rem'}  onClick={() => {
                    setMintDtil(item)
                    setMintDtilView(true)
                  }}/>
                  <div
                    className='del'
                    onClick={() => {
                      removeHash(index)
                    }}
                  >x</div>
                  {/* <span className="txt"><FlexCneter>Waiting for deposit</FlexCneter></span> */}
                </FlexCneter>
              </li>
            )
          })}
        </ul>
        {/* {
          hashArr.length > 0 ? (
            <div onClick={() => {
              removeHashArr()
            }} className='delete'>x</div>
          ) : ''
        } */}
      </MintHahshList>
      
      <NavTabBox>
        <TitleBoxPool>{t('bridge')}</TitleBoxPool>
        <TabLinkBox>
          <li
              className={bridgeType && bridgeType === 'redeem' ? '' : 'active'}
              onClick={changeMorR}
            > 
            <div className='icon'>
              {
                bridgeType && bridgeType === 'redeem' ? (
                  <img alt={''} src={DepositIcon}/>
                ) : (
                  <img alt={''} src={DepositActiveIcon}/>
                )
              }
            </div>
            {t('deposit1')}
          </li>
          <li
              className={bridgeType && bridgeType === 'redeem' ? 'active' : ''}
              onClick={changeMorR}
            > 
            <div className='icon'>
              {
                bridgeType && bridgeType === 'redeem' ? (
                  <img alt={''} src={WithdrawActiveIcon}/>
                ) : (
                  <img alt={''} src={WithdrawIcon}/>
                )
              }
            </div>
            {t('redeem')}
          </li>
        </TabLinkBox>
      </NavTabBox>
      <CurrencyInputPanel
        // title={t('input')}
        title={t(bridgeType && bridgeType === 'redeem' ? 'redeem' : 'deposit1')}
        urlAddedTokens={urlAddedTokens}
        extraText={bridgeType && bridgeType === 'redeem' && inputBalanceFormatted ? formatBalance(inputBalanceFormatted) : (outNetBalance ? formatBalance(outNetBalance) : '')}
        extraTextClickHander={() => {
          // console.log(inputBalance)
          if (inputBalance && inputDecimals) {
            const valueToSet = inputCurrency === 'FSN' ? inputBalance.sub(ethers.utils.parseEther('.1')) : inputBalance
            // console.log(valueToSet)
            if (valueToSet.gt(ethers.constants.Zero)) {
              let inputVal = Number(inputBalance) / Math.pow(10, inputDecimals)
              let value = ''
              if (bridgeType && bridgeType === 'redeem') {
                // inputVal = Number(inputBalance) / Math.pow(10, inputDecimals)
                if (inputVal < Number(redeemMinNum)) {
                  inputVal = ''
                } else if (inputVal > Number(redeemMaxNum)) {
                  inputVal = redeemMaxNum
                } else {
                  // inputVal = inputVal.toFixed(Math.min(8, inputDecimals))
                  inputVal = inputVal
                }
                value = inputVal
                let _fee = Number(inputVal) * Number(fee)
                if (_fee < minFee) {
                  _fee = minFee
                } else if (_fee > maxFee) {
                  _fee = maxFee
                }
                inputVal = Number(inputVal) - _fee
              } else {
                inputVal = outNetBalance
                value = inputVal
                if (inputVal < Number(depositMinNum)) {
                  inputVal = ''
                } else if (inputVal > Number(depositMaxNum)) {
                  inputVal = depositMaxNum
                }
              }
              // console.log(inputVal)
              // console.log(amountFormatter(valueToSet, inputDecimals, inputDecimals, false))
              dispatchSwapState({
                type: 'UPDATE_INDEPENDENT',
                payload: {
                  // value: bridgeType && bridgeType === 'redeem' ? amountFormatter(valueToSet, inputDecimals, inputDecimals, false) : inputVal,
                  value: value,
                  field: INPUT,
                  realyValue: inputVal ? Number(inputVal) : ''
                }
              })
            }
          }
        }}
        onCurrencySelected={inputCurrency => {
          dispatchSwapState({
            type: 'SELECT_CURRENCY',
            payload: { currency: inputCurrency, field: INPUT }
          })
        }}
        onValueChange={inputValue => {
          let inputVal = inputValue
          if (bridgeType && bridgeType === 'redeem') {
            let _fee = Number(inputValue) * Number(fee)
            if (_fee < minFee) {
              _fee = minFee
            } else if (_fee > maxFee) {
              _fee = maxFee
            }
            inputVal = Number(inputValue) - _fee
            if (inputVal < 0) {
              inputVal = ''
            } else {
              inputVal = inputVal.toFixed(Math.min(8, inputDecimals))
            }
          } else {
            inputVal = Number(inputVal).toFixed(Math.min(8, inputDecimals))
          }
          // console.log(inputValue)
          dispatchSwapState({
            type: 'UPDATE_INDEPENDENT',
            payload: {
              value: inputValue,
              field: INPUT,
              // realyValue: bridgeType && bridgeType === 'redeem' ? inputVal : inputValue
              realyValue: inputVal ? Number(inputVal) : ''
            }
          })
        }}
        isSelfSymbol={bridgeType && bridgeType === 'redeem' && inputSymbol ? inputSymbol : (inputSymbol && inputSymbol.replace(config.prefix, ''))}
        isSelfLogo={bridgeType && bridgeType === 'redeem' && inputSymbol ? '' : (inputSymbol && inputSymbol.replace(config.prefix, ''))}
        isSelfName={bridgeType && bridgeType === 'redeem' && inputName ? '' : inputName.replace('ANY ', '')}
        showUnlock={false}
        selectedTokens={[inputCurrency, outputCurrency]}
        selectedTokenAddress={inputCurrency}
        value={inputValueFormatted}
        hideETH={true}
        selfUseAllToken={selfUseAllToken}
        errorMessage={balanceError}
      />
      {
        (bridgeType && bridgeType === 'redeem')
        || !account
        || !registerAddress
        || inputSymbol === config.prefix + 'BTC'
        || Number(outNetETHBalance) >= 0.01
        || (Number(outNetETHBalance) >= 0.01 && Number(outNetBalance) > Number(depositMinNum))
        ? '' : (
          <>
            {
              (Number(outNetETHBalance) === 0 && outNetETHBalance !== '') || (Number(outNetBalance) === 0 && outNetBalance !== '') ? (
                <MintWarningTip>
                  {/* 💀 {t('bridgeMintTip', { account })} */}
                  <img src={WarningIcon} alt='' style={{marginRight: '8px'}}/>
                  {/* {t('mintTip0', { coin: inputSymbol.replace(config.prefix, '')})} */}
                  <span dangerouslySetInnerHTML = { 
                    {__html: t('mintTip0', { coin: inputSymbol.replace(config.prefix, '')})}
                  }></span>
                  <span className='span' >{account}</span><Copy toCopy={account} />
                </MintWarningTip>
              ) : ''
            }
          </>
        )
      }
      {
        bridgeType && bridgeType === 'redeem' && Number(FSNBalanceNum) < 0.001 && account ? (
          <MintWarningTip>
            <img src={WarningIcon} alt='' style={{marginRight: '8px'}}/>
            <span dangerouslySetInnerHTML = { 
              {__html: t('FSNnoBalance')}
            }></span>
            {/* <span className='span' >{account}</span><Copy toCopy={account} /> */}
          </MintWarningTip>
        ) : ('')
      }
      <OversizedPanel>
        <DownArrowBackground  onClick={changeMorR}>
          <img src={ResertSvg} alt={''} />
        </DownArrowBackground>
      </OversizedPanel>
      <CurrencyInputPanel
        // title={t('input')}
        title={t(bridgeType && bridgeType === 'redeem' ? 'receive' : 'receive')}
        urlAddedTokens={urlAddedTokens}
        extraText={bridgeType && bridgeType === 'redeem' && inputBalanceFormatted ? (outNetBalance ? formatBalance(outNetBalance) : '') : inputBalanceFormatted && formatBalance(inputBalanceFormatted)}
        onCurrencySelected={inputCurrency => {
          dispatchSwapState({
            type: 'SELECT_CURRENCY',
            payload: { currency: inputCurrency, field: INPUT }
          })
        }}
        isSelfSymbol={bridgeType && bridgeType === 'redeem' && inputSymbol ? inputSymbol.replace(config.prefix, '') : inputSymbol}
        isSelfLogo={bridgeType && bridgeType === 'redeem' && inputSymbol ? inputSymbol.replace(config.prefix, '') : ''}
        isSelfName={bridgeType && bridgeType === 'redeem' && inputName ? inputName.replace('ANY ', '') : ''}
        showUnlock={false}
        disableUnlock={true}
        selectedTokens={[inputCurrency, outputCurrency]}
        selectedTokenAddress={inputCurrency}
        value={realyValue ? realyValue : ''}
        hideETH={true}
        selfUseAllToken={selfUseAllToken}
      />
      {bridgeType && bridgeType === 'redeem' ? (
        <>
          <AddressInputPanel title={t('recipient') + ' ' + (inputSymbol ? inputSymbol.replace(config.prefix, '') : inputSymbol)  + ' ' + t('address')} onChange={setRecipient} onError={setRecipientError} initialInput={recipient} isValid={true} disabled={false}/>
        </>
      ) : (
        <></>
      )}
      {
        // isDeposit ? (
        isDeposit === 0 || isRedeem === 0 ? (
          <MintWarningTip>
            {/* 💀 {t('bridgeMintTip', { account })} */}
            <img src={WarningIcon} alt='' style={{marginRight: '8px'}}/>
            {/* {t('mintTip0', { coin: inputSymbol.replace(config.prefix, '')})} */}
            <span dangerouslySetInnerHTML = { 
              {__html: t('brStopTip')}
            }></span>
          </MintWarningTip>
        ) : ''
      }
      {
        registerAddress ? (
          <SubCurrencySelectBox>
            {
              bridgeType && bridgeType === 'redeem' ? (
                <>
                  <dl className='list'>
                    <dt>
                      <img src={BulbIcon} />
                      {t('Reminder')}:
                    </dt>
                    <dd><i></i>{t('redeemTip1', {
                      minFee,
                      coin: inputSymbol.replace(config.prefix, ''),
                      maxFee,
                      fee: fee * 100
                    })},</dd>
                    <dd><i></i>{t('redeemTip2')} {redeemMinNum} {inputSymbol.replace(config.prefix, '')},</dd>
                    <dd><i></i>{t('redeemTip3')} {redeemMaxNum} {inputSymbol.replace(config.prefix, '')},</dd>
                    <dd><i></i>{t('redeemTip4')},</dd>
                    <dd><i></i>{t('redeemTip5')}.</dd>
                  </dl>
                </>
              ) : (
                <>
                  <dl className='list'>
                    <dt>
                      <img src={BulbIcon} />
                      {t('Reminder')}:
                    </dt>
                    <dd><i></i>{t('mintTip1')},</dd>
                    <dd><i></i>{t('mintTip2')} {depositMinNum} {inputSymbol.replace(config.prefix, '')},</dd>
                    <dd><i></i>{t('mintTip3')} {depositMaxNum} {inputSymbol.replace(config.prefix, '')},</dd>
                    <dd><i></i>{t('mintTip4')},</dd>
                    <dd><i></i>{t('mintTip5')},</dd>
                    {
                      account ? (
                        <dd><i></i>💀 {t('bridgeMintTip', { account })}.</dd>
                      ) : ''
                    }
                    {/* 💀 {t('bridgeMintTip', { account })} */}
                  </dl>
                </>
              )
            }
          </SubCurrencySelectBox>
        ) : ''
      }
      <WarningTip></WarningTip>
      {isSwitch ? (
        <>
          <Flex>
            {
              account ? (
                <>
                  {bridgeType && bridgeType === 'redeem' ? (
                    <Button
                      disabled={ isRedeemBtn }
                      onClick={() => {
                        sendTxns()
                      }}
                      warning={Number(inputBalanceFormatted) < Number(inputValueFormatted)}
                      loggedOut={!account}
                    >
                      <StyledBirdgeIcon>
                        <img src={BirdgeIcon} alt={''} />
                        {t('redeem')}
                      </StyledBirdgeIcon>
                    </Button>
                  ) : (
                    <Button
                      disabled={isMintBtn}
                      onClick={() => {
                        // MintModelView()
                        setMintSureBtn(true)
                        setHardwareTxnsInfo(inputValueFormatted + ' ' + inputSymbol.replace(config.prefix, ''))
                        setIsHardwareTip(true)
                        setMintModelTitle(t('CrossChainDeposit'))
                        if (walletType === 'Ledger') {
                          setMintModelTip(t("confirmHardware"))
                        } else {
                          setMintModelTip(t('mmMintTip'))
                        }
                      }}
                      warning={account && (!inputValueFormatted || Number(inputValueFormatted) > depositMaxNum || Number(inputValueFormatted) < depositMinNum)}
                      loggedOut={!account}
                    >
                      <StyledBirdgeIcon>
                        <img src={BirdgeBtnIcon} alt={''} />
                        {t('CrossChainDeposit')}
                      </StyledBirdgeIcon>
                    </Button>
                  )}
                </>
              ) : (
                <Button disabled={showBetaMessage} onClick={toggleWalletModal} >
                  {t('connectToWallet')}
                </Button>
              )
            }
          </Flex>
        </>
      ) : (
        <>
          <Flex>
            <Button disabled={true}>
              {t('ComineSoon')}
            </Button>
          </Flex>
        </>
      )}
    </>
  )
}
