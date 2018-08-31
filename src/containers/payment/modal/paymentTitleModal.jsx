import React from "react";
import PropTypes from "prop-types";

// UTILS
import i18n from "../../../utils/i18n";

// STYLES
import style from "./style.css";

class PaymentTitleModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className={style.baseStep}>
     
      Atenção: Confira abaixo os dados do seu pedido, para que não haja erros.
      Se a informação estiver incorreta, clique em voltar.

      <div className={style.strongText}>
        <span className={style.greenText}>1290 LUNES</span>
        e será pago um título de 
        <span className={style.greenText}>R$ 30,00</span>, 
        conforme informações abaixo.
      </div>

      <div className={style.inlineInfo}>
        <div>
          <label>Banco/Instituição</label>
          BANCO DO BRASIL 
        </div>
        <div>
          <label>Nome</label>
          NOME DO USUARIO COMPLETO
        </div>
        <div>
          <label>Vencimento</label>
          10/10/2018
        </div>
        <div>
          <label>CPF</label>
          R$ 30,00
        </div>
      </div>

      COMPONENT SELECT 


      <button
        className={style.btContinue}
        onClick={() => alert('teste')}>
        Confirmar dados
      </button>

    </div>;
  }
}

export default PaymentTitleModal;