import React from "react";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";

// UTILS
import i18n from "../../../utils/i18n";

// STYLE
import style from "./../style.css";

const objHistory = {
  nameHistory: "Deposito",
  info: {
    data: "23/11/2018 17:30",
    status: "Confirm",
    value: "RS 1.000,00"
  },
  user: { cpf: "417.487.228-33", id: "1232158" },
  subItem: { data: "22/10/2018", value: "RS 1.000,00", status: "Cancel" }
};
class History extends React.Component {
  renderHistory() {    
    return (
      <div>
        <Grid
          onClick={() => console.log("baixo")}
          container
          direction="row"
          justify="center"
        >
          <Grid item xs={1} />

          <Grid item xs={5} className={style.boxItem_1}>
            <p className={style.textGreen}>Deposito - Recorrente</p>
            <p className={style.textBold}>23/01/2018 17:30</p>
            <p>352.654.123-07</p>
          </Grid>

          <Grid item xs={4} className={style.boxItem_2}>
            <p className={style.textGreen}>Confirmado</p>
            <p className={style.textBold}>RS 1.000,00</p>
            <p>ID 1232158</p>
          </Grid>

          <Grid item xs={1}>
            <center>x</center>
          </Grid>
        </Grid>

        <Grid container justify="center" style={{ backgroundColor: "#42227d" }}>
          <Grid item xs={9} className={style.boxSubItem}>
            <Grid item xs={4}>
              <p>25/jun</p>
            </Grid>
            <Grid item xs={4} style={{ textAlign: "center" }}>
              <p>R$ 1.000,00</p>
            </Grid>
            <Grid item xs={4} style={{ textAlign: "end" }}>
              <p>Cancelado</p>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }

  render() {
    

    return (
      <Grid container direction="row" justify="center">
        <Grid item xs={7} className={style.boxHistory}>
          {this.renderHistory()}
        </Grid>
      </Grid>
    );
  }
}

History.propTypes = {};

export default History;
