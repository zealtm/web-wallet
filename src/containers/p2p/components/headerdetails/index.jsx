import React from "react";
import PropTypes from "prop-types";
// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  openDeposit,
  acceptOfferWhenBuying,
  chatDetailsSetter
} from "../../redux/p2pAction";

//UTILS
import i18n from "./../../../../utils/i18n";

// MATERIAL UI
import { Grid } from "@material-ui/core";
import { KeyboardArrowUp, Clear } from "@material-ui/icons";

// STYLE
import style from "./style.css";

//FUNCTIONS
import { getChatBundle } from "../../chat/functions"

class HeaderDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addressBuyer: "",
      rooms: [],
      joinedRoom: -1,
      errors: []
    }
    this.renderErrors = this.renderErrors.bind(this);
  }
  convertRooms = () => {
    let { currentOrder: order } = this.props.chatDetails
    if (!order || (order && !order.chat)) return;
    let { rooms } = order.chat
    let filteredRooms = rooms.map(room => {
      return {
        title: `${room.name} ${room.surname}`,
        img: room.photo || '',
        userId: room.userId,
        roomHashId: room.roomHashId
      }
    })
    this.setState({rooms: filteredRooms})
  }

  componentDidMount = () => {
    let { currentOrder: order } = this.props.chatDetails
    if (order) this.convertRooms()
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
    const { order, acceptOfferWhenBuying, openDeposit } = this.props;
    const { addressBuyer } = this.state;

    let error = [];

    if (addressBuyer == "") {
      error.push(i18n.t("P2P_CHANGE_ADDRESS"));
    }

    if (error.length > 0) {
      this.setState({
        ...this.state,
        errors: error
      });
    } else {
      acceptOfferWhenBuying({
        coin: "lunes",
        orderId: order.id,
        addressBuyer: addressBuyer
      });

      openDeposit(order);
    }
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
  handleJoinRoom = event => {
    const { chatDetailsSetter, chatDetails } = this.props
    let key = event.target.value
    if (!key) return;
    this.setState({joinedRoom: key})
    let room = this.state.rooms[key]
    chatDetailsSetter({
      buyer: {
        id: room.userId,
        name: room.title
      },
      currentRoom: room.roomHashId
    })
    let { seller, currentOrder } = chatDetails
    let { id: adOwnerId } = seller
    let { id: adId } = currentOrder
    getChatBundle({adOwnerId, buyerId: room.userId, adId})
  }
  renderErrors = () => {
    const { errors } = this.state;

      return errors.map((val, key) => {
        return (
          <div key={key}>
            <div className={style.textErrorSmall}>
              <Clear className={style.iconListValid} />
              {val}
            </div>
          </div>
        );
      });

  };

  render() {
    // const { order } = this.props;
    const {
      currentOrder: order,
      typeOfUser: typeOfChatUser,
    } = this.props.chatDetails
    const { rooms } = this.state

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
              <div className={style.textSmall}>
                {i18n.t("P2P_HEADER_PAYMENT")}
              </div>
              <div className={style.listItemCoin}>
                <img src={`images/icons/coins/${order.sell.coin}.png`} />
                {order.sell.coin.toUpperCase()}
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid container style={{display: typeOfChatUser === 'buyer' ? 'flex' : 'none'}}>
          <Grid item xs={3} />
          <Grid item xs={9}>
            <div className={style.boxDescription}>{order.description}</div>
          </Grid>
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
          <Grid item xs={3} />
          <Grid item xs={9}>
            {this.renderErrors()}
          {order.status != "confirmed"?<button className={style.btBuy} onClick={this.handleClick}>{i18n.t("P2P_HEADER_BUY_2")}</button>:null}
          </Grid>
        </Grid>

        <Grid container style={{
          display: typeOfChatUser === 'seller' ? 'flex' : 'none'
        }}>
          <Grid item xs={3} />
          <Grid item xs={9} style={{textAlign: 'center'}}>
            <select onChange={this.handleJoinRoom} value={this.state.joinedRoom} style={{display: 'inline-block'}}>
              <option disabled value="-1">{i18n.t("P2P_CHAT_SELECT_AN_USER")}</option>
              {rooms.map((room, key) => {
                return (
                  <option key={key} value={key}>
                    {room.title}
                  </option>
                )
              })}
            </select>
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
            className={style.arrowUp+' showHeaderDetails'}
          />
        </Grid>
      </div>
    );
  }
}
HeaderDetails.propTypes = {
  showHeaderDetails: PropTypes.func,
  acceptOfferWhenBuying: PropTypes.func,
  openDeposit: PropTypes.func,
  chatDetails: PropTypes.object.isRequired,
  chatDetailsSetter: PropTypes.func.isRequired
};
const mapStateToProps = store => ({
  chatDetails: store.p2p.chatDetails,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    openDeposit,
    acceptOfferWhenBuying,
    chatDetailsSetter
  }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderDetails);
