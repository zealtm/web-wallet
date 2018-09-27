import React from "react";
import PropTypes from "prop-types";

import NotificationItem from "./item";

// Style
import { Grid, Hidden } from "@material-ui/core";
import style from "./style.css";

class NotificationList extends React.Component {
  constructor() {
    super();
  }

  renderNotifications = () => {
    return [...Array(5).keys()].map((notification, id) => {
      return (
        <NotificationItem key={id} />
      );
    });
  }

  render() {
    return (
      <Grid container direction="row" justify="center">
        <Hidden smDown>
          <Grid item sm={3}>
            <ul>
              <li>COL-1</li>
              <li>COL-1</li>
              <li>COL-1</li>
              <li>COL-1</li>
              <li>COL-1</li>
              <li>COL-1</li>
              <li>COL-1</li>
              <li>COL-1</li>
            </ul>
          </Grid>
        </Hidden>
        <Grid item sm={9}>
          {this.renderNotifications()}
        </Grid>
      </Grid>
    );
  }
}

NotificationList.propTypes = {

}

export default NotificationList;
