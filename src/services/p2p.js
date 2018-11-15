import {
  BASE_URL,
  HEADER_REQUEST,
  API_HEADER
} from './../constants/apiBaseUrl'

import { getAuthToken } from './../utils/localStorage'

import Axios from 'axios'

import i18n from "./../utils/i18n"

class PeerToPeerClass {
  async getPaymentMethodsWhenBuying(coin) {
    let { code, data } = await axios.get(`/coin/${coin}/p2p/paymentMethods`)

    if (code !== 200)
      throw new Error(i18n.t("P2P_FAILED_GET_PAYMENT_METHOD"))

    let paymentMethods = []
    let val;
    Object.keys(data).map((key) => {
      val = data[key]
      if (val && val.constructor.name !== 'Array') return;
      val.map((obj) => {
        paymentMethods.push({
          ...obj,
          type: key,
          title: obj.name,
          img: `images/icons/coins/${obj.abbreviation.toLowerCase()}.png`,
        })
      })
    })

    if (paymentMethods.length < 1)
      throw new Error(i18n.t("P2P_NO_PAYMENT_METHODS"))

    return paymentMethods
  }

  async acceptOfferWhenBuying(data) {
    let { coin, txId, txBuyer, addressBuyer } = data

    let { code } = await axios.post(`/coin/${coin}/p2p/buy`, {
      txId, txBuyer, addressBuyer
    })

    if (code !== 200)
      throw new Error(i18n.t("P2P_FAILED_TO_BUY_COIN"))

    return true
  }
}






const axios = Axios.create({
  baseURL: BASE_URL,
  validateStatus: () => true,
  headers: {
    ...HEADER_REQUEST, ...API_HEADER,
    Authorization: getAuthToken()
  },
  // adapter is just for test purposes
  adapter: async function(config) {
    let path = config.url.replace(config.baseURL, '')
    switch (path) {
      case '/coin/lunes/p2p/buy':
        return {
          message: "Success", code: 200, type: "info",
          data: { result: true }
        }
      case '/coin/lunes/p2p/paymentMethods':
        return {
          "message": "Success",
          "code": 200,
          "type": "info",
          "data": {
              "cripto": [
                  {
                      "id": 3,
                      "name": "litecoin",
                      "abbreviation": "ltc",
                      "smallerUnit": "lite",
                      "decimalPoint": 8,
                      "numberConfirmations": 6,
                      "family": "btc",
                      "status": "active"
                  },
                  {
                      "id": 2,
                      "name": "bitcoin",
                      "abbreviation": "btc",
                      "smallerUnit": "satoshi",
                      "decimalPoint": 8,
                      "numberConfirmations": 6,
                      "family": "btc",
                      "status": "active"
                  },
                  {
                      "id": 5,
                      "name": "dash",
                      "abbreviation": "dash",
                      "smallerUnit": "duff",
                      "decimalPoint": 8,
                      "numberConfirmations": 6,
                      "family": "btc",
                      "status": "inactive"
                  },
                  {
                      "id": 4,
                      "name": "bitcoin cash",
                      "abbreviation": "bch",
                      "smallerUnit": "bch",
                      "decimalPoint": 8,
                      "numberConfirmations": 6,
                      "family": "btc",
                      "status": "active"
                  },
                  {
                      "id": 7,
                      "name": "ethereum",
                      "abbreviation": "eth",
                      "smallerUnit": "wei",
                      "decimalPoint": 18,
                      "numberConfirmations": 1,
                      "family": "eth",
                      "status": "active"
                  },
                  {
                      "id": 6,
                      "name": "Tether",
                      "abbreviation": "usdt",
                      "smallerUnit": "usdt",
                      "decimalPoint": 8,
                      "numberConfirmations": 6,
                      "family": "usdt",
                      "status": "active"
                  }
              ]
          }
      }
      default:
        return {message: 'AXIOS ADAPTER, PATH NOT FOUND'}
    }
  }
})


const PeerToPeer = new PeerToPeerClass()
export {
  PeerToPeer,
  PeerToPeerClass
}
