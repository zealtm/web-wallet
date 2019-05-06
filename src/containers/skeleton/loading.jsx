import React, { Component } from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loadGeneralInfo, availableCoins } from "./redux/skeletonAction";

// COMPONENTS
import Loading from "../../components/loading";
import LogoLunes from "../../components/logoLunes";
// STYLE
import style from "./style.css";

class LoadingPage extends Component {
  componentDidMount() {
    this.loadingInfos();
  }

  loadingInfos = () => {
    let { loading } = this.props.skeleton;
    let { loadGeneralInfo, availableCoins } = this.props;
    let { password } = this.props.user;

    if (loading) {
      availableCoins(password);
     // loadGeneralInfo(password);
    }
  };

  render() {
    return (
      <div className={style.alignLoadingContainer}>
        <div className={style.itemsLoadingContainer}>
          <center>
            <LogoLunes large />
          </center>

          <div>
            <Loading color="general" width="300px" />
          </div>
        </div>
      </div>
    );
  }
}

LoadingPage.propTypes = {
  loadGeneralInfo: PropTypes.func,
  availableCoins: PropTypes.func,
  skeleton: PropTypes.object,
  user: PropTypes.object
};

const mapSateToProps = store => ({
  skeleton: store.skeleton,
  user: store.user.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadGeneralInfo,
      availableCoins
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(LoadingPage);
