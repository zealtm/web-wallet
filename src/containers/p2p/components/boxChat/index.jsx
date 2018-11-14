 import React from "react";
 import PropTypes from 'prop-types'

// REDUX
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { buySetter, setter } from './../../redux/p2pAction'

// MATERIAL UI
import { Grid } from "@material-ui/core";

// COMPONENTS
import Select from "../../../../components/select";

// STYLE
import style from "./style.css";

// SERVICES
import { PeerToPeer } from './../../../../services/p2p'

// const stylesCustom = () => ({
//     root: {
//       color: "#68f285",
//       '&$checked': {
//         color: "#68f285",
//       },
//     },
//     rootLabel: {
//       fontSize: "11px",
//       color: "#fff"
//     },
//     checked: {
//       color: "#68f285",
//     }
//   });


class boxChat extends React.Component {
  constructor(props) {
    super(props);
    this.buySetter = props.buySetter
    this.setter = props.setter
  }
  async componentDidMount() {
    let paymentMethods = await PeerToPeer.getPaymentMethodsWhenBuying('lunes')
    this.buySetter({paymentMethods})
  }
  componentDidUpdate() {
    console.log(this.props.p2p.buy)
  }
  changedAvailableCoinsSelect = (value, title, img) => {
    console.warn('HELLO WORLDA')
    this.setState({
      coinToBuy: {
        title,
        value,
        img,
      }
    })
  }

  changedPaymentMethodsSelect = (name, value, img) => {
    this.buySetter({paymentMethod: {
      title: name,
      value,
      img
    }})
  }

  render() {
    const {
      coinToBuy,
      availableCoinsToBuy,
      paymentMethods
    } = this.props.p2p.buy;
    const { title, img } = coinToBuy

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
                    title={title}
                    titleImg={img}
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
                    title={title}
                    titleImg={img}
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
            <button className={style.btContinue}>Vender</button>
          </Grid>

          <Grid item xs={6}>
            <button className={style.buttonGeneral}>Escroow</button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

boxChat.propTypes = {
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
    buySetter
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(boxChat);
