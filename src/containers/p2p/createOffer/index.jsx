import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createOfferWhenSelling } from "../redux/p2pAction";

// MATERIAL
import {
  Grid,
  Avatar,
  Radio,
  withStyles,
  FormControlLabel
} from "@material-ui/core/";
import { ArrowForward, ArrowBack } from "@material-ui/icons/";

// ICONS
import { Lens } from "@material-ui/icons";

// COMPONENTS
import Select from "../../../components/select";
import StarVotes from "../components/starvotes";

// UTILS
import i18n from "../../../utils/i18n";

// STYLE
import style from "./style.css";

const stylesCustom = {
  root: {
    color: "#654fa4",
    "&$checked": {
      color: "#68f285"
    }
  },
  rootLabel: {
    fontSize: "11px",
    color: "#fff"
  },
  checked: {
    color: "#68f285"
  }
};

class CreateOffer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Lunes",
      img: "images/icons/coins/lunes.png",

      selectedValue: "",

      order: {
        coin: "",
        type: "",
        paymentMethodId: "",
        amount: "",
        amountPayment: "",
        addressSeller: ""
      }
    };

    this.handleFields = this.handleFields.bind(this);
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

  handleChange = event => {
    this.setState({
      ...this.state,
      order: {
        ...this.state.order,
        type: event.target.value
      },
      selectedValue: event.target.value
    });
  };

  handleFields = e => {
    const { name, value } = e.target;

    switch (name) {
      case "coin":
        this.setState({
          ...this.state,
          order: {
            ...this.state.order,
            coin: value
          }
        });
        break;
      case "type":
        this.setState({
          ...this.state,
          order: {
            ...this.state.order,
            type: value
          }
        });
        break;
      case "paymentMethodId":
        this.setState({
          ...this.state,
          order: {
            ...this.state.order,
            paymentMethodId: value
          }
        });
        break;
      case "amount":
        this.setState({
          ...this.state,
          order: {
            ...this.state.order,
            amount: value
          }
        });
        break;
      case "amountPayment":
        this.setState({
          ...this.state,
          order: {
            ...this.state.order,
            amountPayment: value
          }
        });
        break;
      case "addressSeller":
        this.setState({
          ...this.state,
          order: {
            ...this.state.order,
            addressSeller: value
          }
        });
        break;
    }
  };

  validateForm = () => {
    const { createOfferWhenSelling } = this.props;
    const { order } = this.state;

    console.log("ORDER", order);
    // validate the order fields

    // create
    // createOfferWhenSelling(order);
  };

  componentDidMount = () => {
    const { user } = this.props;
    console.log("user", user);
  };

  render() {
    const { title, img } = this.state;
    const { classes, coinsEnabled, user } = this.props;

    const username = user.name + " " + user.surname;
    return (
      <div className={style.baseUser}>
        <div className={style.headerUser}>
          <Grid container>
            <Grid item xs={2}>
              <Avatar
                alt="avatar"
                src={user.profilePicture}
                className={style.avatar}
              />
            </Grid>
            <Grid item xs={6}>
              <span className={style.name}>{username}</span>
              <span className={style.textSmall}>00/00/0000</span>
            </Grid>
            <Grid item xs={4} style={{ paddingLeft: 10 }}>
              <div className={style.boxStar}>
                <StarVotes votes={0} />
              </div>
            </Grid>
          </Grid>
        </div>

        <div className={style.formBase}>
          <div className={style.formGroup}>
            <div className={style.textSmall}>{i18n.t("P2P_CREATE_OFFER_COIN_VALUES")}</div>
            <Grid container>
              <Grid item xs={5}>
                <input
                  type="text"
                  name="amount"
                  placeholder="0.0000"
                  className={style.inputDefault}
                  value={this.state.order.amount}
                  onChange={e => this.handleFields(e)}
                />
              </Grid>
              <Grid item xs={2}>
                <ArrowForward className={style.arrowPrice} />
              </Grid>
              <Grid item xs={5}>
                <input
                  type="text"
                  name="amountPayment"
                  placeholder="R$0,00"
                  className={style.inputDefault}
                  value={this.state.order.amountPayment}
                  onChange={e => this.handleFields(e)}
                />
              </Grid>
            </Grid>
          </div>

          <div className={style.formGroup}>            
            <Grid container >
              <Grid item xs={5}>
               <div className={style.textSmall}>{i18n.t("P2P_CREATE_OFFER_COIN_ANNOUNCED")}</div>
                <Select
                  list={coinsEnabled}
                  title={title}
                  titleImg={img}
                  selectItem={this.coinSelected}
                  error={null}
                  width={"100%"}
                />
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={5} >
              <div className={style.textSmallCoinPayment}>{i18n.t("P2P_CREATE_OFFER_COIN_PAYMENT")}</div>
                <Select
                  list={coinsEnabled}
                  title={title}
                  titleImg={img}
                  selectItem={this.coinSelected}
                  error={null}
                  width={"100%"}
                />

              </Grid>
            </Grid>
            <hr />
          </div>

          <div className={style.formGroup}>
            <div className={style.textSmall}>{i18n.t("P2P_CREATE_OFFER_NEGOTIATION")}</div>
            <FormControlLabel
              value="p2p"
              className={style.labelRadio}
              classes={{ label: classes.rootLabel }}
              control={
                <Radio
                  checked={this.state.selectedValue === "p2p"}
                  icon={<Lens />}
                  checkedIcon={<Lens />}
                  onChange={this.handleChange}
                  classes={{ root: classes.root, checked: classes.checked }}
                />
              }
              label="P2P (Peer to Peer)"
              labelPlacement="end"
            />
            <hr />
          </div>

          <div className={style.formGroup}>
            <div className={style.textSmall}>{i18n.t("P2P_CREATE_OFFER_ADDRESS")}</div>
            <input
              type="text"
              name="addressSeller"
              placeholder={i18n.t("P2P_CREATE_OFFER_ADDRESS_PLACEHOLDER")}
              className={style.inputDefault}
              value={this.state.order.addressSeller}
              onChange={e => this.handleFields(e)}
            />
          </div>
          <hr />
          <div className={style.formGroup}>
            <div className={style.textSmall}>{i18n.t("P2P_CREATE_OFFER_DESCRIPTION")}</div>
            <textarea
              className={style.textArea}
              name="description"
              placeholder={i18n.t("P2P_CREATE_OFFER_DESCRIPTION_PLACEHOLDER")}
              onChange={e => this.handleFields(e)}
            >
              {this.state.order.description}
            </textarea>
            <button className={style.btContinue} onClick={this.validateForm}>
              {i18n.t("P2P_CREATE_OFFER_BUTTON_CONFIRMATION")}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

CreateOffer.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = store => ({
  coinsEnabled: store.p2p.coinsEnabled || [],
  user: store.user.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createOfferWhenSelling
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(stylesCustom)(CreateOffer));
