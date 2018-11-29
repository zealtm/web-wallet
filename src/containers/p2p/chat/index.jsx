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
    this.callChatBundle()
  }
  callChatBundle = () => {
    let { userId: buyerId, chat } = this.props.p2pStore
    let { iduser: ad } = chat
    let { id: adId } = ad
    let { id: adOwnerId } = ad.sell.user
    getChatBundle({adId, adOwnerId, buyerId})
    // let typeOfChatUser; //eslint-disable-line
    // if (buyerId === adOwnerId)
    //   typeOfChatUser = 'buyer'
    // else
    //   typeOfChatUser = 'seller'
    // if (typeOfChatUser === 'buyer') {
    //   getChatBundle({adId, adOwnerId, buyerId})
    // } else if (typeOfChatUser === 'seller') {
    //   getChatBundle({adId, adOwnerId, buyerId})
    // } else {
    //   alert('Whe need a buyer or a seller id at least')
    // }
  }

  render() {
    const { openDeposit } = this.props.p2pStore;
    return (
      <div>
        {openDeposit == false ? (
          <div className={style.baseChat}>
            <Header />
            <div className={style.chatTarget+' chatTarget'} id={"chatTarget"}>
              <Loading/>
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
