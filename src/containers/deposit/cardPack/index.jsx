import React from "react";
import PropTypes from "prop-types";

// UTILS
import i18n from "../../../utils/i18n";

// STYLES
import style from "./style.css";

class CardPack extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { pack } = this.props;
    return (
      <div className={style.card}>
        <img src={`/images/icons/coins/btc.png`} className={style.cardIcon} />
        <p className={style.paragraph}>
        {i18n.t("DEPOSIT_PACK_TEXT")}
        </p>
        <div className={style.valueCard}>
          <span className={style.dollarSign}>R$</span>
          <span className={style.value}>{pack}</span>
          <span className={style.decimals}>,00</span>
        </div>
      </div>
    );
  }
}

CardPack.propTypes = {
  pack: PropTypes.number
};

export default CardPack;
