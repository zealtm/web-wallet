import React from "react";
import PropTypes from "prop-types";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";

// UTILS
import i18n from "../../utils/i18n";

// STYLE
import style from "./style.css";
import colors from "../../components/bases/colors";

// COMPONENTS
import CustomCheckbox from "../../components/checkBox";

// STYLE DO MATERIAL UI (Permitido)
const customStyle = {
  underlineItems: {
    color: "white",
    borderBottomColor: `${colors.purple.dark} !important`,
    fontSize: "16px !important",
    width: "180px",
  },
  menuItemRoot: {
    color: colors.messages.info
  }
};

// STYLE DO MATERIAL UI (Permitido)
const MenuProps = {
  PaperProps: {
    style: {
      color: "#fff",
      maxHeight: 40 * 4.5,
      marginTop: "45px",
      backgroundColor: "#473088",
      width: "10%"
    }
  }
};

class Invoice extends React.Component {
  constructor() {
    super();
    this.state = {
      paymentMethods: ["Boleto", "Crédito"],
      payment: "Boleto",
      days: [...Array(31).keys()],
      day: '1'
    };

    this.handleChange = this.handleChange.bind(this);
  }

  listPaymentMethods = () => {
    const { classes } = this.props;
    const { paymentMethods } = this.state;

    return paymentMethods.map((method, index) => (
      <MenuItem
        value={method}
        key={index}
        classes={{
          root: classes.menuItemRoot
        }}
      >
        {method}
      </MenuItem>
    ));
  };

  listDays = () => {
    const { classes } = this.props;
    const { days } = this.state;

    return days.map((day, index) => (
      <MenuItem
        key={index}
        value={day + 1}
        classes={{
          root: classes.menuItemRoot
        }}
      >
        {day + 1}
      </MenuItem>
    ));
  };

  handleChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    })
  }

  handleChangePaymentMethod = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    })
  }

  render() {
    const { classes } = this.props;
    const { days, paymentMethods } = this.state;

    return (
      <Grid container direction="row" justify="center">
        <Grid item xs={12} className={style.box} style={{ padding: 5 }}>
          <p>{i18n.t("DEPOSIT_TAB_TITLE")}</p>
        </Grid>

        <Grid item xs={12} className="payments">
          <h4>Formas de pagamento</h4>
        </Grid>

        <Grid container spacing={8}>
          <Grid item xs={12} sm={4}>
            <div className={style.containerInput}>
              <Select
                classes={{
                  selectMenu: classes.underlineItems
                }}
                MenuProps={MenuProps}
                value={this.state.payment}
                renderValue={value => `${value}`}
                onChange={event => this.handleChangePaymentMethod(event)}
                displayEmpty={true}
                name="payment"
                disableUnderline={true}
              >
                {this.listPaymentMethods()}
              </Select>
            </div>
          </Grid>

          <Grid item xs={6} sm={4}>
            <div className={style.containerInput}>
              <CustomCheckbox /> <div className={style.paddingTop}>Recorrente</div>
            </div>
          </Grid>

          <Grid item xs={6} sm={4}>
            <div className={style.containerInput}>
            <div className={style.paddingTop}>
              <Select
                classes={{
                  selectMenu: classes.underlineItems
                }}
                MenuProps={MenuProps}
                value={this.state.day}
                renderValue={value => `${value}`}
                onChange= {event => this.handleChange(event)}
                displayEmpty={true}
                name="day"
                disableUnderline={true}
              >
                {this.listDays()}
              </Select>
            </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

Invoice.propTypes = {
  classes: PropTypes.object
};

export default withStyles(customStyle)(Invoice);
