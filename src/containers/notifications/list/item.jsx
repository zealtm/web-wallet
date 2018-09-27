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
    const img = "https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1";
    return (
      <div className={style.itemContainer}>
        <Grid container>
          <Grid item xs={1}>
            <div className={style.avatar}>
              <Avatar alt="Avatar" src={img} />
            </div>
          </Grid>
          <Grid item xs={2}>
            <div className={style.name}>
              <p>José Lucas</p>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={style.message}>
              <p className={style.title}>Tive um problem ao tentar transferir BTC</p>
              <p className={style.text}>Quando tento transferir BTC acontece um erro e a transação não é realizada</p>
            </div>
          </Grid>
          <Grid item xs={3}>
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
