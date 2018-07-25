import React from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loading } from "../redux/userAction";
import { clearMessage, errorInput } from "../../errors/redux/errorAction";

// COMPONENTS
import Footer from "../footer";
import Loading from "../../../components/loading";

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
    let { loading, errorInput } = this.props;
    let { errors, messageError } = inputValidator(inputs);

    if (errors.length > 0) {
      errorInput(messageError);
      this.setState({
        ...this.state,
        errors
      });
    } else {
      loading();
      clearMessage();
      loading();

      // CÓDIGO
    }
  };

  render() {
    let { loading } = this.props.user;
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
          {loading ? <Loading /> : i18n.t("BTN_IMPORT_SEED")}
        </button>

        <Footer />
      </div>
    );
  }
}

Seed.propTypes = {
  loading: PropTypes.func,
  clearMessage: PropTypes.func,
  errorInput: PropTypes.func,
  user: PropTypes.object
};

const mapSateToProps = store => ({
  user: store.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loading,
      clearMessage,
      errorInput
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(Seed);
