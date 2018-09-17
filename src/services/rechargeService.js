import {
  internalServerError
} from "../containers/errors/statusCodeMessage";

class RechargeService {

  async getOperadoras() {
    try {
      const data = [{
          value: "vivo",
          title: "Vivo",
        },
        {
          value: "claro",
          title: "Claro",
        },
        {
          value: "tim",
          title: "TIM",
        },
      ];

      return data;
    } catch (error) {
      return internalServerError();
    }
  }

  async getValoresRecarga() {
    try {
      const data = [{
          value: "15",
          title: "R$15,00",
        },
        {
          value: "20",
          title: "R$20,00",
        },
        {
          value: "30",
          title: "R$30,00",
        },
      ];

      return data;
    } catch (error) {
      return internalServerError();
    }
  }

}


export default RechargeService;