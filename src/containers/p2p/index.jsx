import React from "react";
import PropTypes from "prop-types";

//REDUX
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {openChat} from "./redux/p2pAction";

//MATERIAL
import { Hidden } from "@material-ui/core/";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons/";

//COMPONENTS
import Offers from "./offers";
import TabIcons from "./components/tabicons";
import Modal from "../../components/modal";

import DepositModal from "./modal/deposit";
import InterestModal from "./modal/interest";
import UserProfile from "./userProfile";

import HeaderDetails  from "./components/headerdetails/index";

import MultiSelect from "./components/multiSelect";
//STYLE
import style from "./style.css";
import CreateOffer from "./createOffer";
import Chat from "./chat";

class P2P extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIcon: 0,
      openP2P: true,
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

    const contents = [
      <Offers key={1} />,
      <Offers key={2} />,
      <UserProfile key={3} />,
      <CreateOffer  key={4} />,
      ];
    return (contents[tabIcon] );
  };

  render() {
    const contentTabIcons = ["tag", "user-star", "newoffer", "user",];
    const {chatOpened} = this.props.p2pStore;
    const { openP2P } = this.state;

    const showBox = openP2P ? style.baseWidget : style.baseWidgetClose;

    return (
      <div className={showBox}>
        <Hidden smDown>
          <div className={style.headerP2P}>{this.renderArrow()}</div>
        </Hidden>

        {
          (chatOpened==false)?
            (
              <div>
                <div className={style.baseContent}>
                  {this.renderContent()}
                </div>
                <TabIcons content={contentTabIcons} handle={this.handleTabIcon} />
              </div>
            ) : (
              <Chat/>
            )
        }
      </div>
    );
  }
}

P2P.propTypes = {
  p2pStore:PropTypes.object.isRequired
};

const mapStateToProps = store => ({
  p2pStore: store.p2p
});

export default connect(
  mapStateToProps
)(P2P);
