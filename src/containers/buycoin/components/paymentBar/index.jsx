import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setCoinSelected } from "../../redux/buyAction";
import {
  getPaymentMethodService
} from "../../../deposit/redux/depositAction";
// MATERIAL
import {
  Grid,
  Checkbox,
  FormControlLabel,
  withStyles,
  Hidden
} from "@material-ui/core/";

// ICONS
import { Lens } from "@material-ui/icons";

// COMPONENTS
import Select from "../../../../components/select";

// UTILS
import i18n from "../../../../utils/i18n";

// STYLE
import style from "./style.css";

const stylesCustom = () => ({
  root: {
    color: "#654fa4",
    "&$checked": {
      color: "#68f285"
    }
  },
  rootLabel: {
    fontSize: "15px",
    color: "#fff"
  },
  checked: {
    color: "#68f285"
  }
});

class PaymentBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: i18n.t("COINSALE_SEL_COIN"),
      img: null,
      paymentMethod: [
        { title: i18n.t("RECHARGE_CREDIT_PAYMENT"), value: "credit" },
        { title: i18n.t("RECHARGE_COIN_PAYMENT"), value: "coin" }
      ],
      selectedPaymentMethod: {
        title: undefined,
        value: undefined
      }
    };
  }

  coinSelected = (value, title, img = undefined) => {
    const { setCoinSelected, coins } = this.props;
    this.setState({
      title: title,
      value,
      img
    });

    setCoinSelected(title.toLowerCase(), coins[value].address, coins[value].id);
  };
  handlePayment = (value, title) => {
    this.setState({
      ...this.state,
      selectedPaymentMethod: {
        value: value,
        title: title
      }
    });
  };
  componentDidMount() {
    const { getPaymentMethodService } = this.props;
    getPaymentMethodService(10);
  }
  render() {
    const { title, img, selectedPaymentMethod } = this.state;
    const { classes, coins, coinsActive, methodPaymentsList } = this.props;
    let coinspayment = [];
    const paymentTitle = selectedPaymentMethod.title
      ? selectedPaymentMethod.title
      : i18n.t("SELECT_PAYMENT");
    Object.keys(coins).map(key => {
      const val = coins[key];
      let item = {
        img: `images/icons/coins/${val.abbreviation}.png`,
        title: val.abbreviation.toUpperCase(),
        value: key
      };
      if (
        val.abbreviation.toLowerCase() != "lunes" &&
        coinsActive[val.abbreviation].status == "active"
      ) {
        coinspayment.push(item);
      }
    });
    return (
      <Grid container direction="row" justify="center">
        <Grid item xs={12} className={style.paymentType}>
          <Grid item xs={12} className="payments">
            <h4>{i18n.t("DEPOSIT_PAYMENT_METHODS")}</h4>
          </Grid>
        </Grid>
        <Grid item xs={12} md={10} className={style.box} style={{ marginBottom: "20px" }}>
          <Grid container>
            <Grid item xs={12} sm={6} className={style.alignSelectItem_1}>
              <Hidden smUp>
                <Select
                  list={methodPaymentsList}
                  title={paymentTitle}
                  selectItem={this.handlePayment}
                  width={"100%"}
                />
              </Hidden>
              <Hidden xsDown>
                <Select
                  list={methodPaymentsList}
                  title={paymentTitle}
                  selectItem={this.handlePayment}
                />
              </Hidden>
            </Grid>
            {selectedPaymentMethod.value === "coin" ? (
              <Grid item xs={12} sm={6} className={style.alignSelectItem_2}>
                <Hidden smUp>
                  <Select
                    list={coinspayment}
                    title={title}
                    titleImg={img}
                    selectItem={this.coinSelected}
                    width={"94%"}
                  />
                </Hidden>
                <Hidden xsDown>
                  <Select
                    list={coinspayment}
                    title={title}
                    titleImg={img}
                    selectItem={this.coinSelected}
                  />
                </Hidden>
              </Grid>
            ) : null}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

PaymentBar.propTypes = {
  classes: PropTypes.object.isRequired,
  setCoinSelected: PropTypes.func.isRequired,
  coins: PropTypes.array.isRequired,
  coinsActive: PropTypes.array.isRequired,
  methodPaymentsList: PropTypes.array
};

const mapStateToProps = store => ({
  coins: store.buy.coinsPayment || [],
  coinsActive: store.skeleton.coins || [],
  methodPaymentsList: store.deposit.paymentsMethodsService
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCoinSelected,
      getPaymentMethodService
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(stylesCustom)(PaymentBar));
