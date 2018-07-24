import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { authenticate } from "../redux/userAction";
import { clearMessage, errorInput } from "../../errors/redux/errorAction";

// COMPONENTS
import Footer from "../footer";

// UTILS
// import { inputValidator } from "../../../utils/inputValidator";
import i18n from "../../../utils/i18n";

// STYLE
import style from "../style.css";

const mapSateToProps = store => ({
    user: store.user,
    error: store.error
});

class Seed extends React.Component {
    constructor() {
        super();
        this.state = {
            inputs: {
                seed: undefined
            },
            errors: undefined,
            buttonEnable: false
        };
    }

    getInput = input => {
        let { value } = input;

        this.setState({
            ...this.state,
            inputs: { seed: value },
            errors: undefined,
            buttonEnable: value.split(" ").length >= 12 ? true : false
        });
    };

    render() {
        let { buttonEnable, errors } = this.state;

        return (
            <div className={style.contGeneral}>
                <img src="../../images/logo.svg" className={style.logo} />
                <div className={style.seedSlogan}>{i18n.t("SEED_SLOGAN")}</div>

                <div className={style.descriptionSeed}>{i18n.t("LOGIN_HEADER")}</div>

                <div className={style.insertSeed}>{i18n.t("SEED_INSERT_SEED")}</div>


                <input
                    type="textarea"
                    name="seed"
                    onChange={event => {
                        this.getInput(event.target);
                    }}
                    className={
                        errors
                            ? style.inputTextAreaError
                            : style.inputTextArea
                    }
                />

                <button
                    className={style.buttonPurpleClear}
                    onClick={() => {
                        this.generateNewSeed();
                    }}
                >
                    {i18n.t("BTN_NEW_SEED")}
                </button>

                <button
                    className={
                        buttonEnable
                            ? style.buttonEnable
                            : style.buttonBorderGreen}

                    onClick={() => {
                        this.importSeed();
                    }}
                >
                    {i18n.t("BTN_IMPORT_SEED")}
                </button>

                <Footer />
            </div>
        );
    }
}

Seed.propTypes = {
    authenticate: PropTypes.func,
    clearMessage: PropTypes.func,
    errorInput: PropTypes.func,
    user: PropTypes.object,
    error: PropTypes.object
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
    mapSateToProps,
    mapDispatchToProps
)(Seed);
