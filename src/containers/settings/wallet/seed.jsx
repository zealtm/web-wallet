import React from "react";

// UTILS
import i18n from "../../../utils/i18n";

// MATERIAL 
import Grid from "@material-ui/core/Grid";

// STYLES
import style from "./style.css";

class SeedWordsPage extends React.Component {
  render(){
    return (
      <div className={style.box}>
        <Grid container justify="center">
          <Grid item xs={11} md={8} className={style.alignCenter}>
            <span className={style.boldHead}>{i18n.t("SET_SEED_TITLE")}</span>
            
            <div className={style.boxSeed}>
              {i18n.t("SET_SEED_WORDS")}
              <textarea className={style.textArea}> </textarea>
            </div>

            <button onClick={() => alert(2)} className={style.buttonImport}>{i18n.t("SET_BUTTON_SEED_IMPORT")}</button>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default SeedWordsPage;