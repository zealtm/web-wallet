import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { openChat } from "../../redux/p2pAction";

// UTILS
import { formatDate } from "../../../../utils/numbers";
import i18n from "./../../../../utils/i18n";

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

  openChat = order => {
    const { openChat } = this.props;

    openChat(order);
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
  }
  render() {
    const { order, userEmail, type } = this.props;
    const { openDetails } = this.state;
    const dateCreate = formatDate(order.createdAt, "DM");
    const total = order.unitValue.brl * order.sell.amount;

    return (
      <div className={style.baseUser} onClick={this.handleDetails}>
        <Grid container>
          <Grid item xs={2}>
            <Avatar
              alt="avatar"
              src="images/lunio/lunio-user@100x100.jpg"
              className={style.avatar}
            />
          </Grid>
          <Grid item xs={5}>
            <span className={style.name}>
              {order.sell.user.name} {order.sell.user.surname}
            </span>
            <span className={style.textSmall}>{dateCreate}</span>
            <span className={style.numberText}>{order.sell.amount}</span>
            <span className={style.textSmall}>{i18n.t("P2P_OFFER")}</span>
            <div className={style.offerText}>
              <img src={`images/icons/coins/${order.sell.coin}.png`} />
              {order.sell.coin.toUpperCase()}
            </div>
          </Grid>
          <Grid item xs={5} style={{ paddingLeft: 10 }}>
            <div className={style.boxStar}>
              <StarVotes votes={order.sell.user.rating} />
              {this.renderBtClose()}
            </div>
            <span className={style.textSmall}>
              {i18n.t("P2P_VALUE_UNITY")} {order.unitValue.brl.toFixed(2)}
            </span>
            <ArrowForward className={style.arrowPrice} />
            <span className={style.numberText}>R${total.toFixed(2)}</span>
            <span className={style.textSmall}>{i18n.t("P2P_SELLS")}</span>
            <div className={style.offerText}>
              <img src={`images/icons/coins/${order.buy.coin}.png`} />
              {order.buy.coin.toUpperCase()}
            </div>
            <span className={style.hours}>00:00 am</span>
          </Grid>
          <Grid item xs={2} />
          <Grid
            item
            xs={10}
            className={style.boxDetails}
            style={openDetails ? { display: "block" } : null}
          >
            <div className={style.textDetails}>{order.description}</div>
            {(userEmail != order.sell.user.email && type != "myhistory") ? (
              <button
                className={style.btContinue}
                onClick={() => this.openChat(order)}
              >
                {i18n.t("P2P_BUTTON_NEGOTIATE")}
              </button>) : null}
          </Grid>
        </Grid>
      </div>
    );
  }
}

CardOffer.propTypes = {
  openChat: PropTypes.func.isRequired,
  order: PropTypes.object,
  userEmail: PropTypes.string,
  type: PropTypes.string
};

const mapStateToProps = store => ({
  userEmail: store.user.user.email
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ openChat }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardOffer);
