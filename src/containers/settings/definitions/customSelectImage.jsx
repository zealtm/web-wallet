import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// MATERIAL 
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUp from "@material-ui/icons/KeyboardArrowUp";

import style from "./style.css";

class CustomSelectImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  handleSelect = () => {
    this.setState({ open: !this.state.open });
  }

  selectItem = () => {
    this.handleSelect();
  }

  renderSelect = () => {
    let { coins } = this.props;
    console.warn(coins);
    // return coins.map((coin, index) => (
    //   <div onClick={this.selectItem}>
    //     <img src='images/lang/brasil.png' />
    //     item selecionar
    // </div>
    // ))
  };

  renderArrow() {
    if (this.state.open)
      return <KeyboardArrowUp className={style.arrowSelect} />

    return <KeyboardArrowDown className={style.arrowSelect} />
  }

  render() {
    return (
      <div className={style.formBlock}>
        <button
          className={style.btSelect} onClick={() => this.handleSelect()}>
          <img src='images/lang/brasil.png' /> item
          {this.renderArrow()}
        </button>
        <div
          className={style.baseSelect}
          style={this.state.open ? { display: "block" } : { display: "none" }}
        >
          {/* popular com um props  */}
          <div onClick={this.selectItem}>
            <img src='images/lang/brasil.png' />
            item selecionar
          </div>
        </div>
      </div>
    )
  }
}

CustomSelectImage.propTypes = {
  action: PropTypes.func.isRequired,
  coins: PropTypes.array
}

const mapStateToProps = store => ({
  coins: store.skeleton.coins,
  user: store.user.user
});

export default connect(
  mapStateToProps,
  null
)(CustomSelectImage);