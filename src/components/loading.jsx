import React, { Component } from "react";
import PropTypes from "prop-types";

class Loading extends Component {
  constructor(props) {
    super(props);
  }

  renderLoading = () => {
    let { color, width } = this.props;
    if (!color) color = "white";
    if (!width) width = "35px";

    return (
      <img
        src={"images/icons/loading/loading-" + color +".gif"}
        alt="Loading..."
        width={width}
      />
    );
  };

  render() {
    return this.renderLoading();
  }
}

Loading.propTypes = {
  color: PropTypes.oneOf(["white", "purple", "lunes", "bitcoin"]).isRequired,
  width: PropTypes.string
};

export default Loading;
