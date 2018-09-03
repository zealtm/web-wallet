import React from "react";
import PropTypes from "prop-types";

// UTILS
import i18n from "../../../utils/i18n";

// STYLES
import style from "./style.css";

// COMPONENTS
import CustomSwitch from "./component/customSwitch";

class DetailsPayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { handleStep } = this.props;
    return (
      <div className={style.modalBox}>
        Atenção: Confira abaixo os dados do seu pedido, para que não haja erros.
        Se a informação estiver incorreta, clique em voltar.
        <div className={style.strongText}>
          <span className={style.textGreen}>1290 LUNES</span> e será pago um
          título de <span className={style.textGreen}>R$ 30,00</span>, conforme
          informações abaixo.
        </div>
        <div className={style.inlineInfo}>
          <div>
            <label className={style.inlineInfoLabel}>Banco/Instituição</label>
            BANCO DO BRASIL
          </div>
          <div>
            <label className={style.inlineInfoLabel}>Nome</label>
            NOME DO USUARIO COMPLETO
          </div>
          <div>
            <label className={style.inlineInfoLabel}>Vencimento</label>
            10/10/2018
          </div>
          <div>
            <label className={style.inlineInfoLabel}>CPF</label>
            12345678978
          </div>
          <div>
            <label className={style.inlineInfoLabel}>VALOR</label>
            R$30,00
          </div>
        </div>
        <CustomSwitch
          title={"Termo GDPR"}
          description={"Lorem ipsum asd asdsd sdsdsjks"}
          action={() => alert("teste")}
          checked={this.state["check1"]}
        />
        <button className={style.btContinue} onClick={() => handleStep("next")}>
          Confirmar dados
        </button>
      </div>
    );
  }
}

export default DetailsPayment;
