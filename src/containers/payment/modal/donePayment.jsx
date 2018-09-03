import React from "react";
import PropTypes from "prop-types";

// UTILS
import i18n from "../../../utils/i18n";

// STYLES
import style from "./style.css";

class DonePayment extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { handleStep } = this.props;
    return (
      <div className={style.modalBox}>
        <img src="/images/icons/confirm/confirm.png" className={style.imageResult} />
        {/* <img src="/images/icons/error/error.png" /> */}
        <div>Você acabou de debitar um boleto no valor de <span className={style.textGreen}>R$30,00</span>
        em sua carteira Lunes</div>

        <div className={style.smallDescription}>
          Você pode visualizar a transação em sua seção "Históricos"
        </div>
        
      </div>
    );
  }
}

export default DonePayment;
