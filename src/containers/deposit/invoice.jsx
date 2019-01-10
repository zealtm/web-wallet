import React from "react";
import PropTypes from "prop-types";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
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
    borderBottomColor: `${colors.green.default} !important`,
    fontSize: "1em !important",
    width: "8em"
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
      paymentMethods: [i18n.t("DEPOSIT_INVOICE"), i18n.t("DEPOSIT_CREDIT")],
      payment: i18n.t("DEPOSIT_INVOICE"),
      days: [...Array(31).keys()],
      day: "1",
      checkBox: false
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

  handleChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };

  handleChangeRecurrent() {
    const { checkBox } = this.state;
    this.setState({
      ...this.state,
      checkBox: !checkBox
    });
  }

  handleChangePaymentMethod = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;
    const { checkBox } = this.state;

    return (
      <Grid container direction="row" justify="center">
        <Grid item xs={12} className={style.box} style={{ padding: 5 }}>
          <p>{i18n.t("DEPOSIT_TAB_TITLE")}</p>
        </Grid>

        <Grid item xs={12} className="payments">
          <h4>{i18n.t("DEPOSIT_PAYMENT_METHODS")}</h4>
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
              <CustomCheckbox onChange={() => this.handleChangeRecurrent()} />
              <div className={style.paddingTop}>
                {i18n.t("DEPOSIT_RECURRENT")}
              </div>
            </div>
          </Grid>

          <Grid item xs={6} sm={4}>
            <div className={style.containerInput}>
                <Grid item>
                  <img src="images/icons/deposit/calendar@25x28.png" alt="Calendar"/>
                </Grid>
                <Grid item>
                  <FormControl
                    className={classes.formControl}
                    disabled={!checkBox}
                  >
                    <div className={style.paddingTop}>
                      <Select
                        classes={{
                          selectMenu: classes.underlineItems
                        }}
                        MenuProps={MenuProps}
                        value={this.state.day}
                        renderValue={value => `${value}`}
                        onChange={event => this.handleChange(event)}
                        displayEmpty={true}
                        name="day"
                        disableUnderline={true}
                      >
                        {this.listDays()}
                      </Select>
                    </div>
                  </FormControl>
                </Grid>
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
