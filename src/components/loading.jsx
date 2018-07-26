import React, { Component } from "react";
import PropTypes from "prop-types";

/*
Component Props
color: string -    default: white / Options: "white", "purple", "lunes", "bitcoin"
width: string + "px" - default: "35px"
*/
// const style = {
//   "margin": "0 auto",
//   text
// }
const style = {
  justifyContent: "center",
  alignItems: "center",
  display: "flex"
};
class Loading extends Component {
  constructor(props) {
    super(props);
  }

  renderLoading = () => {
    let { color, width } = this.props;
    if (!color) color = "white";
    if (!width) width = "20px";

    return (
      <div style={style}>
        <img
          src={"images/icons/loading/loading-" + color + ".gif"}
          alt="Loading..."
          width={width}
        />
      </div>
    );
  };

  render() {
    return this.renderLoading();
  }
}

Loading.propTypes = {
  color: PropTypes.oneOf(["", "white", "purple", "lunes", "bitcoin"]),
  width: PropTypes.string
};

export default Loading;
