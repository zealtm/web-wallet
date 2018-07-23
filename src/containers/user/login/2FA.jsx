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
                factorAuthenticator: undefined
            },
            factorAuthenticator: {
                field_1: undefined,
                field_2: undefined,
                field_3: undefined,
                field_4: undefined,
                field_5: undefined,
                field_6: undefined
            },
            errors: undefined
        };
    }

    getInput = input => {
        let { name, value } = input;
        let { factorAuthenticator } = this.state;
        this.setState({
            ...this.state,
            factorAuthenticator: { ...factorAuthenticator, [name]: value },
            errors: undefined
        });
        return;
    };

    inputValidator = () => {
        let { clearMessage, errorInput } = this.props;
        let { field_1, field_2, field_3, field_4, field_5, field_6 } = this.state.factorAuthenticator;
        let factorAuthenticator = field_1 + field_2 + field_3 + field_4 + field_5 + field_6;
        let { messageError, errors } = inputValidator({ inputs: { type: "factorAuthenticator", value: factorAuthenticator } });

        if (errors.length > 0) {
            errorInput(messageError);
            this.setState({
                ...this.state,
                errors
            });
        } else {
            clearMessage();
            alert("ok");
        }
    };

    render() {
        let { errors, factorAuthenticator } = this.state;

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
                        name="field_1"
                        maxLength="1"
                        onChange={event => {
                            this.getInput(event.target);
                        }}
                        className={
                            errors
                                ? style.inputTwoFactorAuthenticatorError
                                : style.inputTwoFactorAuthenticator
                        }
                    />

                    <input
                        name="field_2"
                        maxLength="1"
                        onChange={event => {
                            this.getInput(event.target);
                        }}
                        className={
                            errors
                                ? style.inputTwoFactorAuthenticatorError
                                : style.inputTwoFactorAuthenticator
                        }
                    />

                    <input
                        name="field_3"
                        maxLength="1"
                        onChange={event => {
                            this.getInput(event.target);
                        }}
                        className={
                            errors
                                ? style.inputTwoFactorAuthenticatorError
                                : style.inputTwoFactorAuthenticator
                        }
                    />

                    <input
                        name="field_4"
                        maxLength="1"
                        onChange={event => {
                            this.getInput(event.target);
                        }}
                        className={
                            errors
                                ? style.inputTwoFactorAuthenticatorError
                                : style.inputTwoFactorAuthenticator
                        }
                    />


                    <input
                        name="field_5"
                        maxLength="1"
                        onChange={event => {
                            this.getInput(event.target);
                        }}
                        className={
                            errors
                                ? style.inputTwoFactorAuthenticatorError
                                : style.inputTwoFactorAuthenticator
                        }
                    />

                    <input
                        name="field_6"
                        maxLength="1"
                        onChange={event => {
                            this.getInput(event.target);
                        }}
                        className={
                            errors
                                ? style.inputTwoFactorAuthenticatorError
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
                    className={
                        factorAuthenticator.field_1
                            && factorAuthenticator.field_2
                            && factorAuthenticator.field_3
                            && factorAuthenticator.field_4
                            && factorAuthenticator.field_5
                            && factorAuthenticator.field_6
                            ? style.buttonGreen : style.buttonBorderGreen}
                    onClick={() => this.inputValidator()}
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
