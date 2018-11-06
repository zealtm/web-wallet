import React from "react";
import PropTypes from "prop-types";

// MATERIAL UI
import { Grid, withStyles, Input } from "@material-ui/core";

// UTILS
import i18n from "../../utils/i18n";

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
          <h1>{i18n.t("INVITE_TITLE_INVITE")}</h1>
          <p>{i18n.t("INVITE_TEXT_1")}</p>
        </div>

        <Modal 
          title="Convites enviados" 
          content={<InviteSend />} 
          show={modalOpen} 
          close={this.handleModal} 
        />

        <Grid container className={style.card}>
          <Grid item xs={12} sm={8}>
            <Grid container spacing={8} alignItems="flex-end">
              <Grid item>
                <img src="/images/icons/email/email@1x.png" className={style.icon} />
              </Grid>
              <Grid item>
              <Input placeholder="Lunes@gmail.com" classes={{
                root: classes.root,
                underline: classes.cssUnderline,
                input: classes.cssInput
              }} />
            </Grid>
            </Grid>
            <div className={style.linkTitle}>
              <p>{i18n.t("INVITE_LINK_SHARE")}</p>
            </div>
            <div className={style.linkShared}>
              <p>12as3d45ads546asd456asd456asd546asd</p>
            </div>
            <div className={style.copyIcon}>
              <img src="/images/icons/modal-receive/ic_copy@1x.png" />
              <p>{i18n.t("INVITE_COPY_BUTTON")}</p>
            </div>
            <div className={style.shareIcon}>  
              <img src="/images/icons/invite/share@1x.png" />
              <p>{i18n.t("INVITE_SHARE_BUTTON")}</p>
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <div className={style.boxButtons}>
              <button className={style.btnInviteSent}>{i18n.t("INVITE_BUTTON_SEND")}</button>
              <button onClick={this.handleModal} className={style.btnInviteSent2}>{i18n.t("INVITE_SEND_INVITATIONS")}</button>
            </div>
          </Grid>
        </Grid>

        <Grid container className={style.card}>
          <Grid item xs={12}>
            <span className={style.label}>{i18n.t("INVITE_CONFIRMED_INVITATIONS")}</span>
          </Grid>
          <Grid item xs={12}>
            {[1, 2, 3, 4, 5].map(val=>{
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