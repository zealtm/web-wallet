import React from "react";
import PropTypes from "prop-types";

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
    this.state = {
      isOpen: true
    }
  }

  handleModal = () => this.setState({ isOpen: !this.state.isOpen });

  closeModal(){
    //const {setModalStep} = this.props;
    this.handleModal();
    //setModalStep(1);
  }

  render() {
    const {isOpen} = this.state;
    const titles = ["Comprar", "Historico"];
    const contents = [<Buy key={0} />, <div key={1}>Historico</div>];

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
          show={isOpen}
          close={()=>this.closeModal()}
          back={() => alert("voltar")}
        />
      </div>
    );
  }
}

BuyCoins.propTypes = {};

export default BuyCoins;
