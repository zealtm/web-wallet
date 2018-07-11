import React from "react";
import i18n from "../../utils/i18n";

// COMPONENTS
import Footer from "./footer";
import ModalBar from "../../components/modalBar";

// STYLE
import style from "./style.css";

class Reset extends React.Component {
  
  constructor(props){
    super(props);
    this.state={inputfield: " '  ' "};   
    this.handleClick = this.handleClick.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
   }
 
   handleClick(){
    // alert("trying to add picture url");
    alert(this.state.inputfield+" Email/Usuário inválido"); 
   }
 
   updateInputValue(evt){
     //console.log("input field updated with "+evt.target.value);
     this.state={inputfield: evt.target.value};    
   }
  render() 

  {
    return (
      <div className={style.contGeneral}>
        <img src="../../images/logo.svg" className={style.logo} />
        <img src="../../../../images/reset/ic-email.png" className={style.iconEmail} />

        <div className={style.resetHeader}>{i18n.t("RESET_HEADER")}</div>

        <input
          type="text"
          placeholder={i18n.t("PLACEHOLDER_EMAIL")}
          className={style.inputTextDefault}
          onChange={this.updateInputValue}
        />

        <div className={style.p}>{i18n.t("RESET_INSTRUCTIONS")}</div>
        <div className={style.p2}>{i18n.t("RESET_INSTRUCTIONS2")}</div>

        <button className={style.buttonBorderGreen} onClick={this.handleClick}>
          {i18n.t("BTN_RESET")}                   
        </button>

        <ModalBar type={"error"} message={"Digite um email/usuário válido"} timer={1}/>
        <Footer />
      </div>
    );
  }
}

export default Reset;
