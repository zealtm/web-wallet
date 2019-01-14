import React from "react";
import PropTypes from "prop-types";

// COMPONENTS
import Header from "../components/header";
import BoxChat from "../components/boxChat";
import DepositModal from "../modal/deposit";

//REDUX
import { connect } from "react-redux";

// STYLE
import style from "./style.css";

class Chat extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { openDeposit } = this.props.p2pStore;
    return (
      <div>
        {openDeposit == true ? (
          <DepositModal />
        ) : (
          <div className={style.baseChat}>
            <Header />
            <div className={style.callChat}>
              <BoxChat />
            </div>
          </div>
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


export default connect(
  mapStateToProps
)(Chat);
