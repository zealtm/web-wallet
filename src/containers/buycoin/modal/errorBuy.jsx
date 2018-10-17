import React from "react";
import PropTypes from "prop-types";

// REDUX
import {connect} from "react-redux";

// UTILS
import i18n from "../../../utils/i18n";

// COMPONENTS 
import Loading from "../../../components/loading";

// STYLES
import style from "./style.css";

class ErrorBuy extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    //const {loading} = this.props;
    const loading = false;
    if(loading){
      return (
        <div className={style.modalBox}>
          <Loading color="lunes" />
        </div>
      )
    }else{
      return (
        <div className={style.modalBox}>
          <img
            src="/images/icons/error/error.png"
            className={style.imageResult}
          />
          <div>
            {i18n.t("BUYCOINS_INFO_ERROR")}
          </div>
        </div>
      );
    }
  }
}

ErrorBuy.propTypes = {
  //loading: PropTypes.bool.isRequired
}

export default ErrorBuy;
