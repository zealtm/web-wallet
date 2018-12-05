import React from "react";
import PropTypes from "prop-types";

//REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getPaymentMethodsWhenBuying } from "./redux/p2pAction";

//MATERIAL
import { Hidden } from "@material-ui/core/";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons/";

//COMPONENTS
import Offers from "./offers";
import TabIcons from "./components/tabicons";
import ConfirmModal from "./modal/confirm";

//STYLE
import style from "./style.css";
import CreateOffer from "./createOffer";
import Chat from "./chat";

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

    const contents = [
      <Offers key={1} type="general" />,
      <Offers key={2} type="myhistory" />,
      //<UserProfile key={3} />,
      <CreateOffer key={4} />
    ];
    return contents[tabIcon];
  };

  componentDidMount = () => {
    const { getPaymentMethodsWhenBuying } = this.props;
    getPaymentMethodsWhenBuying("lunes");
  };

  render() {
    const contentTabIcons = ["tag", "user-star", "newoffer", /*"user"*/];
    const { chatOpened, openAvaliation } = this.props.p2pStore;
    const { openP2P } = this.state;

    const showBox = openP2P ? style.baseWidget : style.baseWidgetClose;
    
    return (
      <div className={showBox}>
        {/* <Hidden smDown>
          
        </Hidden> */}
        <div className={style.headerP2P}>{this.renderArrow()}</div>

        {chatOpened == false ? (
          <div>
            <div className={style.baseContent}>{this.renderContent()}</div>
            <TabIcons content={contentTabIcons} handle={this.handleTabIcon} />
          </div>
        ) : openAvaliation == true ? (
          <ConfirmModal />
        ) : (
          <div>
            <Chat />
          </div>
        )}
      </div>
    );
  }
}

P2P.propTypes = {
  p2pStore: PropTypes.object.isRequired,
  getPaymentMethodsWhenBuying: PropTypes.func
};

const mapStateToProps = store => ({
  p2pStore: store.p2p
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getPaymentMethodsWhenBuying
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(P2P);
