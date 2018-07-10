import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { authenticate } from "./redux/UserAction";
// STYLE
import style from "./style.css";
class Login extends React.Component {

  constructor() {
    super()

    this.state = {
      email: "",
      password: ""
    }
  }

  render() {
    const props = this.props;
    const state = this.state;

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
              props.authenticate(
                state.email,
                state.password
              )
            }
            }> LOGAR </button>
        </p>
      </div >
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  authenticate
}, dispatch);

export default connect(null, mapDispatchToProps)(Login);