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
import Tabs from "../../components/tabs";
import BankSlip from "./bankSlip";
import History from "./history";

// STYLE
import style from "./style.css";

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

    const titles = [i18n.t("PAYMENT_BANK_SLIP"), i18n.t("PAYMENT_HISTORY")];
    const contents = [<BankSlip />, <History />]

    return (
      <div>
        <div className={style.header}>
          <h1>{i18n.t("PAYMENT_HEADER_TITLE")}</h1>
          <p>{i18n.t("PAYMENT_HEADER_SUBTITLE")}</p>
        </div>
        <Tabs tabTitles={titles} tabContents={contents} justify="center" />

        <Modal
          title={i18n.t("PAYMENT_MODAL_TITLE")}
          content={<PaymentTitleModal />}
          show={isOpen}
          // close={() => this.handleModal()}
          back={()=>this.handleModal()}
        />
      </div>
    );
  }
}

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
