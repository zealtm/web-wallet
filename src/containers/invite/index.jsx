import React from "react";
import PropTypes from "prop-types";

// MATERIAL UI
import { Grid, TextField, withStyles, Input } from "@material-ui/core";


// ICONS
import DateRange from '@material-ui/icons/DateRange';

//COMPONENTS 
import ItemInvite from "./components/itemInvite";
import Modal from "../../components/modal";
import InviteSend from "./modal";

//STYLE 
import style from "./style.css";
import colors from "../../components/bases/colors";

const inputStyle = {
  root: {
    color: colors.messages.info,
    margin: "0",
    padding: "5px",
    width: "calc(100% - 20px)",
    "&:hover:before": {
      borderBottomColor: colors.purple.dark
    }
  },
  cssInput: {
    fontFamily: "Noto Sans, sans-serif",
    fontSize: "17px",
    letterSpacing: "0.5px",
    textAlign: "center"
  },
  cssUnderline: {
    "&:before, &:after": {
      borderBottomColor: colors.purple.dark
    },
    "&:hover:not($disabled):not($error):not($focused):before": {
      borderBottomColor: `${colors.purple.dark} !important`
    }
  },
  disabled: {},
  error: {},
  focused: {}
};

class Invite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    }
  }

  handleModal = () => {
    const { modalOpen } = this.state;
    this.setState({
      ...this.state,
      modalOpen: !modalOpen
    });
  }

  render() {
    const { classes } = this.props;
    const { modalOpen } = this.state;
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
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <DateRange className={style.icon} />
            </Grid>
            <Grid item>
              <Input placeholder="Lunes@gmail.com" classes={{
                root: classes.root,
                underline: classes.cssUnderline,
                input: classes.cssInput
              }} />
            </Grid>
          </Grid>

          <Grid item xs={12} sm={8}>
            <span> Link de compartilhamento</span>
            <span>12as3d45ads546asd456asd456asd546asd</span>
            <span>Copiar</span>
            <span>Compartilhar</span>
          </Grid>
          <Grid item xs={12} sm={4}>
            <button>Enviar</button>
            <button onClick={this.handleModal}>Convites enviados</button>
          </Grid>
        </Grid>

        <Grid container className={style.card}>
          <Grid item xs={12}>
            <span>Convites confirmados</span>
          </Grid>
          <Grid item xs={12}>
            {
              [1, 2, 3, 4, 5].map(val => {
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
  classes: PropTypes.object.isRequired
};

export default withStyles(inputStyle)(Invite);