import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { authenticate } from "./UserAction";
import PropTypes from "prop-types";

// STYLE
import style from "./style.css";
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <p className={style.formLogin}>
          <input
            type="email"
            placeholder="teste@teste"
            className={style.inputTextDefault}
            onChange={(event) => this.setState({ email: event.target.value })} />
          <br /><br />
          <input
            type="password"
            placeholder="password"
            className={style.inputTextDefault}
            onChange={(event) => this.setState({ password: event.target.value })} />
          <br /><br />
          <button
            className={style.buttonPurpleLight}
            onClick={() => {
              classes.authenticate(
                this.state.email,
                this.state.password
              )
            }}> LOGAR </button>
        </p>
      </div >
    );
  }
}

Login.prototype = {
  classes: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => bindActionCreators({
  authenticate
}, dispatch);

export default connect(mapDispatchToProps)(Login);