import React from "react";
import PropTypes from "prop-types";

// MATERIAL UI
import { Grid } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

// STYLE
import style from "./style.css";

class ItemInvite extends React.Component {
  render() {
    return (
      <div>
        <Grid container>
          <Grid item xs={2}>
            <Avatar src="https://picsum.photos/30/30" />
          </Grid>
          <Grid item xs={10} sm={4}>
            <span className={style.spanTitle}>E-mail</span> <br />
            <span>email@email.com</span>
          </Grid>
          <Grid item xs={10} sm={4}>
            <span className={style.spanTitle}>Cupom</span> <br />
            <span>f5234s3f5v4sd3fg54v3df5g43d5fg43dsf53543</span>
          </Grid>
          <Grid item xs={2}>
            <img className={style.imgCopy} src="/images/icons/modal-receive/ic_copy@1x.png" />
          </Grid>
          <Grid item xs={12} sm={6} id={"hr"}>
            <hr />
          </Grid>
        </Grid>
      </div>
    );
  }
}

ItemInvite.propTypes = {
  //
};

export default ItemInvite;
