import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { authenticate } from "../redux/userAction";
import { clearMessage, errorInput } from "../../errors/redux/errorAction";

// UTILS
import { inputValidator } from "../../../utils/inputValidator";
import i18n from "../../../utils/i18n";

// STYLE
import style from "../style.css";

class Login extends React.Component {
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

    inputValidator = () => {
        let { clearMessage, errorInput, authenticate } = this.props;
        let { inputs } = this.state;
        let { email, password } = inputs;
        let { messageError, errors } = inputValidator(inputs);
        if (errors.length > 0) {
            errorInput(messageError);
            this.setState({
                ...this.state,
                errors
            });
        } else {
            clearMessage();
            authenticate(email.value, password.value);
        }
    };

    render() {
        let { errors } = this.state;

        return (
            <div className={style.contGeneral}>
                <img src="../../images/logo.svg" className={style.logo} />
                <div className={style.description}>{i18n.t("2FA_HEADER")}</div>

                <div className={style.instructions}>
                    <strong>{i18n.t("2FA_INSTRUCTIONS_TITLE")}</strong>
                    <br />{i18n.t("2FA_INSTRUCTIONS_1")}
                </div>

                <div className={style.alignInputTwoFactorAuthenticator}>
                    <input
                        name="field1"
                        maxLength="1"
                        onChange={event => {
                            this.getInput(event.target);
                        }}
                        className={
                            errors && errors.includes("field1")
                                ? style.inputError
                                : style.inputTwoFactorAuthenticator
                        }
                    />

                    <input
                        name="field2"
                        maxLength="1"
                        onChange={event => {
                            this.getInput(event.target);
                        }}
                        className={
                            errors && errors.includes("field2")
                                ? style.inputError
                                : style.inputTwoFactorAuthenticator
                        }
                    />

                    <input
                        name="field3"
                        maxLength="1"
                        onChange={event => {
                            this.getInput(event.target);
                        }}
                        className={
                            errors && errors.includes("field3")
                                ? style.inputError
                                : style.inputTwoFactorAuthenticator
                        }
                    />

                    <input
                        name="field4"
                        maxLength="1"
                        onChange={event => {
                            this.getInput(event.target);
                        }}
                        className={
                            errors && errors.includes("field4")
                                ? style.inputError
                                : style.inputTwoFactorAuthenticator
                        }
                    />


                    <input
                        name="field5"
                        maxLength="1"
                        onChange={event => {
                            this.getInput(event.target);
                        }}
                        className={
                            errors && errors.includes("field5")
                                ? style.inputError
                                : style.inputTwoFactorAuthenticator
                        }
                    />

                    <input
                        name="field6"
                        maxLength="1"
                        onChange={event => {
                            this.getInput(event.target);
                        }}
                        className={
                            errors && errors.includes("field6")
                                ? style.inputError
                                : style.inputTwoFactorAuthenticator
                        }
                    />
                </div>

                <div className={style.instructions_2}>
                    {i18n.t("2FA_INSTRUCTIONS_2")}
                    <Link className={style.linkWhereToFind} to="#">
                        {i18n.t("2FA_INSTRUCTIONS_LINK_WHERE_TO_FIND")}
                    </Link>
                </div>

                <button
                    className={style.buttonBorderGreen}
                    onClick={() => {
                        this.inputValidator();
                    }}
                >
                    {i18n.t("BTN_LOGIN")}
                </button>

            </div>
        );
    }
}

Login.propTypes = {
    authenticate: PropTypes.func,
    clearMessage: PropTypes.func,
    errorInput: PropTypes.func
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            authenticate,
            clearMessage,
            errorInput
        },
        dispatch
    );

export default connect(
    null,
    mapDispatchToProps
)(Login);
