import React from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { clearMessage, errorInput } from "../../errors/redux/errorAction";

// COMPONENTS
import Footer from "../footer";

// UTILS
import { inputValidator } from "../../../utils/inputValidator";
import i18n from "../../../utils/i18n";

// STYLE
import style from "../style.css";

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
    let { name, value } = input;

    this.setState({
      ...this.state,
      inputs: { [name]: value ? input : undefined },
      errors: undefined,
      buttonEnable: value.split(" ").length === 12 ? true : false
    });
  };

  inputValidator = () => {
    let { inputs } = this.state;
    let { errorInput } = this.props;
    let { errors, messageError } = inputValidator(inputs);

    if (errors.length > 0) {
      errorInput(messageError);
      this.setState({
        ...this.state,
        errors
      });
    } else {
      clearMessage();

      // CÓDIGO
    }
  };

  render() {
    let { buttonEnable, errors } = this.state;

    return (
      <div className={style.contGeneral}>
        <img src="../../images/logo.svg" className={style.logo} />

        <div className={style.insertSeed}>{i18n.t("SEED_INSERT_SEED")}</div>

        <textarea
          type="textarea"
          name="seed"
          cols="15"
          rows="6"
          placeholder={i18n.t("PLACEHOLDER_SEED")}
          required
          onChange={event => {
            this.getInput(event.target);
          }}
          className={errors ? style.inputTextAreaError : style.inputTextArea}
        />

        <button className={style.buttonPurpleClear} onClick={() => {}}>
          {i18n.t("BTN_NEW_SEED")}
        </button>

        <button
          className={
            buttonEnable ? style.buttonEnable : style.buttonBorderGreen
          }
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
  clearMessage: PropTypes.func,
  errorInput: PropTypes.func
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      clearMessage,
      errorInput
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(Seed);
