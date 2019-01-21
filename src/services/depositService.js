// CONSTANTS
import { API_HEADER } from "../constants/apiBaseUrl";

// ERROS
import { internalServerError } from "../containers/errors/statusCodeMessage";

class DepositService {
  async getPackages(token) {
    try {
      API_HEADER.headers.Authorization = token;

      const packages = [15, 30, 45, 60, 100, 250, 500, 1000];

      return packages;
    } catch (error) {
      return internalServerError();
    }
  }

  async getDepositHistory(token) {
    try {
      let history = {};

      if (!token)
        return (history = {
          status: 500,
          data: []
        });

      API_HEADER.headers.Authorization = token;
      history = {
        status: 200,
        data: [
          {
            nameHistory: "Deposito",
            type: "default",
            info: {
              date: "23/11/2018 17:30",
              status: "Cancel",
              value: "RS 1.000,00"
            },
            user: { cpf: "417.487.228-33", id: "5832158" },
            subItem: [
              { date: "", value: "", status: "" },
              { date: "", value: "", status: "" }
            ]
          },
          {
            nameHistory: "Deposito",
            type: "Recorrent",
            info: {
              date: "15/12/2018 16:30",
              status: "Confirm",
              value: "RS 8.000,00"
            },
            user: { cpf: "471.487.228-33", id: "1232158" },
            subItem: [
              { date: "05/11/2018", value: "RS 3.000,00", status: "Cancel" },
              { date: "07/10/2018", value: "RS 200,00", status: "Confim" }
            ]
          },
          {
            nameHistory: "Deposito",
            type: "Recorrent",
            info: {
              date: "20/11/2018 12:30",
              status: "Pendent",
              value: "RS 5.000,00"
            },
            user: { cpf: "361.487.228-33", id: "1232158" },
            subItem: [
              { date: "12/09/2018", value: "RS 300,00", status: "Pendent" },
              { date: "01/09/2018", value: "RS 100,00", status: "Confim" },
              { date: "14/08/2018", value: "RS 800,00", status: "Cancel" }
            ]
          },
          {
            nameHistory: "Deposito",
            type: "default",
            info: {
              date: "11/11/2018 18:30",
              status: "Confirm",
              value: "RS 700,00"
            },
            user: { cpf: "179.487.228-33", id: "54432158" },
            subItem: [
              { date: "", value: "", status: "" },
              { date: "", value: "", status: "" }
            ]
          }
        ]
      };

      return history;
    } catch (error) {
      return internalServerError();
    }
  }
}

export default DepositService;
