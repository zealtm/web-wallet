import React from "react";
import PropTypes from "prop-types";

// COMPONENTS 
import HistoryCard from "../historyCard";

// STYLE 
import style from "./style.css";

class History extends React.Component {

  renderHistory = () => {
    return [0,1,2,3].map((val,index)=>{
       return (
        <HistoryCard key={index} />
       )
    })
  }

  render(){
    return(
        <div className={style.boxContainer}>
          {this.renderHistory()}
        </div>
    )
  }
}

History.propTypes = {

};

export default History;