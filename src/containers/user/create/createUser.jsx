import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getCreateUserInfo } from "../redux/userAction";
import { clearMessage, errorInput } from "../../errors/redux/errorAction";

// UTILS
import { inputValidator } from "../../../utils/inputValidator";
import i18n from "../../../utils/i18n";

// STYLE
import style from "../style.css";

class CreateUser extends React.Component {
  constructor() {
    super();
    this.state = {
      inputs: {
        lastName: undefined,
        firstName: undefined,
        email: undefined,
      },
      step: 0,
      errors: undefined
    };
  }

  getInput = input => {
    let { inputs } = this.state;
    let { name, value } = input;

    this.setState({
      ...this.state,
      inputs: { ...inputs, [name]: value ? input : undefined },
      errors: undefined
    });
  };

  inputValidator = () => {
    let { getCreateUserInfo, clearMessage, errorInput } = this.props;
    let { inputs } = this.state;
    let { firstName, lastName, email } = this.state.inputs;
    let { messageError, errors } = inputValidator(inputs);

    if (errors.length > 0) {
      errorInput(messageError);
      this.setState({
        ...this.state,
        errors
      });
    } else {
      clearMessage();
      getCreateUserInfo(firstName.value, lastName.value, email.value);
    }
  };

  render() {
    let { inputs, errors } = this.state; 
    let { name, surname, email } = this.props.user.user;

    return (
      <div className={style.contNewAccount}>
        <Link to="/login">
          <img
            src="../../images/icons/arrow/arrow-white-left@2x.png"
            className={style.iconArrowBack}
          />
        </Link>

        <img src="../../images/logo.svg" className={style.logo} />
        <div>
          <div className={style.newAccountHeader}>
            {i18n.t("NEW_ACCOUNT_HEADER")}
          </div>

          <input
            type="text"
            name="firstName"
            required
            placeholder={i18n.t("PLACEHOLDER_FIRST_NAME")}
            value={name}
            onChange={event => {
              this.getInput(event.target);
            }}
            className={
              errors && errors.includes("firstName")
                ? style.inputTextError
                : style.inputTextDefault
            }
          />

          <input
            type="text"
            name="lastName"
            value={surname}
            required
            placeholder={i18n.t("PLACEHOLDER_LAST_NAME")}
            onChange={event => {
              this.getInput(event.target);
            }}
            className={
              errors && errors.includes("lastName")
                ? style.inputTextError
                : style.inputTextDefault
            }
          />
          <input
            type="email"
            name="email"
            value={email}
            required
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

          <button
            className={
              !errors && inputs.lastName && inputs.firstName && inputs.email
                ? style.buttonEnable
                : style.buttonBorderGreen
            }
            onClick={() => {
              this.inputValidator();
            }}
          >
            {i18n.t("BTN_NEXT")}
          </button>
        </div>
      </div>
    );
  }
}

CreateUser.propTypes = {
  getCreateUserInfo: PropTypes.func,
  clearMessage: PropTypes.func,
  errorInput: PropTypes.func,
  user: PropTypes.object,
};

const mapSateToProps = store => ({
  user: store.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCreateUserInfo,
      clearMessage,
      errorInput
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(CreateUser);
