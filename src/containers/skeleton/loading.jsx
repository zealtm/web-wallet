import React, { Component } from "react";

// COMPONENTS
import Loading from "../../components/loading";

// STYLE
import style from "./style.css";

class LoadingPage extends Component {

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

export default LoadingPage;
