import React from "react";
import PropTypes from "prop-types";

// COMPONENTS 

// STYLES 
import style from "./style.css";

class CardPack extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
        <img src="" />
        <hr />
        <p>
          texto aqui 
        </p>
        <h3>0.12345678</h3>
        <h2>
          <span>R$</span>
          30
          <span>,00</span>
        </h2>
      </div>
    )
  }
}

CardPack.propTypes = {

}

export default CardPack;