import React from "react";

// COMPONENTS
import BoxAddress from "./boxAddress";
import BoxAmount from "./boxAmount";
import BoxFee from "./boxFee";
import BoxConfirm from "./boxConfirm";
import BoxProcess from "./boxProcess";
import BoxResult from "./boxResult";

// STYLE
import style from "./style.css";

class SendModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0
    };
  }

  render() {
    switch (this.state.step) {
      case 0:
        return (
          <div className={style.baseStep}>
            <BoxAddress />

            <button
              className={style.btContinueDisable}
              onClick={() => {
                this.setState({ step: this.state.step + 1 });
              }}
            >
              CONTINUAR
            </button>
          </div>
        );
      case 1:
        return (
          <div className={style.baseStep}>
            <BoxAmount />

            <button
              className={style.btContinue}
              onClick={() => {
                this.setState({ step: this.state.step + 1 });
              }}
            >
              CONTINUAR
            </button>
            <button
              onClick={() => {
                this.setState({ step: this.state.step - 1 });
              }}
            >
              voltar temporario
            </button>
          </div>
        );
      case 2:
        return (
          <div className={style.baseStep}>
            <BoxFee />

            <button
              className={style.btContinue}
              onClick={() => {
                this.setState({ step: this.state.step + 1 });
              }}
            >
              CONTINUAR
            </button>
            <button
              onClick={() => {
                this.setState({ step: this.state.step - 1 });
              }}
            >
              voltar temporario
            </button>
          </div>
        );
      case 3:
        return (
          <div className={style.baseStep}>
            <BoxConfirm />

            <button
              className={style.btContinue}
              onClick={() => {
                this.setState({ step: this.state.step + 1 });
              }}
            >
              ENVIAR
            </button>
            <button
              onClick={() => {
                this.setState({ step: this.state.step - 1 });
              }}
            >
              voltar temporario
            </button>
          </div>
        );
      case 4:
        return (
          <div className={style.baseStep}>
            <BoxProcess />

            <button
              className={style.btContinue}
              onClick={() => {
                this.setState({ step: this.state.step + 1 });
              }}
            >
              CONTINUAR
            </button>
            <button
              onClick={() => {
                this.setState({ step: this.state.step - 1 });
              }}
            >
              voltar temporario
            </button>
          </div>
        );
      case 5:
        return (
          <div className={style.baseStep}>
            <BoxResult />

            <button className={style.btContinue} >
              FECHAR
            </button>
            <button
              onClick={() => {
                this.setState({ step: this.state.step - 1 });
              }}
            >
              voltar temporario
            </button>
          </div>
        );
      default:
        return <div>ERRO</div>;
    }
  }
}

export default SendModal;
