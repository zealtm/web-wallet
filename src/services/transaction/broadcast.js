import axios from "axios";
import { BASE_URL, API_HEADER } from "../../constants/apiBaseUrl";
import { internalServerError } from "../../containers/errors/statusCodeMessage";

export default async (txhex, coin, token) => {
  try {
    API_HEADER.headers.Authorization = token;
    let response = await axios.post(
      `${BASE_URL}/coin/${coin}/transaction/broadcast`,
      { txHex: txhex },
      API_HEADER
    );

    return response;
  } catch (error) {
    internalServerError();
    return;
  }
};
