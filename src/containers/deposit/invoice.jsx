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
    borderBottom: "1px solid ",
    borderBottomColor: `${colors.purple.dark} !important`,
    fontSize: "16px !important"
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
      days: [...Array(31).keys()]
    };
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
        value={day}
        classes={{
          root: classes.menuItemRoot
        }}
      >
        {day}
      </MenuItem>
    ));
  };

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
            <div className={style.containerinput}>
              <Select
                classes={{
                  selectMenu: classes.underlineItems
                }}
                MenuProps={MenuProps}
                value={paymentMethods}
                displayEmpty={true}
                name="day"
                disableUnderline={true}
              >
                {this.listPaymentMethods()}
              </Select>
            </div>
          </Grid>

          <Grid item xs={6} sm={4}>
            <div className={style.containerinput}>
              <CustomCheckbox /> Recorrente
            </div>
          </Grid>

          <Grid item xs={6} sm={4}>
            <div className={style.containerinput}>
              <Select
                classes={{
                  selectMenu: classes.underlineItems
                }}
                MenuProps={MenuProps}
                value={days}
                displayEmpty={true}
                name="day"
                disableUnderline={true}
              >
                {this.listDays()}
              </Select>
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
