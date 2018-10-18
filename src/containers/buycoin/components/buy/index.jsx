import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { openModal } from "../../redux/buyAction";

// COMPONENTS
import PaymentBar from "../paymentBar";
import CoinsBar from "../coinsBar";
import PackCoins from "../packCoins";
import Instructions from "../instructions";

// STYLES
import style from "./style.css";

class Buy extends React.Component {

  validarModal = () => {
    const {openModal} = this.props;

    openModal(true);
  }

  render() {
    return (
      <div>
        <div>Créditos $ 300,00</div>
        <div>
          <CoinsBar />
        </div>
        <div>
          <PackCoins />
        </div>
        <PaymentBar />

        <div>
          <button className={style.buttonBorderGreen} onClick={()=>this.validarModal()} >COMPRAR</button>
        </div>

        <div style={{ marginTop: "10px" }}>
          <Instructions />
        </div>
      </div>
    );
  }
}


Buy.propTypes = {
  openModal: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  // openModal: store.buy.packages || [],
  // loading: store.buy.loadingCoins
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    openModal
  }, dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps 
)(Buy);
