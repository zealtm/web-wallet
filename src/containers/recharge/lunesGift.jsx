import React from "react"
import i18n from "../../utils/i18n";
import { Grid } from "@material-ui/core";
import style from "./style.css";
import Code from './code';
import { inputValidator } from "../../utils/inputValidator";

const codeStyle = {
  marginTop: 'calc(12rem + 4px)',
};

class LunesGift extends React.Component {
  constructor() {
    super();

    this.state = {
      code: ['','','',''],
      errors: undefined
    }

    this.handleCodeChange = this.handleCodeChange.bind(this);
  }

  handleCodeChange = (id, value) => {
    const code = this.state.code;
    code[id] = value;

    this.setState({
      ...this.state,
      code
    });
  }

  inputValidator = () => {
    const {code} = this.state;

    const codeInput = {
      type: "text",
      name: "code",
      placeholder: "Code",
      value: code.join('').replace(/\D/, ''),
      required: true,
      minLength: 16,
      maxLength: 16,
    }

    let { messageError, errors } = inputValidator({code: codeInput});

    // console.log('errorMessage', messageError, 'errors', errors);
  }

  render() {
    const { code } = this.state;

    return (
      <Grid container
        direction="row"
        justify="center"
      >
        <Grid item
          xs={12}
          className={style.box}
        >
          <div className={style.wrap} style={codeStyle}>
            <label>{i18n.t("VOUCHER_CODE")}</label>
            <Code values={code} onHandleChange={this.handleCodeChange} />
          </div>

          <div className={style.wrap}>
            <div className={style.instructions}>
              <a href="#">
                {i18n.t("RECHARGE_INSTRUCTIONS")}
                <img src="/images/icons/recharge/ic_instrucoes.png" alt={i18n.t("RECHARGE_INSTRUCTIONS")} />
              </a>
            </div>

          </div>

          <div className={style.wrap}>
            <button
              className={style.buttonBorderGreen}
              onClick={() => this.inputValidator()}
            >
              {i18n.t("VOUCHER_BUTTON")}
            </button>
          </div>
        </Grid>
      </Grid>
    )
  }
}

export default LunesGift;


