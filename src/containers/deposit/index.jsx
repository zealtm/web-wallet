import React from "react";

// UTILS
import i18n from "../../utils/i18n";

// STYLE
import style from "./style.css";

// COMPONENTS
import Tabs from "../../components/tabs";
import Modal from "../../components/modal";
import Invoice from "./invoice";
import History from "./history";
import BankModal from "./modal/bankModal";

class Deposit extends React.Component {
  render() {
    const titles = [
      i18n.t("DEPOSIT_TAB_TITLE"),
      i18n.t("DEPOSIT_TAB_HISTORY_TITLE")
    ];
    const contents = [<Invoice key={0} />, <History key={1} />];
    return (
      <div>
        <div className={style.box}>
          <div className={style.header}>
            <h1>{i18n.t("DEPOSIT_HEADER_TITLE")}</h1>
            <p>{i18n.t("DEPOSIT_HEADER_SUBTITLE")}</p>
          </div>
          <Tabs tabTitles={titles} tabContents={contents} justify="center" />
          <Modal show={true} content={<BankModal />} />
        </div>
      </div>
    );
  }
}

Deposit.propTypes = {};

export default Deposit;
