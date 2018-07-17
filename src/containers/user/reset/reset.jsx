import React from "react";
import i18n from "../../../utils/i18n";

// COMPONENTS
import Footer from "../footer";
import ModalBar from "../../../components/modalBar";

// STYLE
import style from "../style.css";

class Reset extends React.Component {
  constructor() {
    super();
    this.state = {
      userInput: undefined,
      modalError: false
    };
  }

  onInputChange = inputValue => {
    this.setState({
      userInput: inputValue
    });
    return this.setState({
      modalError: false
    });
  };

  inputValidator = () => {
    let { userInput } = this.state;
    if (!userInput) {
      return this.setState({
        modalError: true
      });
    }
  };

  showModalError = () => {
    let { modalError } = this.state;
    if (modalError) {
      return (
        <ModalBar
          type={"error"}
          message={"Digite um email/usuário válido"}
          timer
        />
      );
    }
    return;
  };

  render() {
    let { modalError } = this.state;
    return (
      <div className={style.contGeneral}>
        {this.showModalError()}

        <img src="../../images/logo.svg" className={style.logo} />
        <img
          src="../../../../images/reset/ic-email.png"
          className={style.iconEmail}
        />

        <div className={style.resetHeader}>{i18n.t("RESET_HEADER")}</div>

        <input
          placeholder={i18n.t("PLACEHOLDER_EMAIL")}
          className={modalError ? style.inputError : style.inputTextDefault}
          onChange={value => this.onInputChange(value.target.value)}
        />

        <div className={style.p}>{i18n.t("RESET_INSTRUCTIONS")}</div>
        <div className={style.p2}>{i18n.t("RESET_INSTRUCTIONS2")}</div>

        <button
          className={style.buttonBorderGreen}
          onClick={() => this.inputValidator()}
        >
          {i18n.t("BTN_RESET")}
        </button>

        <Footer />
      </div>
    );
  }
}

export default Reset;
