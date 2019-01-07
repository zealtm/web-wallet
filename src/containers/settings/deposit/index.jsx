import React from "react";
import PropTypes from "prop-types";

// UTILS
import i18n from "../../../utils/i18n";

// STYLE
import style from "./style.css";

// COMPONENTS

import Tabs from "../../../components/tabs";
import Invoice from "./invoice";
import History from "./history";

class Deposit extends React.Component {
  render() {
    const titles = [
      i18n.t("DEPOSIT_TAB_TITLE"),
      i18n.t("DEPOSIT_TAB_HISTORY_TITLE")
    ];
    const contents = [<Invoice key="1" />, <History key="2" />];
    return (
      <div>
        <div className={style.header}>
          <h1>{i18n.t("DEPOSIT_HEADER_TITLE")}</h1>
          <p>{i18n.t("DEPOSIT_HEADER_SUBTITLE")}</p>
        </div>
        <Tabs tabTitles={titles} tabContents={contents} justify="center" />
      </div>
    );
  }
}

Deposit.propTypes = {};

export default Deposit;
