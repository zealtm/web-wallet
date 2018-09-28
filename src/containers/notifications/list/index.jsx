import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";

// COMPONENTS
import NotificationItem from "./item";

// Style
import { Grid, Hidden } from "@material-ui/core";
import style from "./style.css";

class NotificationList extends React.Component {
  constructor() {
    super();
  }

  renderNotifications = () => {
    const { notifications } = this.props;

    return notifications.map((notification, id) => {
      return (
        // TODO: passar os dados a serem exibidos como props
        <NotificationItem key={id} data={notification} />
      );
    });
  }

  // renderTimeline = () => {
  //   return
  // }

  render() {
    return (
      <Grid container direction="row" justify="center">
        <Hidden smDown>
          <Grid item sm={3}>

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
  notifications: PropTypes.array.isRequired,
}

const mapStateToProps = store => ({
  notifications: store.notifications.notifications
});

export default connect(mapStateToProps)(NotificationList);
