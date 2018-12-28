import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  prepareOrOpenChat,
  setCancelOrder,
  openAvaliation,
  handleConfirmSell,
  setUserProfile,
  openDeposit,
  getProfile
} from "../../redux/p2pAction";

// UTILS
import { formatDate } from "../../../../utils/numbers";
import i18n from "./../../../../utils/i18n";
import { getDefaultFiat } from "../../../../utils/localStorage";
import { encryptMd5 } from "../../../../utils/cryptography";

// MATERIAL
import { Grid, Avatar } from "@material-ui/core/";
import { ArrowForward } from "@material-ui/icons/";

// COMPONENTS
import StarVotes from "../starvotes";

// STYLE
import style from "./style.css";

class CardOffer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDetails: false
    };
  }

  handleDetails = () => {
    this.setState({
      ...this.state,
      openDetails: !this.state.openDetails
    });
  };

  prepareOrOpenChat = order => {
    this.props.prepareOrOpenChat(order);
  };

  toggleCardDetails = bool =>
    this.setState({
      openDetails: bool === undefined ? !this.state.openDetails : bool
    });

  handleClick = () => {
    const { order } = this.props;
    if (order.status != "confirmed") {
      this.handleDetails();
    }
  };

  openChat = order => {
    const { openChat } = this.props;
    openChat(order);
  };

  openAvaliation = order => {
    const { openAvaliation, openChat } = this.props;
    openAvaliation(order);
    openChat();
  };

  openUserProfile = e => {
    e.stopPropagation();
    const { user } = this.props.order.sell;
    const { setUserProfile, getProfile } = this.props;

    getProfile(user.id);
    setUserProfile(user);
  };

  handleCancelOrder = e => {
    e.stopPropagation();
    const { setCancelOrder, order } = this.props;
    setCancelOrder(order.id);
  };

  renderBtClose = () => {
    const { order, userEmail } = this.props;
    if (userEmail == order.sell.user.email && order.status != "confirmed") {
      return (
        <button className={style.btnClose}>
          <img
            className={style.btnCloseImg}
            src="images/icons/p2p/btn-CloseP2p.png"
            alt="closep2p"
          />
        </button>
      );
    }
  };

  showSellConfirm = order => {
    const { openDeposit, handleConfirmSell } = this.props;
    openDeposit(order);
    handleConfirmSell(true);
  };

  renderNegociateButton = () => {
    const { order, type } = this.props;

    if (type !== "myhistory" && order.way === "buy") {
      return (
        <button
          className={style.btContinue}
          onClick={() => this.prepareOrOpenChat(order)}
        >
          {i18n.t("P2P_BUTTON_NEGOTIATE")}
        </button>
      );
    }
    if (type !== "myhistory" && order.way === "sell") {
      return (
        <button
          className={style.btContinue}
          onClick={() => this.showSellConfirm(order)}
        >
          {i18n.t("P2P_BUTTON_NEGOTIATE")}
        </button>
      );
    } else {
      return (
        <button
          className={style.btContinue}
          onClick={() => this.prepareOrOpenChat(order)}
        >
          {i18n.t("P2P_BUTTON_NEGOTIATE")}
        </button>
      );
    }
  };

  rederPictureGravatar(email) {
    const defaultImg =
      "https://luneswallet.app/images/icons/p2p/lunio-user300x300.jpg";
    return (
      "https://s.gravatar.com/avatar/" +
      encryptMd5(email.toLowerCase()) +
      "?s=300" +
      "&d=" +
      defaultImg
    );
  }

  renderRatingButton = () => {
    let { order, userEmail, status } = this.props;
    console.warn({ status, order });
    if (status !== "confirmed") return;
    console.warn({ status, oi: 1 });
    let isSeller = userEmail == order.sell.user.email;
    let sellerRating = order.sell.rating; //seller rated the buyer these values <
    let buyerRating = order.buy.rating; //buyer rated the seller these values <
    console.warn({ isSeller, sellerRating, buyerRating, userEmail, order });
    if (isSeller && order.status === "confirmed") {
      if (!sellerRating) {
        return (
          <button
            className={style.btRating}
            onClick={() => this.openAvaliation(order)}
          >
            {i18n.t("P2P_BUTTON_RATE_BUYER")}
          </button>
        );
      } else {
        return <StarVotes votes={sellerRating} />;
      }
    } else if (!isSeller && order.status === "confirmed") {
      if (!buyerRating) {
        return (
          <button
            className={style.btRating}
            onClick={() => this.openAvaliation(order)}
          >
            {i18n.t("P2P_BUTTON_RATE_SELLER")}
          </button>
        );
      } else {
        return <StarVotes votes={buyerRating} />;
      }
    }
  };

  render() {
    const { order, userEmail } = this.props;
    const { openDetails } = this.state;
    const { user } = this.props.order.sell;
    const dateCreate = formatDate(order.createdAt, "DMI").toUpperCase();
    const hourCreate = formatDate(order.createdAt, "HM");

    let defaultFiat = getDefaultFiat();
    const unitValue = order.unitValue[defaultFiat.toLowerCase()];
    const total = unitValue * order.sell.amount;

    return (
      <div className={style.baseUser} onClick={this.handleClick}>
        <Grid container>
          <Grid item xs={2}>
            <Avatar
              alt="avatar"
              src={this.rederPictureGravatar(user.email)}
              className={style.avatar}
              onClick={this.openUserProfile}
            />
          </Grid>
          <Grid item xs={5}>
            <span className={style.name} onClick={this.openUserProfile}>
              {user.name} {user.surname}
            </span>
            <span className={style.dateCreate}>{dateCreate}</span>
            <span className={style.hourCreate}>{hourCreate}</span>
            <span className={style.numberText}>{order.sell.amount}</span>
            <span className={style.textSmall}>{i18n.t("P2P_OFFER")}</span>
            <div className={style.offerText}>
              <img src={`images/icons/coins/${order.sell.coin}.png`} />
              {order.sell.coin.toUpperCase()}
            </div>
          </Grid>
          <Grid item xs={5}>
            <div className={style.boxStar}>
              {this.renderRatingButton()}

              {userEmail == order.sell.user.email &&
              order.status != "confirmed" ? (
                <button
                  className={style.btnClose}
                  onClick={this.handleCancelOrder}
                >
                  <img
                    className={style.cancelOffer}
                    src="images/icons/close/close.png"
                  />
                </button>
              ) : null}
            </div>
            <span className={style.defaultFiat}>
              {i18n.t("P2P_VALUE_UNITY")} {defaultFiat}{" "}
            </span>
            <span className={style.unit}>
              {parseFloat(unitValue).toFixed(2)}
            </span>
            <ArrowForward className={style.arrowPrice} />
            <span className={style.numberText}>
              {defaultFiat} {parseFloat(total).toFixed(2)}
            </span>
            <span className={style.textSmall}>{i18n.t("P2P_SELLS")}</span>
            <div className={style.offerText}>
              <img src={`images/icons/coins/${order.buy.coin}.png`} />
              {order.buy.coin.toUpperCase()}
            </div>
          </Grid>
          <Grid item xs={2} />
          <Grid
            item
            xs={10}
            className={style.boxDetails}
            style={openDetails ? { display: "block" } : null}
          >
            <div className={style.textDetails}>{order.description}</div>
            {this.renderNegociateButton()}
          </Grid>
        </Grid>
      </div>
    );
  }
}

CardOffer.propTypes = {
  prepareOrOpenChat: PropTypes.func.isRequired,
  order: PropTypes.object,
  setCancelOrder: PropTypes.func,
  userEmail: PropTypes.string,
  type: PropTypes.string,
  setUserProfile: PropTypes.func,
  openAvaliation: PropTypes.func,
  p2pStore: PropTypes.object,
  handleConfirmSell: PropTypes.func,
  getProfile: PropTypes.func,
  openDeposit: PropTypes.func,
  openChat: PropTypes.func,
  status: PropTypes.strings
};

const mapStateToProps = store => ({
  userEmail: store.user.user.email,
  p2pStore: store.p2p
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCancelOrder,
      openAvaliation,
      setUserProfile,
      openDeposit,
      handleConfirmSell,
      getProfile,
      prepareOrOpenChat
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardOffer);
