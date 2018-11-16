 import React from "react";
 import PropTypes from 'prop-types'

// REDUX
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import {
  buySetter,
  setter,
  getPaymentMethodsWhenBuying,
  acceptOfferWhenBuying
} from './../../redux/p2pAction'

// MATERIAL UI
import { Grid } from "@material-ui/core";

// COMPONENTS
import Select from "../../../../components/select";

// STYLE
import style from "./style.css";

class boxChat extends React.Component {
  constructor(props) {
    super(props);
    this.buySetter = props.buySetter
    this.setter = props.setter
  }
  componentDidMount() {
    console.log(this.props.getPaymentMethodsWhenBuying)
    this.props.getPaymentMethodsWhenBuying('lunes')
  }
  componentDidUpdate() {
    console.log(this.props.p2p.buy)
  }
  changedAvailableCoinsSelect = (value, title, img) => {
    this.buySetter({
      coinToBuy: {
        title,
        value,
        img,
      }
    })
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
      txId: '1',
      txBuyer: 'Jonas',
      addressBuyer: '<LUNES_ADDRESS>'
    })
  }

  render() {
    const {
      coinToBuy,
      availableCoinsToBuy,
      paymentMethods,
      paymentMethod
    } = this.props.p2p.buy;

    return (
      <div className={style.boxChat}>
        <div className={style.formGroup}>
          <Grid container>
            <Grid item xs={6}>
              <div className={style.buy}>
                <div className={style.card}>
                  <div className={style.textSmall}>Compra</div>
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
                  <div className={style.textSmall}>Pagamento</div>
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
            <input type="text" placeholder="Descrição" className={style.inputDefault} />
            <input type="text" placeholder="Endereço carteira" className={style.inputDefault} style={{marginTop: -15}} />
          </Grid>
          <Grid item xs={6}>
            <button onClick={this.handleBuyClick} className={style.btContinue}>Comprar</button>
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
  getPaymentMethodsWhenBuying: PropTypes.func.isRequired,
  acceptOfferWhenBuying: PropTypes.func.isRequired,
  buySetter: PropTypes.func.isRequired,
  setter: PropTypes.func.isRequired,
  p2p: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
  p2p: state.p2p,
})
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    setter,
    buySetter,
    getPaymentMethodsWhenBuying,
    acceptOfferWhenBuying
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(boxChat);
