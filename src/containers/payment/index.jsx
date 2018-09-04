import React from "react";
import Tabs from "../../components/tabs";
import i18n from "../../utils/i18n";

import style from "./style.css";

import BankSlip from "./bankSlip";
import History from "./history";

class Payment extends React.Component {
  constructor() {
    super();
  }

  render() {
    const titles = [i18n.t("PAYMENT_BANK_SLIP"), i18n.t("PAYMENT_HISTORY")];
    const contents = [<BankSlip />, <History />]

    return (
      <div>
        <div className={style.header}>
          <h1>{i18n.t("PAYMENT_HEADER_TITLE")}</h1>
          <p className={style.center}>{i18n.t("PAYMENT_HEADER_SUBTITLE")}</p>
        </div>
        <Tabs tabTitles={titles} tabContents={contents} justify="center" />
      </div>
    );
  }
}

export default Payment;
