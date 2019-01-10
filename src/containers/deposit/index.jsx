import React from "react";

import Modal from "../../components/modal";

import BankModal from "./bankModal";
// UTILS
import i18n from "../../utils/i18n";

// STYLE
import style from "./style.css";

// COMPONENTS

import Tabs from "../../components/tabs";
import Invoice from "./invoice";
import History from "./history";

class Deposit extends React.Component {
  constructor() {
    super();

    this.state = {
      isOpen: false
    };
  }

  handleModalState = () => {
    const { isOpen } = this.state;

    this.setState({ isOpen: !isOpen });
  };

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
          title={i18n.t("DEPOSIT_ACCOUNT_MODAL_TITLE")}
          show={isOpen}
          content={<BankModal />}
          close={() => this.handleModalState()}
        />

        <div className={style.header}>
          <h1>{i18n.t("DEPOSIT_HEADER_TITLE")}</h1>
          <p>{i18n.t("DEPOSIT_HEADER_SUBTITLE")}</p>
        </div>
        <Tabs tabTitles={titles} tabContents={contents} justify="center" />
        <button onClick={() => this.handleModalState()}>Teste Modal</button>
      </div>
    );
  }
}

Deposit.propTypes = {};

export default Deposit;
