import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import i18n from "../../utils/i18n";

// STYLE
import style from "./style.css";
class Login extends React.Component {

  render() {
    return (
      <div>
        <p>{i18n.t("SUBMIT")}</p>
        <p className={style.formLogin}>
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
