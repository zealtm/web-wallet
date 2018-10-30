import React from "react";
import PropTypes from "prop-types";

// STYLE
import style from "./style.css";

// COMPONENTS
import ItemInvite from "../components/itemInvite";

class InviteSend extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {
          [1,2,3,4,5].map(val=>{
            return (<ItemInvite />)
          })
        }
      </div>
    )
  }
}

InviteSend.propTypes = {
  //
};

export default InviteSend;