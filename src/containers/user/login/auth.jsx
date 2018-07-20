import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { authenticate, pageControl } from "../redux/userAction";
import { clearMessage, errorInput } from "../../errors/redux/errorAction";

// COMPONENTS
import Footer from "../footer";

// UTILS
import { inputValidator } from "../../../utils/inputValidator";
import i18n from "../../../utils/i18n";

// STYLE
import style from "../style.css";

class Auth extends React.Component {
  constructor() {
    super();
    this.state = {
      inputs: {
        email: undefined,
        password: undefined
      },
      errors: undefined
    };
  }

  getInput = input => {
    let { name, value } = input;
    let { inputs } = this.state;

    this.setState({
      ...this.state,
      inputs: { ...inputs, [name]: { type: name, value } },
      errors: undefined
    });
  };

  nextContent = () => {
    let { authenticate, clearMessage } = this.props;
    let { email, password } = this.state.inputs;
    console.warn('1')

    return authenticate(email.value, password.value)
    


  };

  inputValidator = () => {
    let { user, error, pageControl, errorInput } = this.props;
    let { inputs } = this.state;
    let { messageError, errors } = inputValidator(inputs);
    
    if (errors.length > 0) {
      errorInput(messageError);
      this.setState({
        ...this.state,
        errors
      });
    } else {
      this.nextContent();
      
      console.warn('2')
      if (!error.message.active) {
        console.warn('3', error)
        pageControl(user.page.step + 1);
        // clearMessage();
      }
  
  
      console.warn(error)
    }
  };

  render() {
    let { errors } = this.state;

    return (
      <div className={style.contGeneral}>
        <img src="../../images/logo.svg" className={style.logo} />
        <div className={style.description}>{i18n.t("LOGIN_HEADER")}</div>

        <input
          type="email"
          name="email"
          placeholder={i18n.t("PLACEHOLDER_EMAIL")}
          onChange={event => {
            this.getInput(event.target);
          }}
          className={
            errors && errors.includes("email")
              ? style.inputTextError
              : style.inputTextDefault
          }
        />
        <input
          type="password"
          name="password"
          placeholder={i18n.t("PLACEHOLDER_PASSWORD")}
          onChange={event => {
            this.getInput(event.target);
          }}
          className={
            errors && errors.includes("password")
              ? style.inputTextError
              : style.inputTextDefault
          }
        />

        <Link className={style.textForgetPass} to="/reset">
          {i18n.t("LOGIN_FORGET_PASSWORD_LINK")}
        </Link>

        <button
          className={style.buttonBorderGreen}
          onClick={() => {
            this.inputValidator();
          }}
        >
          {i18n.t("BTN_LOGIN")}
        </button>

        <div className={style.doNotHaveAccount}>
          {i18n.t("LOGIN_CREATE_ACCOUNT_LABEL")}{" "}
          <Link className={style.doNotLink} to="/create">
            {i18n.t("LOGIN_SINGUP_ACCOUNT_LINK")}
          </Link>
        </div>

        <Footer />
      </div>
    );
  }
}

Auth.propTypes = {
  authenticate: PropTypes.func,
  pageControl: PropTypes.func,
  clearMessage: PropTypes.func,
  errorInput: PropTypes.func,
  user: PropTypes.object,
  error: PropTypes.object
};

const mapSateToProps = store => ({
  user: store.user,
  error: store.error
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      authenticate,
      pageControl,
      clearMessage,
      errorInput
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(Auth);
