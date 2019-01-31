import React from "react";

// REDUX
import { connect } from "react-redux";
import { setModalSteps } from "./redux/depositAction";
import PropTypes from "prop-types";

// UTILS
import i18n from "../../utils/i18n";

// STYLE
import style from "./style.css";

// COMPONENTS
import Tabs from "../../components/tabs";
import Invoice from "./invoice";
import History from "./history";
import PayModal from "./modal/payModal";
import Modal from "../../components/modal";

// MATERIAL UI
import { Grid } from "@material-ui/core";
import { bindActionCreators } from "redux";

class Deposit extends React.Component {
  constructor() {
    super();

    this.state = {
      isOpen: false
    };
  }

  handleSteps = step => {
    const { setModalSteps } = this.props;

    if (step > 1) return setModalSteps(step - 1);
  };

  handleModal = () => {
    this.setState({ ...this.state, isOpen: !this.state.isOpen });
  };

  closeModal = () => {
    const { setModalSteps } = this.props;

    this.handleModal();
    setModalSteps(1);
  };

  render() {
    const { isOpen } = this.state;
    const { modalStep } = this.props;
    const titles = [
      i18n.t("DEPOSIT_TAB_TITLE"),
      i18n.t("DEPOSIT_TAB_HISTORY_TITLE")
    ];
    const contents = [
      <Invoice openModal={() => this.handleModal()} key={0} />,
      <History key={1} />
    ];
    return (
      <Grid container justify="center">
        <Modal
          title={i18n.t("DEPOSIT_INF_MODAL_HEADER")}
          content={<PayModal />}
          show={isOpen}
          close={() => this.closeModal()}
          back={() => this.handleSteps(modalStep)}
        />
        <Grid item xs={12} className={style.header}>
          <center>
            <h1>{i18n.t("DEPOSIT_HEADER_TITLE")}</h1>
            <p>{i18n.t("DEPOSIT_HEADER_SUBTITLE")}</p>
          </center>
        </Grid>
        <Tabs tabTitles={titles} tabContents={contents} justify="center" />
      </Grid>
    );
  }
}

Deposit.propTypes = {
  modalStep: PropTypes.number,
  setModalSteps: PropTypes.func
};

const mapStateToProps = store => ({
  modalStep: store.deposit.modalStep
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setModalSteps
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Deposit);
