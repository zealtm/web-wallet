import React from "react";
import PropTypes from "prop-types";

//UTILS
import i18n from "../../utils/i18n";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";

// STYLE
import style from "./style.css";
class Notification extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Grid container direction="row" justify="center">
        <h1>{i18n.t("NOTIFICATION_NUMBER_OF_NOTIFICATION")}</h1>
        <div className={style.hr} />
        <div>
          <img
            src="images/lunio/lunio-error@1x.gif"
            className={style.imgNoNotification}
          />
          <div className={style.paragraphs}>
            <p>
              {i18n.t("NOTIFICATION_MESSAGE_1")} <br />{" "}
              {i18n.t("NOTIFICATION_MESSAGE_2")}
            </p>
          </div>
        </div>
      </Grid>
    );
  }
}

Notification.propTypes = {};

export default Notification;
