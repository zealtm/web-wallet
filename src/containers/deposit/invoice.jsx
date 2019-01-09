import React from "react";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";

// UTILS
import i18n from "../../utils/i18n";

// STYLE
import style from "./style.css";

// COMPONENTS
import { Select, MenuItem } from "@material-ui/core";
import CustomCheckbox from "../../components/checkBox";
import Hidden from "@material-ui/core/Hidden";

// STYLE DO MATERIAL UI (Permitido)
const customStyle = {
  img: {
    width: "60%",
    height: "auto"
  },
  underlineItems: {
    color: "white",
    borderBottom: "1px solid ",
    fontSize: "26px !important",
  },
  menuItemRoot: {
    color: "#fff"
  },
  disabled: {},
  error: {},
  focused: {}
};

// STYLE DO MATERIAL UI (Permitido)
const MenuProps = {
  PaperProps: {
    style: {
      color: "#fff !important",
      maxHeight: 40 * 4.5,
      marginTop: "45px",
      backgroundColor: "#473088",
      width: "68px"
    }
  }
};

class Invoice extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      days: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31
      ],
      paymentsMethods: ["Boleto", "Crédito"]
    };
  }

  listPaymentMethods = () => {
    const classes = this.props;
    const { paymentsMethods } = this.state;

    return this.state.paymentsMethods.map((method, index) => (
      <MenuItem
        value={method}
        classes={{
          root: classes.menuItemRoot
        }}
        key={index}
      >
        {method}
      </MenuItem>
    ));
  };

  listDays = () => {
    const classes = this.props;
    const { days } = this.state;

    return this.state.days.map((day, index) => (
      <MenuItem
        value={day}
        classes={{
          root: classes.menuItemRoot
        }}
        key={index}
      >
        {day}
      </MenuItem>
    ));
  };

  render() {
    const classes = this.props;
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
                  value={this.state.day}
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
                value={this.state.day}
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

Invoice.propTypes = {};

export default Invoice;
