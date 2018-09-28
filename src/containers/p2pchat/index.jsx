import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {URL_CHAT} from "../../constants/apiBaseUrl";


class P2PChat extends React.Component {
  
  componentDidMount = () => {
    const {user} = this.props;
    
    const data = {user:{name: user.name, username: user.username}, to: "user_joker", token: "qwe123qwe123qwe"};

    this.ifr.onload = () => {
      this.ifr.contentWindow.postMessage(data, "*"); // verificar por que só aceita *
    }

  }

  render() {
    return (
      <div>
        <iframe 
        ref={(f) => this.ifr = f} 
        sandbox="allow-same-origin allow-scripts allow-forms"
        src={URL_CHAT}
        style={{border: 1, width:300, height:500, position: "absolute", right:"0", bottom:"0"}} >
        </iframe>
      </div>
    );
  }
}

P2PChat.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = store => (
  {
    user: store.user.user,
  }
);

export default connect(mapStateToProps)(P2PChat);
