import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";

// COMPONENTS
import Notification from "./notification";
import Loading from "../../components/loading";


import style from "./style.css";

class Notifications extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { loading } = this.props;

    return loading ? (
      <div>
        <Loading color="lunes" height="80vh" width="30px" />
      </div>
    ) : (
      <div className={style.container}>
        <Notification />
      </div>
    );
  }
}

Notifications.propTypes = {
  loading: PropTypes.bool.isRequired
}

const mapStateToProps = store => ({
  loading: store.notifications.loading,
  // notifications: store.notifications.notifications
})

export default connect(mapStateToProps)(Notifications);
