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
      bundleCalled: false
    }
    let { chatDetails } = props.p2pStore
    let { typeOfUser } = chatDetails
    if (typeOfUser === 'buyer')
      this.callChatBundle()
  }
  componentDidUpdate() {
    this.callChatBundle()
  }
  chatTargetContent = (chatTargetContent) => {
    this.setState({chatTargetContent})
  }
  callChatBundle = () => {
    if (this.state.bundleCalled) return;
    let { chatDetails } = this.props.p2pStore
    let { seller, buyer, currentOrder } = chatDetails
    if (!buyer || (buyer && !buyer.id)) return;
    let { id: buyerId } = buyer
    let { id: adOwnerId } = seller
    let { id: adId } = currentOrder
    getChatBundle({adId, adOwnerId, buyerId})
    this.setState({bundleCalled: true})
    this.chatTargetContent(<Loading/>)
  }

  render() {
    const { openDeposit } = this.props.p2pStore;
    return (
      <div>
        {openDeposit == false ? (
          <div className={style.baseChat}>
            <Header />
            <div className={style.chatTarget+' chatTarget'} id={"chatTarget"}>
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
