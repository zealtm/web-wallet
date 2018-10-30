import React from "react";
import PropTypes from "prop-types";

// MATERIAL UI 
import { Grid } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

// STYLE 
import style from "./style.css";

class ItemInvite extends React.Component {
  render(){
    return (
      <div>
        <Grid container>
          <Grid item xs={2}>
            <Avatar src="https://picsum.photos/30/30" />
          </Grid>
          <Grid item xs={10} sm={4}>
            <span>E-mail</span>
            <span>email@email.com</span>
          </Grid>
          <Grid item xs={10} sm={4}>
            <span>E-mail</span>
            <span>email@email.com</span>
          </Grid>
          <Grid item xs={2}>
            BT_copiar
          </Grid>
        </Grid>
      </div>
    )
  }
}

ItemInvite.propTypes = {
  //
}

export default ItemInvite;