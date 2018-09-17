import React from "react";
import { connect } from "react-redux";
import i18n from "../../../utils/i18n";
import style from "./style.css";

class DoneRecharge extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={style.modalBox}>
        <img
          src="/images/icons/confirm/confirm.png"
          className={style.imageResult}
        />
        <div>
          {i18n.t("RECHARGE_SUCCESS_1")}
          <span className={style.textGreen}>R$ 30,00</span>
        </div>

        <div className={style.smallDescription}>
          {i18n.t("RECHARGE_SUCCESS_2")}
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({});

export default connect(mapStateToProps)(DoneRecharge);
