import React, { Component } from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loadingGeneral, availableCoins, balanceCoins } from "./redux/skeletonAction";

// COMPONENTS
import Loading from "../../components/loading";

// STYLE
import style from "./style.css";

class LoadingPage extends Component {


  componentDidMount() {
    this.loadingInfos();
  }

  loadingInfos = () => {
    let { loading } = this.props.skeleton;
    let { availableCoins } = this.props;

    if (loading) {
      console.warn('1')
      availableCoins();
    }
  }

  render() {
    return (
      <div className={style.alignLoadingContainer}>
        <div className={style.itemsLoadingContainer}>
          <img src="../../images/logo.svg" className={style.logoLoading} />

          <div>
            <Loading color="lunes" width="30px" />
          </div>
        </div>
      </div>
    );
  }
}

LoadingPage.propTypes = {
  loadingGeneral: PropTypes.func,
  availableCoins: PropTypes.func,
  balanceCoins: PropTypes.func,
  skeleton: PropTypes.object
};

const mapSateToProps = store => ({
  skeleton: store.skeleton
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadingGeneral,
      availableCoins,
      balanceCoins
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(LoadingPage);
