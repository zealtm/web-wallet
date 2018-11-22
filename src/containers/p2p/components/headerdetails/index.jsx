import React from "react";
import PropTypes from "prop-types";
// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { openDeposit, acceptOfferWhenBuying } from "../../redux/p2pAction";

//UTILS
import i18n from "./../../../../utils/i18n";

// MATERIAL UI
import { Grid } from "@material-ui/core";
import { KeyboardArrowUp } from "@material-ui/icons";

// COMPONENTS
import Select from "../../../../components/select";
import DepositModal from "../../modal/deposit";

// STYLE
import style from "./style.css";
import Modal from "../../../../components/modal";

class HeaderDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addressBuyer: ""
    }
  }
  coinSelected = (value, title, img = undefined) => {
    this.setState({
      ...this.state,
      coin: {
        name: title,
        value,
        img
      }
    });
  };

  handleClick = () => {
    const { order,acceptOfferWhenBuying,openDeposit } = this.props;
    const {addressBuyer} = this.state;

    acceptOfferWhenBuying({
      coin: "lunes",
      orderId: order.id, 
      addressBuyer: addressBuyer
    });

    openDeposit(order);
  };

  handleFields = e => {
    const { name, value } = e.target;

    switch (name) {
      case "addressBuyer":
        this.setState({
          ...this.state,
          addressBuyer: value
        });
        break;
    }
  };

  render() {
    const { order } = this.props;
    return (
      <div>
        <Grid container>
          <Grid item xs={3} />
          <Grid item xs={4}>
            <div className={style.formGroup}>
              <div className={style.textSmall}>{i18n.t("P2P_HEADER_BUY")}</div>
              <div className={style.listItemCoin}>
                <img src={`images/icons/coins/${order.buy.coin}.png`} />
                {order.buy.coin.toUpperCase()}
              </div>
            </div> 
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={4}>
            <div className={style.formGroup}>
              <div className={style.textSmall}>{i18n.t("P2P_HEADER_PAYMENT")}</div>
              <div className={style.listItemCoin}>
                <img src={`images/icons/coins/${order.sell.coin}.png`} />
                {order.sell.coin.toUpperCase()}
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={3} />
          <Grid item xs={9}>
            <div className={style.boxDescription}>{order.description}</div>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={3} />
          <Grid item xs={9}>
            <input
              type="text"
              placeholder="address to sent"
              className={style.inputCenter}
              value={this.state.addressBuyer}
              name="addressBuyer"
              onChange={e => this.handleFields(e)}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={3} />
          <Grid item xs={9}>
          {order.status != "confirmed"?<button className={style.btBuy} onClick={this.handleClick}>{i18n.t("P2P_HEADER_BUY_2")}</button>:null}
            
          </Grid>
        </Grid>
        <Grid
          container
          direction="column"
          justify="flex-end"
          alignItems="flex-end"
        >
          <KeyboardArrowUp
            onClick={() => this.props.showHeaderDetails()}
            className={style.arrowUp}
          />
        </Grid>
      </div>
    );
  }
}
HeaderDetails.propTypes = {
  showHeaderDetails: PropTypes.func,
  order: PropTypes.object,
  acceptOfferWhenBuying: PropTypes.func,
  openDeposit: PropTypes.func
};
const mapStateToProps = store => ({ order: store.p2p.chat.iduser });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ openDeposit, acceptOfferWhenBuying }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderDetails);
