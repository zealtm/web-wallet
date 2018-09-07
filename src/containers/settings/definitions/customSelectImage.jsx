import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// MATERIAL 
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUp from "@material-ui/icons/KeyboardArrowUp";
import style from "./style.css";
import { getDefaultFiat, getDefaultCrypto } from "../../../utils/localStorage";

class CustomSelectImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      value: "",
    }
  }

  componentDidMount() {

    let { type } = this.props;
    let value = undefined;

    if (type === "fiat") {
      value = getDefaultFiat();
    } else {
      value = getDefaultCrypto();
    }

    this.setState({
      ...this.state,
      value
    });
  }

  handleSelect = (value) => {
    console.warn(value);
    this.setState({ open: !this.state.open });
  }

  selectItem = () => {

    this.handleSelect();
  };

  renderArrow() {
    if (this.state.open)
      return <KeyboardArrowUp className={style.arrowSelect} />

    return <KeyboardArrowDown className={style.arrowSelect} />
  }

  render() {
    let { action } = this.props;
    let { value } = this.state
    return (
      <div className={style.formBlock}>
        <button
          className={style.btSelect} onClick={(event) => this.handleSelect(event.target)}>
          <img src={"images/lang/" + value + ".png"} />
          {value || "USD"}
          {this.renderArrow()}
        </button>
        <div
          className={style.baseSelect}
          style={this.state.open ? { display: "block" } : { display: "none" }}
        >
          {action()}
        </div>
      </div>
    )
  }
}

CustomSelectImage.propTypes = {
  action: PropTypes.func.isRequired,
  coins: PropTypes.array,
  type: PropTypes.string
}

const mapStateToProps = store => ({
  coins: store.skeleton.coins,
  user: store.user.user
});

export default connect(
  mapStateToProps,
  null
)(CustomSelectImage);