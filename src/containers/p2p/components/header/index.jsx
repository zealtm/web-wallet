import React from "react";
import PropTypes from "prop-types";

// REDUX
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {closeChat} from "../../redux/p2pAction";

// MATERIAL UI
import { Grid } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { FavoriteBorder, ArrowForward  } from "@material-ui/icons/";
import { ArrowBack } from "@material-ui/icons/";

// COMPONENTS
import StarVotes from "../starvotes";

// STYLE
import style from "./style.css";

class Header extends React.Component {
    closeChat = () => {
      const { closeChat } = this.props;
      closeChat();
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className={style.topBar} >
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
                    <span className={style.textGreen}>Ricardo Lopez</span>
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

                  <Grid item xs={3}></Grid>
                  <Grid item xs={4}>
                    <div className={style.card}>200.00000</div>
                  </Grid>
                  <Grid item xs={1}>
                    <ArrowForward className={style.arrowPrice} />
                  </Grid>
                  <Grid item xs={4}>
                    <div className={style.card}>R$650,00</div>
                  </Grid>

                </Grid>

              </div>

            </div>
        );
    }
}

Header.propTypes = {
    closeChat: PropTypes.func.isRequired
}

const mapStateToProps = () => ({

});

const mapDispatchToProps = dispatch =>
bindActionCreators(
    {closeChat},dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
