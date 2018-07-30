import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getCreateUserTermsInfo } from "../redux/userAction";
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
            errors: undefined,
            checkDownload: false
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
        let { clearMessage, errorInput } = this.props;
        let { inputs } = this.state;
        let { messageError, errors } = inputValidator(inputs);

        if (errors.length > 0) {
            errorInput(messageError);
            this.setState({
                ...this.state,
                errors
            });
        } else {
            clearMessage();
            alert("OK");
        }
    };

    render() {
        
        let { checkboxTerms, checkDownload } = this.state;

        return (
            <div>
                <img src="../../images/logo.svg" className={style.logo} />

                <div className={style.alignInfoDownloadTerms}>
                    <img src="../../images/gdpr-compliant@1x.png" />

                    <div className={style.infoDownloadTerms}>
                        <Link className={style.linkDownloadTerms} to="#" target="_blank" onClick={() => this.checkDownload} >
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
                        checkboxTerms && checkDownload
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
    getCreateUserTermsInfo: PropTypes.func,
    clearMessage: PropTypes.func,
    errorInput: PropTypes.func
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            getCreateUserTermsInfo,
            clearMessage,
            errorInput
        },
        dispatch
    );

export default connect(
    null,
    mapDispatchToProps
)(CreateUserTerms);
