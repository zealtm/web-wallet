import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setModalStep, openModal } from "../../p2p/redux/p2pAction";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

// STYLE
import style from "./style.css";

// UTILS
import i18n from "../../../utils/i18n";

// COMPONENTS
import ModalPayment from "./modal/index";
import Modal from "../../../components/modal";

class P2P extends React.Component {
  closeModal() {
    const { setModalStep, openModal } = this.props;
    openModal(false);
    setModalStep(1);
  }

  render() {
    const { modalOpen } = this.props;

    return (
      <div>
        <Modal
          content={<ModalPayment />}
          show={modalOpen}
          close={() => this.closeModal()}
        />

        <Grid item xs={12} className={style.containerHeaderSettings}>
          <Grid item xs={12} className={style.headerSettingsDefault}>
            <Hidden smUp>
              <Grid item xs={12}>
                <h3>{i18n.t("SETTINGS_P2P")} </h3>
              </Grid>
            </Hidden>
            <Grid item xs={2} />

            <Grid item xs={6} sm={2}>
              <Link to="settings">
                <p>{i18n.t("SETTING_LINK_RETURN")}</p>
              </Link>
            </Grid>
            <Hidden xsDown>
              <Grid item xs={12} sm={3}>
                <h3>{i18n.t("SETTINGS_P2P")}</h3>
              </Grid>
            </Hidden>

            <Grid item xs={10} sm={6} id={"hr"}>
              <hr />
            </Grid>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={9} className={style.plansDescription}>
            <h1>P2P</h1>
            <p>{i18n.t("P2P_PLANS_DESCRIPTION")}</p>
          </Grid>
        </Grid>

        <Grid container className={style.p2pContainer}>
          <Grid item>
            <div className={style.cardP2p}>
              <h1>{i18n.t("P2P_MONTHLY_SIGNATURE")}</h1>
              <img
                src="/images/icons/p2p/card.png"
                className={style.cardIcon}
              />
              <div className={style.hrCard} />
              <div className={style.cardTitle}>
                <p>{i18n.t("P2P_MONTHLY_SIGNATURE_DESCRIPTION")}</p>
              </div>
              <div className={style.valueCard}>
                <span className={style.dollarSign}>R$</span>{" "}
                <div className={style.containerValue}>
                  <span className={style.value}>00</span>{" "}
                  <span className={style.decimals}>,00</span>
                </div>
              </div>
            </div>
          </Grid>

          <Grid item>
            <div className={style.cardP2p}>
              <h1>{i18n.t("P2P_QUARTERLY_SIGNATURE")}</h1>
              <img
                src="/images/icons/p2p/card.png"
                className={style.cardIcon}
              />
              <div className={style.hrCard} />
              <div className={style.cardTitle}>
                <p>{i18n.t("P2P_QUARTERLY_SIGNATURE_DESCRIPTION")}</p>
              </div>
              <div className={style.valueCard}>
                <span className={style.dollarSign}>R$</span>{" "}
                <div className={style.containerValue}>
                  <span className={style.value}>00</span>{" "}
                  <span className={style.decimals}>,00</span>
                </div>
              </div>
            </div>
          </Grid>

          <Grid item>
            <div className={style.cardP2p}>
              <h1>{i18n.t("P2P_SEMESTER_SIGNATURE")}</h1>
              <img
                src="/images/icons/p2p/card.png"
                className={style.cardIcon}
              />
              <div className={style.hrCard} />
              <div className={style.cardTitle}>
                <p>{i18n.t("P2P_SEMESTER_SIGNATURE_DESCRIPTION")}</p>
              </div>
              <div className={style.valueCard}>
                <span className={style.dollarSign}>R$</span>{" "}
                <div className={style.containerValue}>
                  <span className={style.value}>00</span>{" "}
                  <span className={style.decimals}>,00</span>
                </div>
              </div>
            </div>
          </Grid>

          <Grid item>
            <div className={style.cardP2p}>
              <h1>{i18n.t("P2P_YEARLY_SIGNATURE")}</h1>
              <img
                src="/images/icons/p2p/card.png"
                className={style.cardIcon}
              />
              <div className={style.hrCard} />
              <div className={style.cardTitle}>
                <p>{i18n.t("P2P_YEARLY_SIGNATURE_DESCRIPTION")}</p>
              </div>
              <div className={style.valueCard}>
                <span className={style.dollarSign}>R$</span>{" "}
                <div className={style.containerValue}>
                  <span className={style.value}>00</span>{" "}
                  <span className={style.decimals}>,00</span>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

P2P.propTypes = {
  modalStep: PropTypes.number.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  setModalStep: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired
};
const mapStateToProps = store => ({
  modalStep: store.p2p.modalStep,
  modalOpen: store.p2p.modalOpen
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setModalStep,
      openModal
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(P2P);
