import React from "react";
import PropTypes from "prop-types";

// MATERIAL

// COMPONENTS 
import Header from "../components/header";

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
          base conversa
        </div>

      </div>
    );
  }
}

Chat.propTypes = {

};

export default Chat;
