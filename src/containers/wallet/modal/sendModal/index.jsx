import React from "react";

// COMPONENTS
import ButtonContinue from "./buttonContinue";
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

  handleStep = () => {
    this.setState({ step: this.state.step + 1 });
  };

  render() {
    switch (this.state.step) {
      case 0:
        return (
          <div className={style.baseStep}>
            <BoxAddress />
            <ButtonContinue action={this.handleStep} />
          </div>
        );
      case 1:
        return (
          <div className={style.baseStep}>
            <BoxAmount />

            <ButtonContinue action={this.handleStep} />
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

            <ButtonContinue action={this.handleStep} />
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

            <ButtonContinue action={this.handleStep} label="ENVIAR" />
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

            <ButtonContinue action={this.handleStep} />
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

            <ButtonContinue action={this.handleStep} label="FECHAR" />
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
