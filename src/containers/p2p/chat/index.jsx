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
  }

  componentDidMount() {
    getChatBundle()
  }

  render() {
    const { openDeposit } = this.props.p2pStore;
    return (
      <div>
        {openDeposit == false ? (
          <div className={style.baseChat}>
            <Header />
            <div className={style.chatTarget} id={"chatTarget"}>
              <Loading/>
              {/*Chat will be rendered here when component mounts*/}
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
