import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setModalStep,openModal } from "./redux/buyAction";

// COMPONENTS
import Modal from "../../components/modal";
import Tabs from "../../components/tabs";
import Buy from "./components/buy";
import BuyModal from "./modal/buyModal";

// UTILS
import i18n from "../../utils/i18n";

// STYLE
import style from "./style.css";

class BuyCoins extends React.Component {
  constructor(props) {
    super(props);
  }

  closeModal(){
    const {setModalStep, openModal} = this.props;
    openModal(false);
    setModalStep(1);
  }

  render() {
    const {modalStep, setModalStep, modalOpen} = this.props;

    const titles = ["Comprar", "Historico"];
    const contents = [<Buy key={0} />, <div key={1}>Historico</div>];

    return (
      <div className={style.box}>
        <div className={style.header}>
          <h1>{i18n.t("BUYCOINS_TITLE")}</h1>
          <p>{i18n.t("BUYCOINS_DESCRIPTION")}</p>
        </div>

        <Tabs tabTitles={titles} tabContents={contents} justify="center" />

        <Modal
          title={i18n.t("BUYCOINS_TITLE")}
          content={<BuyModal />}
          show={modalOpen}
          close={
            modalStep === 1 || modalStep === 3 || modalStep === 4 ? ()=>this.closeModal() : null
          }
          back={
            modalStep === 2 ? () => setModalStep(modalStep-1) : null
          }
        />
      </div>
    );
  }
}

BuyCoins.propTypes = {
  modalStep: PropTypes.number.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  setModalStep: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  modalStep: store.buy.modalStep,
  modalOpen: store.buy.modalOpen,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    setModalStep, 
    openModal
  }, 
  dispatch
);

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(BuyCoins);
