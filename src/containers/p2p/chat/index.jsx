import React from "react";
import PropTypes from "prop-types";

// COMPONENTS
import Header from "../components/header";
import BoxChat from "../components/boxChat";
import DepositModal from "../modal/deposit";

//REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

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
        {openDeposit == false ? (
          <div className={style.baseChat}>
            <Header />
            <div className={style.callChat}>
              <BoxChat />
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
