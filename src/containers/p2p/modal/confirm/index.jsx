import React from "react";
import PropTypes from "prop-types";


// MATERIAL UI
import Grid from "@material-ui/core/Grid";

// UTILS
import i18n from "../../../../utils/i18n";

// STYLE
import style from "./style.css";

class ConfirmModal extends React.Component {
  render(){
    return (
      <div className={style.boxModal}>
        <Grid container spacing={24} classeName={style.confirmContainer}>
          <Grid item xs={12} className={style.cardIcon}>
            <div>
             <img src="/images/icons/general/group@1x.png" />
            </div>
          </Grid>

          <Grid item xs={12} className={style.textModal}>
            <div>
              <p>
              {i18n.t("P2P_MODAL_DEPOSIT_CONFIRM")}

              </p>
              
            </div>
          </Grid>
          
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