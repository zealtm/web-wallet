import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setModalStep } from "./redux/buyAction";

// COMPONENTS
import Modal from "../../components/modal";
import Tabs from "../../components/tabs";
import History from "./components/history";
import Buy from "./components/buy";
import BuyModal from "./modal/buyModal";

// UTILS
import i18n from "../../utils/i18n";

// STYLE
import style from "./style.css";

class BuyCoins extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }

  handleModal = () => this.setState({ isOpen: !this.state.isOpen });

  closeModal(){
    const {setModalStep} = this.props;
    this.handleModal();
    setModalStep(1);
  }

  render() {
    const {modalStep, setModalStep, modalOpen} = this.props;

    const titles = ["Comprar", "Historico"];
    const contents = [<Buy key={0} />, <History key={1} />];

    return (
      <div>
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
};

const mapStateToProps = store => ({
  modalStep: store.buy.modalStep,
  modalOpen: store.buy.modalOpen,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    setModalStep
  }, 
  dispatch
);

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(BuyCoins);
