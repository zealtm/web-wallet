import React from "react";
import PropTypes from "prop-types";

// MATERIAL UI
import { Grid, Input } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

// UTILS
import i18n from "../../../../utils/i18n";

// STYLE
import style from "./style.css";

//MATERIAL

class ConfirmModal extends React.Component {
  render() {
    return (
      <Grid container>
        <Grid item xs={12}>
          <div className={style.profile}>
            <Avatar
              src={"images/lunio/lunio-user@100x100.jpg"}
              className={style.avatar}
            />
            <div className ={style.userName}>
              <span className={style.name}>Felipe Mendes</span>
            </div>
            <div className={style.hr} />
          </div>
        </Grid>

        <Grid item xs={12}>
          <div className={style.avaliation}>
            <span className={style.spanTitle}>Classifique o vendedor</span>
            <div>
              <span>**ESTRELAS**</span>
            </div>
            <div>
              <Input className={style.comment} />
            </div>
          </div>
        </Grid>

        <Grid item xs={12}>
          <div className={style.btnConfirm}>
            <button className={style.buttonCard}>Confirmar</button>
          </div>
        </Grid>
      </Grid>
    );
  }
}

ConfirmModal.propTypes = {};

export default ConfirmModal;

//Criar um container para centralizar os itens
