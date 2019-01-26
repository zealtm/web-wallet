import React, { Component } from "react";
import style from "./style.css";
import i18n from "../../../../utils/i18n";
import { Grid } from "@material-ui/core";

class PayModal extends Component {
  render() {
    return (
      <Grid container className={style.container}>
        <Grid item xs={12} sm={12} style={{ textAlign: "center" }}>
          <img
            src="images/icons/deposit/confirm-ticket.png"
            alt={i18n.t("BANK_ICON")}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <p
            style={{
              textAlign: "center",
              color: "#ffff",
              margin: "0 25% 0 25% 0"
            }}
          >
            Boleto gerado e enviado para o e-mail cadastrado. Após o pagamento,
            o dinheiro estará disponível para uso na plataforma em até 2 dias
            úteis
          </p>
        </Grid>
        <Grid item xs={12} sm={12}>
          <span className={style.ConfirmDataField}>
            {i18n.t("DEPOSIT_CONFIRMDATA_NAME")}
          </span>
        </Grid>
      </Grid>
    );
  }
}

export default PayModal;
