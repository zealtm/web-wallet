import React from "react";

// UTILS
import i18n from "../../utils/i18n";

// STYLE
import style from "./style.css";

// COMPONENTS
import Tabs from "../../components/tabs";
import Invoice from "./invoice";
import History from "./history";
import Informations from "./modal/informations";
import Modal from "../../components/modal";


// MATERIAL UI
import { Grid } from "@material-ui/core";

class Deposit extends React.Component {
  constructor() {
    super();

    this.state = {
      isOpen: true
    };
  }
  render() {
    const { isOpen } = this.state;
    const titles = [
      i18n.t("DEPOSIT_TAB_TITLE"),
      i18n.t("DEPOSIT_TAB_HISTORY_TITLE")
    ];
    const contents = [<Invoice key={0} />, <History key={1} />];
    return (
      <Grid container justify="center">
        <Modal
          back={1}
          title={i18n.t("DEPOSIT_INF_MODAL_HEADER")}
          content={<Informations />}
          show={isOpen}
          close={() => this.setState({ isOpen: false })}
        />
        <Grid item xs={12} className={style.header}>
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
