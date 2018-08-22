import axios from "axios";
import { BASE_URL, API_HEADER } from "../../constants/apiBaseUrl";
import { internalServerError } from "../../containers/errors/statusCodeMessage";

export default async (data, coin, token) => {
  try {
    API_HEADER.headers.Authorization = token;
    let response = await axios.post(
      `${BASE_URL}/coin/${coin}/transaction/fee`,
      data,
      API_HEADER
    );
    //console.log("FEE", response);
    return response.data.data;
  } catch (error) {
    internalServerError();
    return;
  }
};
