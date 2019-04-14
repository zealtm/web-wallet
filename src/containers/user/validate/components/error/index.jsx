import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// UTILS
import i18n from "../../../../../utils/i18n";

// COMPONENTS
//import Footer from "../footer";

// STYLE
import style from "./style.css";

class Error extends React.Component {
  render() {
    return (
      <div className={style.baseMessage}>
        <img
          src="../../images/icons/error/imgMessageErro.png"
          className={style.icon}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapDispatchToProps)(Error);
