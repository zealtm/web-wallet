import React from "react";

// UTILS
import i18n from "../../utils/i18n";

// STYLE
import style from "./style.css";

// COMPONENTS

import Tabs from "../../components/tabs";
import Invoice from "./invoice";
import History from "./history";
import Cancel from "./cancel";
import Modal from "../../components/modal";

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
    const contents = [<Invoice key="1" />, <History key="2" />];
    return (
      <div>
        <Modal
          title={i18n.t("DEPOSIT_TITLE_CANCEL")}
          content={<Cancel />}
          show={isOpen}
          close={() => this.setState({ isOpen: false })}
        />

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
