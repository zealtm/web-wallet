import { validate } from 'wallet-address-validator';
import {errorPattern} from './errorPattern';

export default (address, currency, testnet) => {
  try {
    currency = currency.replace('TESTNET', '')
    return validate(address, currency, testnet ? 'testnet' : 'prod')
  } catch (error) {
    throw errorPattern(
      error.message || 'Error validating address',
      error.status || 500,
      error.messageKey || 'VALIDATE_ADDRESS_ERROR',
      error.logMessage || error.stack || ''
    )
  }
}
