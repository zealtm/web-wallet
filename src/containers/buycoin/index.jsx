import React from "react";
import PropTypes from "prop-types";

// COMPONENTS 
import Tabs from "../../components/tabs";
import History from "./components/history";

// UTILS
import i18n from "../../utils/i18n";

// STYLE 
import style from "./style.css";

class BuyCoins extends React.Component {
  constructor(props){
    super(props);
  }

  render(){

    const titles = [
      "Comprar","Historico"
    ];
    
    const contents = [
      <div>
        <div>SCROLL DE MOEDAS</div>
        <div>CONTEUDO SCROLL DE VALORES</div>
      </div>, <History />
    ]

    return (
      <div>
        <div className={style.header}>
          <h1>{i18n.t("BUYCOINS_TITLE")}</h1>
          <p>{i18n.t("BUYCOINS_DESCRIPTION")}</p>
        </div>

        <Tabs tabTitles={titles} tabContents={contents} justify="center" />

      </div>
    )
  }
}

BuyCoins.propTypes = {

};

export default BuyCoins;