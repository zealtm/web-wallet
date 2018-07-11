import React, { Component } from "react";
import PropTypes from "prop-types";
import { Transaction } from "react-transition-group";

// STYLE
import Style from "./style.css";

class SlidePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentContent: 0
    };
  }

  nextContent() {
    const { content } = this.props;
    if (content[this.state.currentContent + 1]) {
      return this.setState({ currentContent: this.state.currentContent + 1 });
    }

    return;
  }

  render() {
    const { content } = this.props;
    const { currentContent } = this.state;

    return (
      <div>
        <div className={Style.transaction}>
          <Transaction transitionName="example">
            {content[currentContent]}
          </Transaction>
        </div>
        <button onClick={() => this.nextContent()}> TROCAR </button>
      </div>
    );
  }
}

SlidePage.propTypes = {
  content: PropTypes.array.isRequired
};

export default SlidePage;
