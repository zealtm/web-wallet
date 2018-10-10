import React from "react";
import PropTypes from "prop-types";

//MATERIAL
import { Hidden } from "@material-ui/core/";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons/";

//COMPONENTS
import Tabs from "../../components/tabs";
import Offers from "./offers";
import TabIcons from "./components/tabicons";
//STYLE
import style from "./style.css";

class P2P extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIcon: 0,
      openP2P: true
    };
  }

  handleTabIcon = key => {
    this.setState({
      ...this.state,
      tabIcon: key
    });
  };

  handleP2P = () => {
    const { openP2P } = this.state;
    this.setState({
      ...this.state,
      openP2P: !openP2P
    });
  };

  renderArrow = () => {
    const { openP2P } = this.state;

    if (openP2P) {
      return (
        <KeyboardArrowDown
          className={style.arrowHeader}
          onClick={this.handleP2P}
        />
      );
    } else {
      return (
        <KeyboardArrowUp
          className={style.arrowHeader}
          onClick={this.handleP2P}
        />
      );
    }
  };

  renderContent = () => {
    const { tabIcon } = this.state;
    const titles = [["Comprar", "Vender"], ["Compras", "Vendas"]];
    const contents = [
      [<Offers key={1} />, <Offers key={2} />],
      [<Offers key={1} />, <Offers key={2} />]
    ];

    if (tabIcon == 2) {
      return <div>PERFIL USUARIO</div>;
    } else {
      return (
        <Tabs
          tabTitles={titles[tabIcon]}
          tabContents={contents[tabIcon]}
          justify="center"
        />
      );
    }
  };

  render() {
    const { openP2P } = this.state;
    const contentTabIcons = ["tag", "user", "user_star", "newoffer"];
    const showBox = openP2P ? style.baseWidget : style.baseWidgetClose;

    return (
      <div className={showBox}>
        <Hidden smDown>
          <div className={style.headerP2P}>{this.renderArrow()}</div>
        </Hidden>
        {this.renderContent()}
        <TabIcons content={contentTabIcons} handle={this.handleTabIcon} />
      </div>
    );
  }
}

P2P.propTypes = {};

export default P2P;
