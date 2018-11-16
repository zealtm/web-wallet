import React from "react";
import PropTypes from "prop-types";

// MATERIAL
import { Grid, Avatar,Radio,FormControlLabel,withStyles } from "@material-ui/core/";
import { ArrowForward, ArrowBack } from "@material-ui/icons/";

// COMPONENTS 
import Header from "../components/header";
import BoxChat from '../components/boxChat'
import CardOffer from '../components/cardOffer'


// STYLE
import style from "./style.css";

class Chat extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={style.baseChat} >

        <Header />

        <div className={style.callChat}>
         {/* <BoxChat /> */}
          
        </div>
      </div>
    );
  }
}

            

Chat.propTypes = {

};

export default Chat;
