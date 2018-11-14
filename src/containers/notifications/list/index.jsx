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
        <div className={style.contentItemTime} ><div className={style.radius}></div><div className={style.line}></div></div>
      );
    });
  }

  render() {
    return (
      <Grid container direction="row" justify="center">        
        <Grid item sm={12}>
          {this.renderNotifications()}
        </Grid>
      </Grid>
    );
  }
}

NotificationList.propTypes = {

}

export default NotificationList;
