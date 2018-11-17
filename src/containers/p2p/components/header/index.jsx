import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { closeChat } from "../../redux/p2pAction";

// MATERIAL UI
import { Grid } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { Star, FavoriteBorder, ArrowForward } from "@material-ui/icons/";
import { ArrowBack } from "@material-ui/icons/";
import { KeyboardArrowDown } from "@material-ui/icons";

// COMPONENTS
import StarVotes from "../starvotes";
import HeaderDetails from "../headerdetails/index";

import UserProfile from "../../userProfile"
// STYLE
import style from "./style.css";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHeaderDetails: false,
      arrowDown: true,
      showPerfil: false
    };
  }
  onClickPerfil(){
    this.setState({ showPerfil: !this.state.showPerfil });
  }
  closeChat = () => {
    const { closeChat } = this.props;
    closeChat();
  };

  showHeaderDetails = () => {
    this.setState({
      showHeaderDetails: !this.state.showHeaderDetails,
      arrowDown: !this.state.arrowDown
    });
  };
  renderPerfil(){
    return (<UserProfile />);
  }
  render() {
    let {showPerfil} = this.state;
    if(showPerfil){
      return (
        this.renderPerfil()
      );
    } 
    return (
      <div className={style.topBar}>
        <div className={style.header}>
          <Grid container>
            <Grid item xs={1}>
              <ArrowBack className={style.arrowBack} onClick={this.closeChat} />
            </Grid>
            <Grid item xs={2}>
              <Avatar
                alt="Avatar"
                className={style.avatar}
                src={"images/lunio/lunio-user@100x100.jpg"}
              />
            </Grid>
            <Grid item xl={4}>
              <span className={style.textGreen} onClick={()=>this.onClickPerfil()} >Ricardo Lopez</span>
              <span className={style.textSmall}>00/00/2018</span>
            </Grid>
            <Grid item xl={4} style={{ paddingLeft: 10 }}>
              <div className={style.boxStar}>
                <StarVotes votes={3} />
              </div>
            </Grid>

            <Grid item xs={1}>
              <FavoriteBorder className={style.fav} />
            </Grid>

            <Grid item xs={3} />
            <Grid item xs={4}>
              <div className={style.card}>200.00000</div>
            </Grid>
            <Grid item xs={1}>
              <ArrowForward className={style.arrowPrice} />
            </Grid>
            <Grid item xs={4}>
              <div className={style.card}>R$650,00</div>
            </Grid>
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="flex-end"
            >
              {this.state.arrowDown && (
                <KeyboardArrowDown
                  onClick={this.showHeaderDetails}
                  className={style.arrowDown}
                />
              )}
            </Grid>
          </Grid>
          {this.state.showHeaderDetails && (
            <HeaderDetails showHeaderDetails={this.showHeaderDetails} />
          )}
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  closeChat: PropTypes.func.isRequired
};

const mapStateToProps = store => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ closeChat }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
