import React from "react";

// LOCAL COMPONENTS
import Header from "../components/header";
import BoxChat from '../components/boxChat'

// GLOBAL COMPONENTS
import Loading from '../../../components/loading'

// STYLE
import style from "./style.css";

//FUNCTIONS
import { getChatBundle } from './functions'

class Chat extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    getChatBundle()
  }

  render() {
    return (
      <div className={style.baseChat} >

        <Header />

        <div className={style.callChat}>
          <BoxChat />
        </div>

        <div className={style.chatTarget} id={"chatTarget"}>
          <Loading/>
          {/*Chat will be rendered here when component mounts*/}
        </div>
      </div>
    );
  }
}


export default Chat;
