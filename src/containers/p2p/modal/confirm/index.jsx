import React from "react";
import PropTypes from "prop-types";


// MATERIAL UI
import Grid from "@material-ui/core/Grid";

// UTILS
import i18n from "../../../../utils/i18n";

// STYLE
import style from "./style.css";

//MATERIAL

class ConfirmModal extends React.Component {
  render(){
    return (
      <div className={style.boxModal}>
        <Grid container spacing={24} classeName={style.confirmContainer}>
          
          
          <Grid item xs={12}>
            <div className={style.btnModal}>
              <button className={style.buttonCard}>{i18n.t("P2P_BTN_CONFIRM")}</button>
            </div>
          </Grid>

          
        </Grid>
      </div>
    )
  }
}

ConfirmModal.propTypes = {
  
}

export default ConfirmModal;

//Criar um container para centralizar os itens