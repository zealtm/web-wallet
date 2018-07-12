import React, { Component } from "react";
import PropTypes from "prop-types";
import { Transition } from "react-transition-group";

// STYLE
import style from "./style.css";

class SlidePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { content, step } = this.props;

    return (
      <div>
        <div>
          <Transition
            entering={style.starEnter}
            entered={style.starEnterActive}
            exiting={style.starExit}
            exited={style.starExitActive}
            timeout={1000}
          >
            {content[step]}
          </Transition>
        </div>
      </div>
    );
  }
}

SlidePage.propTypes = {
  content: PropTypes.array.isRequired,
  step: PropTypes.number.isRequired
};

export default SlidePage;
