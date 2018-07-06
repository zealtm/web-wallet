import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import i18n from "../../utils/i18n";

// COMPONENTS
import ModalBar from "../../components/modalBar";

// STYLE
import style from "./style.css";
class Login extends React.Component {

  render() {
    return (
      <div>
        <ModalBar type="success" message="Mensagem de teste" timer/>
        <p>{i18n.t("SUBMIT")} Teste</p>
        <p className={style.formLogin}>
        <button type="text" className={style.buttonPurpleLight}> TESTE </button>
        <input type="text" className={style.inputTextDefault}/>
        <input type="email" placeholder="teste@teste" className={style.inputTextDefault}/>
          Login
        </p>
      </div>
    );
  }
}

const mapStateToProps = () => ({
  
});

const mapDispatchToProps = dispatch => bindActionCreators({
    
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
