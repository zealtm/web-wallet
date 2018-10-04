import React from "react";
import PropTypes from "prop-types";

//MATERIAL
import Grid from "@material-ui/core/Grid";
import { Hidden } from "@material-ui/core/";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons/";
import Avatar from "@material-ui/core/Avatar";

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
      return (
        <div>
          <Grid container className={style.boxContainer}>
            <Grid item xs={12} sm={12}>
              <div className={style.cardProfile}>
                <div className={style.userInfo}>
                  <Avatar
                    src={"images/lunio/lunio-user@100x100.jpg"}
                    className={style.avatar}
                  />
                  <p className={style.userName}>Felipe Mendes</p>
                </div>
              </div>
            </Grid>

            <Grid item xs={12} sm={12}>
              <div className={style.cardProfile}>
                
              </div>
            </Grid>

            <Grid item xs={12} sm={12}>
              <div className={style.cardProfile}>
                
              </div>
            </Grid>
          </Grid>
        </div>
      );
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
    const contentTabIcons = ["tag", "user", "user_star"];
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
