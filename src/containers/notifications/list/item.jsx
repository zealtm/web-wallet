import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// STYLE
import { Grid, Avatar } from "@material-ui/core";
import style from "./style.css";

class NotificationItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // TODO: pegar imagem que vier da API
    const {notification} = this.props;
    return (
      <div className={style.itemContainer}>
        <Grid container>
          <Grid item xs={4} md={1}>
            <div className={style.avatar}>
              <Avatar alt="Avatar" src={img} />
            </div>
          </Grid>
          <Grid item xs={8} md={2}>
            <div className={style.name}>
              <p>José Lucas</p>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className={style.message}>
              <p className={style.title}>Tive um problem ao tentar transferir BTC</p>
              <p className={style.text}>Quando tento transferir BTC acontece um erro e a transação não é realizada</p>
            </div>
          </Grid>
          <Grid item xs={12} md={3}>
            <div className={style.right}>
              <p className={style.greenText}>http://lunes.io</p>
              <p className={style.time}>4h</p>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

NotificationItem.propTypes = {

}

const mapStateToProps = store => ({

});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NotificationItem);
