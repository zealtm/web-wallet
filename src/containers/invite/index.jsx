import React from "react";
import PropTypes from "prop-types";

// MATERIAL UI
import { Grid } from "@material-ui/core";

//COMPONENTS 
import ItemInvite from "./components/itemInvite";
import Modal from "../../components/modal";
import InviteSend from "./modal";

//STYLE 
import style from "./style.css";

class Invite extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      modalOpen: false
    }
  }

  handleModal = ()=> {
    const {modalOpen} = this.state;
    this.setState({
      ...this.state, 
      modalOpen: !modalOpen
    });
  }

  render(){
    const {modalOpen} = this.state;
    return (
      <div>
        <div className={style.header}>
          <h1>Convites</h1>
          <p>Convide seus amigos e familiares para se cadastrar na Lunes</p>
        </div>

        <Modal
          title="Convites enviados"
          content={<InviteSend />}
          show={modalOpen}
          close={this.handleModal}
        />
        
        <Grid container className={style.card}>
          <Grid item xs={12} sm={8}>
            <input type="text" name="txtemail" />
            <span>Link de compartilhamento</span>
            <span>12as3d45ads546asd456asd456asd546asd</span>
            <span>Copiar</span>
            <span>Compartilhar</span>
          </Grid>
          <Grid item xs={12} sm={4}>
            <button>Enviar</button>
            <button onClick={this.handleModal}>Convites enviados</button>
          </Grid>
        </Grid>
        
        <Grid container className={style.cardInviteConfirmation}>
          <Grid item xs={12}>
            <span>Convites confirmados</span>
          </Grid>
          <Grid item xs={12}>
            {
              [1,2,3,4,5].map(val=>{
                return (<ItemInvite />)
              })
            }
          </Grid>
        </Grid>
    
      </div>
    )
  }
}

Invite.propTypes = {
  //
};

export default Invite;