import React from "react";
import PropTypes from "prop-types";

// STYLE
import style from "./style.css";

class TabIcons extends React.Component {
  render(){
    const {content,handle} = this.props;
    
    return (
      <div className={style.baseTab}>
        {
          content.map((val,key)=>{
            return <div key={key} onClick={()=>handle(key)} className={style.itemTab}>{val}</div>
          })
        }
      </div>
    )
  }
}

TabIcons.propTypes = {
  content: PropTypes.array.isRequired
};

export default TabIcons;