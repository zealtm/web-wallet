import React from "react";

// REDUX 
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {nomeDaFuncao,funcaoApiTeste} from "./redux/paymentAction";

// UTILS
import i18n from "../../utils/i18n";

// COMPONENTS
import Modal from "../../components/modal";
import PaymentTitleModal from "./modal/paymentTitleModal";

class Payment extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: true
    }
  }
  handleModal = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    let { isOpen } = this.state;

    // teste redux
    let {nomeDaFuncao, funcaoApiTeste, payload} = this.props;

    return (
      <div>

      {JSON.stringify(payload)}
      <button onClick={()=>funcaoApiTeste()}>Teste redux</button>

        <Modal
          title={i18n.t("PAYMENT_MODAL_TITLE")}
          content={<PaymentTitleModal />}
          show={isOpen}
          // close={() => this.handleModal()}
          back={()=>this.handleModal()}
        />
      </div>
    )
  }
}

//export default Payment;

const mapStateToProps = store => ({
  payload: store.payment.payload
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    nomeDaFuncao, 
    funcaoApiTeste
  }, 
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Payment);