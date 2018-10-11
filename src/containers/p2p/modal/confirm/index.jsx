import React from "react";
import PropTypes from "prop-types";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";

// UTILS
import i18n from "../../../../utils/i18n";

// STYLE
import style from "./style.css";

//MATERIAL

class ConfirmModal extends React.Component {
  render() {
    return (
      <div className={style.boxModal}>
        <Grid container>
          <Grid item xs={12}>
            <div className={style.profile}>
              <Avatar
                src={"images/lunio/lunio-user@100x100.jpg"}
                className={style.avatar}
              />
              <span>Felipe Mendes</span>
              <div className={style.hr} />
            </div>
          </Grid>

          <Grid item xs={12}>
            <div>
              <span>Classifique o vendedor</span>
              <span>**ESTRELAS**</span>
              <textarea name="" id="" cols="30" rows="10" />
            </div>
          </Grid>

          <Grid item xs={12}>
            <div>
              <button className={style.buttonCard}>Confirmar</button>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

ConfirmModal.propTypes = {};

export default ConfirmModal;

//Criar um container para centralizar os itens
