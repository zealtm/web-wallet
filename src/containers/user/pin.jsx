import React from "react";
import i18n from "../../utils/i18n";

// STYLE
import style from "./style.css";

// COMPONENTS
import ModalBar from "../../components/modalBar";

class PIN extends React.Component {
  constructor() {
    super()
    this.state = {
      pinInput: undefined,
      modalError: false
    }
  }
  
  onInputChange = (inputValue) => {

    this.setState({
      pinInput: inputValue
    })
   return this.setState({
    modalError: false
  })
  }

  inputValidator = () => {
    let { userInput } = this.state
    if (!userInput) {
      return this.setState({
        modalError: true
      })
    }   
  }

  showModalError = () => {
    let { modalError } = this.state
    if (modalError) {
      return (
        <ModalBar
          type={"error"}
          message={"Digite o código correto"}
          timer
        />
      )}
    return;
  }


  render() {
    return (
      <div className={style.formPIN}>
      {this.showModalError()}
        <img src="../../images/logo.svg" className={style.logo} />
        <div className={style.descriptionPIN}>{i18n.t("PIN_HEADER")}</div>

        <input type="password" className={style.inputPINDefault} maxLength="1"  onChange={(insert) => this.onInputChange(insert.target.value)}/>
        <input type="password" className={style.inputPINDefault} maxLength="1"  onChange={(insert) => this.onInputChange(insert.target.value)}/>
        <input type="password" className={style.inputPINDefault} maxLength="1"  onChange={(insert) => this.onInputChange(insert.target.value)}/>
        <input type="password" className={style.inputPINDefault} maxLength="1"  onChange={(insert) => this.onInputChange(insert.target.value)}/>

        <div className={style.descriptionLink}>{i18n.t("PIN_FORGET_PIN_LINK")}</div>

        <button className={style.buttonBorderGreen} onClick={() => this.inputValidator()}>
          {i18n.t("BTN_LOGIN")}
        </button>

      </div>
    );
  }
}

export default PIN;
