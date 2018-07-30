import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createUser } from "../redux/userAction";
import { clearMessage, errorInput } from "../../errors/redux/errorAction";

// UTILS
import { inputValidator } from "../../../utils/inputValidator";
import i18n from "../../../utils/i18n";

// STYLE
import style from "../style.css";
import CustomCheckbox from "../../../components/checkBox";

class CreateUserTerms extends React.Component {
    constructor() {
        super();
        this.state = {
            inputs: {
                checkboxTerms: undefined,
            },
            checkDownload: false,
            errors: undefined
        };
    }

    getInput = input => {
        let { type, name, value } = input;
        let { inputs } = this.state;
        this.setState({
            ...this.state,
            inputs: { ...inputs, [name]: type === "checkbox" ? input : value ? input : undefined },
            errors: undefined
        });
    };

    checkDownload = () => {
        this.setState({
            ...this.state,
            checkDownload: true,
        });
    }

    inputValidator = () => {
        let { createUser, clearMessage, errorInput, user } = this.props;
        let { inputs } = this.state;
        let { messageError, errors } = inputValidator(inputs);

        if (errors.length > 0 || !user.name || !user.surname || !user.email || !user.password) {
            errorInput(messageError);
            this.setState({
                ...this.state,
                errors
            });
        } else {
            clearMessage();
            createUser(user.name, user.surname, user.email, user.password );
        }
    };

    render() {

        let { inputs, checkDownload } = this.state;

        return (
            <div>
                <img src="../../images/logo.svg" className={style.logo} />

                <div className={style.alignInfoDownloadTerms}>
                    <img src="../../images/gdpr-compliant@1x.png" />

                    <div className={style.infoDownloadTerms}>
                        <Link className={style.linkDownloadTerms} to="#" onClick={() => this.checkDownload()} >
                            {i18n.t("NEW_ACCOUNT_TERMS_DOWNLOAD")}
                        </Link>
                    </div>
                </div>

                <div className={style.alignInfoTermsOfServices}>
                    <CustomCheckbox
                        type="checkbox"
                        name="checkboxTerms"
                        label={i18n.t("NEW_ACCOUNT_ACCEPT_TERMS")}
                        required
                        onChange={event => {
                            this.getInput(event.target);
                        }}
                    />

                    <div className={style.acceptTermsOfServices}>
                        {i18n.t("NEW_ACCOUNT_ACCEPT_TERMS")}
                    </div>
                    <Link className={style.linkTermsOfServices} to="#">
                        {i18n.t("NEW_ACCOUNT_TERMS_OF_SERVICES")}
                    </Link>
                </div>

                <button
                    className={
                        inputs.checkboxTerms && checkDownload
                            ? style.buttonEnable
                            : style.buttonBorderGreen
                    }
                    onClick={() => this.inputValidator()}
                >
                    {i18n.t("BTN_FINALIZE")}
                </button>
            </div>
        );
    }
}

CreateUserTerms.propTypes = {
    createUser: PropTypes.func,
    clearMessage: PropTypes.func,
    errorInput: PropTypes.func,
    user: PropTypes.object

};

const mapSateToProps = store => ({
    user: store.user.user
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            createUser,
            clearMessage,
            errorInput
        },
        dispatch
    );

export default connect(
    mapSateToProps,
    mapDispatchToProps
)(CreateUserTerms);
