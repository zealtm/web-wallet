import React from "react";
import PropTypes from "prop-types";

// STYLE
import { Grid } from "@material-ui/core";
import style from "./style.css";

class Notification extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Grid container direction="row" justify="center">
        <h1>Notification</h1>
      </Grid>
    );
  }
}

Notification.propTypes = {

}

export default Notification;
