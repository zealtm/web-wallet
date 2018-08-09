import React, { Component } from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loadingGeneral } from "./redux/skeletonAction";

// COMPONENTS
import Loading from "../../components/loading";

// STYLE
import style from "./style.css";

class LoadingPage extends Component {
  

  
  render() {
    // let { loading } = this.props.skeleton
    // console.warn(loading)

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
  skeleton: PropTypes.object
};

const mapSateToProps = store => ({
  skeleton: store.skeleton
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadingGeneral
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(LoadingPage);
