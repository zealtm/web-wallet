import React from "react";
import PropTypes from "prop-types";

//MATERIAL 
import {Grid,Hidden} from "@material-ui/core/";
import {KeyboardArrowDown} from "@material-ui/icons/";

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
      openP2P: true,
    };
  }

  handleTabIcon = (key) => {
    this.setState({
      ...this.state, 
      tabIcon: key
    });
  }

  handleP2P = () => {
    const {openP2P} = this.state;
    this.setState({
      ...this.state, 
      openP2P: !openP2P
    });
  }

  render() {
    const {tabIcon,openP2P} = this.state;
    const titles = [["Comprar", "Vender"], ["Compras", "Vendas"]];
    const contents = [
      [<Offers key={1} />, <Offers key={2} />],
      [<Offers key={1} />, <Offers key={2} />]
    ];

    const contentTabIcons = ["icon1", "icon2", "icon3"];

    const showBox = (openP2P)?style.baseWidget:style.baseWidgetClose;

    return (
   
        <div className={showBox}>
          <Hidden smDown>
            <div className={style.headerP2P}>
              <KeyboardArrowDown className={style.arrowHeader} onClick={this.handleP2P} />
            </div>
          </Hidden>
          <Tabs tabTitles={titles[tabIcon]} tabContents={contents[tabIcon]} justify="center" />

          <TabIcons content={contentTabIcons} handle={this.handleTabIcon} />
        </div>
  
    );
  }
}

P2P.propTypes = {};

export default P2P;
