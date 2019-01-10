import React from "react";

// UTILS
import i18n from "../../utils/i18n";

// STYLE
import style from "./style.css";

// COMPONENTS
import Tabs from "../../components/tabs";
import Invoice from "./invoice";
import History from "./history";

// MATERIAL UI
import { Grid } from "@material-ui/core";

class Deposit extends React.Component {
  render() {
    const titles = [
      i18n.t("DEPOSIT_TAB_TITLE"),
      i18n.t("DEPOSIT_TAB_HISTORY_TITLE")
    ];
    const contents = [<Invoice key={0} />, <History key={1} />];
    return (
      <Grid container justify="center">
        <Grid item xs={12} sm={7} className={style.header}>
          <center>
            <h1>{i18n.t("DEPOSIT_HEADER_TITLE")}</h1>
            <p>{i18n.t("DEPOSIT_HEADER_SUBTITLE")}</p>
          </center>
        </Grid>
        <Tabs tabTitles={titles} tabContents={contents} justify="center" />
      </Grid>
    );
  }
}

Deposit.propTypes = {};

export default Deposit;
