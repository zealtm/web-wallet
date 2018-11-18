import React from "react";

// COMPONENTS
import Header from "../components/header";
import BoxChat from '../components/boxChat'

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
          <BoxChat />
        </div>
      </div>
    );
  }
}


export default Chat;
