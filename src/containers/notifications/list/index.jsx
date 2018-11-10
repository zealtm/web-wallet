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
  renderTimes = () => {
    return [...Array(5).keys()].map((notification, id) => {
      return (
        <li><div className= {style.line}></div><div className= {style.radius}></div><div className= {style.line}></div></li>
      );
    });
  }

  render() {
    return (
      <Grid container direction="row" justify="center">
        <Hidden smDown>
          <Grid item sm={3}>
            <ul>
             {this.renderTimes()}
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
