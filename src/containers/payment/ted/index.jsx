import React from "react";
import Tabs from "../../../components/tabs";
import i18n from "../../../utils/i18n";
import TED from "./tedItems/ted";

const titles = [
  i18n.t("PAYMENT_TED_TITLE_1"),
  i18n.t("PAYMENT_TED_TITLE_2"),
  i18n.t("PAYMENT_TED_TITLE_3")
];

const contents = [
];

class Recharge extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Tabs tabTitles={titles} tabContents={contents} justify="center" />
        <TED/>
      </div>
    );
  }
}

export default Recharge;


