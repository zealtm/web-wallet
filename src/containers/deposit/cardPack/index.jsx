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
    const { pack, onSelect, active } = this.props;
    const styleCard = active ? style.cardActive : style.card;
    return (
      <div
        className={styleCard}
         onClick={() => onSelect(pack.id, pack.value)}
      >
        <img
          src={`/images/icons/coins/btc.png`}
          alt={"bitcoin"}
          className={style.cardIcon}
        />
        <p className={style.paragraph}>{i18n.t("DEPOSIT_PACK_TEXT")}</p>
        <div className={style.valueCard}>
          <span className={style.dollarSign}>R$</span>
          <span className={style.value}>{pack.value}</span>
          <span className={style.decimals}>,00</span>
        </div>
      </div>
    );
  }
}

CardPack.propTypes = {
  pack: PropTypes.object,
  onSelect: PropTypes.func.isRequired,
  active: PropTypes.bool
};

export default CardPack;
