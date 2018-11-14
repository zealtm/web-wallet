import {
  BASE_URL,
  HEADER_REQUEST,
  API_HEADER
} from './../constants/apiBaseUrl'

import { getAuthToken } from './../utils/localStorage'

import Axios from 'axios'



class PeerToPeerClass {
  async getPaymentMethodsWhenBuying(coin) {
    let { code, data } = await axios.get(`/coin/${coin}/p2p/paymentMethods`)

    if (code !== 200)
      throw new Error("Failed to get payment method to ${coin}")

    //put this logic inside saga
    let paymentMethods = []
    Object.keys(data).map((key) => {
      let val = data[key]
      if (val && val.constructor.name !== 'Array') return;
      val.map((obj) => {
        paymentMethods.push({
          title: obj.name,
          img: `images/icons/coins/${obj.abbreviation.toLowerCase()}.png`,
          status: obj.status
        })
      })
    })
    return paymentMethods
  }
}






const axios = Axios.create({
  baseURL: BASE_URL,
  validateStatus: () => true,
  headers: {
    ...HEADER_REQUEST, ...API_HEADER,
    Authorization: getAuthToken()
  },
  //just for test purposes
  adapter: async function(config) {
    let path = config.url.replace(config.baseURL, '')
    switch (path) {
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
