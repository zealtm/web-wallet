import React from "react";
import PropTypes from "prop-types";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";

// UTILS
import i18n from "../../../../utils/i18n";

// STYLE
import style from "./../style.css";

class History extends React.Component {
  render() {
    return (
      <Grid container direction="row" justify="center">
        <Grid item xs={12} className={style.box} style={{ padding: 5 }}>
          <p>{i18n.t("DEPOSIT_TAB_HISTORY_TITLE")}</p>
        </Grid>
      </Grid>
    );
  }
}

History.propTypes = {};

export default History;
