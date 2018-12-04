import React from "react";
import PropTypes from "prop-types";

// LOCAL COMPONENTS
import Header from "../components/header";
import DepositModal from "../modal/deposit";

//REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// GLOBAL COMPONENTS
import Loading from '../../../components/loading'

// STYLE
import style from "./style.css";

//FUNCTIONS
import { getChatBundle } from './functions'

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatTargetContent: undefined,
      bundleCalled: false,
      lastAdOwnerId: -1,
      lastBuyerId: -1
    }
  }
  componentDidMount() {
    console.warn("ESTOU CHAMANDO O BUNDLE")
    this.callChatBundle()
  }
  componentDidUpdate() {
    let { typeOfUser,  buyer} = this.props.p2pStore.chatDetails
    if ((typeOfUser === 'seller' && buyer) && this.state.bundleAlreadyCalled === false) {
      console.warn("COMPONENT DID UPDATE", this.props.p2pStore.chatDetails)
      this.setState({bundleAlreadyCalled: true})
      this.callChatBundle()
    }
  }
  callChatBundle = () => {
    let { chatDetails } = this.props.p2pStore
    let { typeOfUser } = chatDetails
    let { seller, buyer, currentOrder } = chatDetails
    if (!buyer || (buyer && !buyer.id)) return;
    let { id: buyerId } = buyer
    let { id: adOwnerId } = seller
    let { id: adId } = currentOrder
    if (typeOfUser === 'buyer') {
      getChatBundle({adId, adOwnerId, buyerId})
      this.setState({chatTargetContent: <Loading/>})
    } else {
      console.warn('SELLER <<<<')
      //TODO i18n
      this.setState({chatTargetContent: <h1>Select an user above</h1>})
    }
  }

  render() {
    const { openDeposit } = this.props.p2pStore;
    return (
      <div>
        {openDeposit == false ? (
          <div className={style.baseChat}>
            <Header />
            <div className={style.chatTarget+' chatTarget'} id={"chatTarget"}>
              {this.state.chatTargetContent}
              {/*Chat will be rendered here, and loading will be removed*/}
            </div>
          </div>
        ) : (
          <DepositModal />
        )}
      </div>
    );
  }
}

Chat.propTypes = {
  p2pStore: PropTypes.object.isRequired
};

const mapStateToProps = store => ({
  p2pStore: store.p2p
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
