 import React from "react";
 import PropTypes from 'prop-types'

// REDUX
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import {
  buySetter,
  setter,
  getPaymentMethodsWhenBuying,
  acceptOfferWhenBuying,
  createOfferWhenSelling
} from './../../redux/p2pAction'

// MATERIAL UI
import { Grid } from "@material-ui/core";

// COMPONENTS
import Select from "../../../../components/select";

// STYLE
import style from "./style.css";

//UTILS
import i18n from "./../../../../utils/i18n"

class boxChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myId: undefined
    }
    this.buySetter = props.buySetter
    this.setter = props.setter
  }
  componentDidMount() {
    this.props.getPaymentMethodsWhenBuying('lunes')
  }
  changedAvailableCoinsSelect = (value, title, img) => {
    this.buySetter({coinToBuy: {
      title,
      value,
      img,
    }})
  }

  changedPaymentMethodsSelect = (name, value, img) => {
    this.buySetter({paymentMethod: {
      title: value,
      img
    }})
  }

  handleBuyClick = () => {
    this.props.acceptOfferWhenBuying({
      coin: 'lunes',
      orderId: '1'
    })
  }

  render() {
    const {
      coinToBuy,
      availableCoinsToBuy,
      paymentMethods,
      paymentMethod,
    } = this.props.p2p.buy;
    const { currentOrder } = this.props.p2p

    let { orderId, ownerId } = currentOrder

    return (
      <div className={style.boxChat}>
        <div className={style.formGroup}>
          <Grid container>
            <Grid item xs={6}>
              <div className={style.buy}>
                <div className={style.card}>
                  <div className={style.textSmall}>{i18n.t("P2P_TO_BUY")}</div>
                  <Select
                    list={availableCoinsToBuy}
                    title={coinToBuy.title}
                    titleImg={coinToBuy.img}
                    selectItem={this.changedAvailableCoinsSelect}
                    error={null}
                    width={"100%"}
                  />
                </div>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className={style.payment}>
                <div className={style.card}>
                  <div className={style.textSmall}>{i18n.t("P2P_PAYMENT_METHOD")}</div>
                  <Select
                    list={paymentMethods}
                    title={paymentMethod.title}
                    titleImg={paymentMethod.img}
                    selectItem={this.changedPaymentMethodsSelect}
                    error={null}
                    width={"100%"}
                  />
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
        <Grid container>
          <Grid item xs={12}>
            {/*<input type="text" placeholder="Descrição" className={style.inputDefault} />*/}
            <input type="text" placeholder={i18n.t("P2P_INPUT_PUT_YOUR_ADDRESS")} className={style.inputDefault} style={{marginTop: -15}} />
          </Grid>
          <Grid item xs={6}>
            <button onClick={this.handleBuyClick} className={style.btContinue}>{i18n.t("P2P_BUY_BTN")}</button>
          </Grid>

          {/* <Grid item xs={6}>
            <button className={style.buttonGeneral}>Escroow</button>
          </Grid> */}
        </Grid>
      </div>
    );
  }
}

boxChat.propTypes = {
  getPaymentMethodsWhenBuying: PropTypes.func,
  acceptOfferWhenBuying: PropTypes.func,
  createOfferWhenSelling: PropTypes.func,
  buySetter: PropTypes.func.isRequired,
  setter: PropTypes.func.isRequired,
  p2p: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
  p2p: state.p2p,
  user: state.user,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    setter,
    buySetter,
    getPaymentMethodsWhenBuying,
    acceptOfferWhenBuying,
    createOfferWhenSelling
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(boxChat);
