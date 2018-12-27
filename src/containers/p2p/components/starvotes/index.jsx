import React from "react";
import PropTypes from "prop-types";

// MATERIAL
import { Star } from "@material-ui/icons";

// STYLE
import style from "./style.css";

class StarVotes extends React.Component {
  renderStar = () => {
    const { votes } = this.props;

    return [1, 2, 3, 4, 5].map(val => {
      let type = val <= votes ? style.starActive : style.star;
      return <Star key={val} className={type} />;
    });
  };
  render() {
    return <div className={style.boxStar}>{this.renderStar()}</div>;
  }
}

StarVotes.propTypes = {
  votes: PropTypes.number.isRequired
};

export default StarVotes;
