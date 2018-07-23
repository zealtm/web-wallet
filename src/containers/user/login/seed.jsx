import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { authenticate } from "../redux/userAction";
import { clearMessage, errorInput } from "../../errors/redux/errorAction";

// COMPONENTS
import Footer from "../footer";

// UTILS
import { inputValidator } from "../../../utils/inputValidator";
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
                textAreaSeed: undefined
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
        let { inputs } = this.state;
        let { textAreaSeed } = this.state.inputs;
        let { errorInput, authenticate } = this.props;
        let { messageError, errors } = inputValidator(inputs);

        if (errors.length > 0) {
            errorInput(messageError);
            this.setState({
                ...this.state,
                errors
            });
        } else {
            clearMessage();
            authenticate(textAreaSeed.value);
        }
    };

    generateNewSeed = () => {
        alert("nova seed ok");
        return;
    };

    render() {
        let { errors, generateNewSeed } = this.state;

        return (
            <div className={style.contGeneral}>
                <img src="../../images/logo.svg" className={style.logo} />
                <div className={style.seedSlogan}>{i18n.t("SEED_SLOGAN")}</div>

                <div className={style.descriptionSeed}>{i18n.t("LOGIN_HEADER")}</div>

                <div className={style.insertSeed}>{i18n.t("SEED_INSERT_SEED")}</div>


                <input
                    type="textarea"
                    name="textAreaSeed"
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
                        generateNewSeed();
                    }}
                >
                    {i18n.t("BTN_NEW_SEED")}
                </button>

                <button
                    className={style.buttonBorderGreen}
                    onClick={() => {
                        this.inputValidator();
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
