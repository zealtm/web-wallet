import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { openChat } from "../../redux/p2pAction";

// UTILS
import { formatDate } from "../../../../utils/numbers";

// MATERIAL
import { Grid, Avatar } from "@material-ui/core/";
import { ArrowForward } from "@material-ui/icons/";

// COMPONENTS
import StarVotes from "../starvotes";

// STYLE
import style from "./style.css";

class CardOffer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDetails: false
    };
  }

  handleDetails = () => {
    this.setState({
      ...this.state,
      openDetails: !this.state.openDetails
    });
  };

  openChat = id => {
    const { openChat } = this.props;

    openChat(id);
  };

  render() {
    const {order} = this.props;
    const { openDetails } = this.state;
    const dateCreate = formatDate(order.createdAt, "DM");
    const total = order.unitValue.brl * order.sell.amount;
    return (
      <div className={style.baseUser} onClick={this.handleDetails}>
        <Grid container>
          <Grid item xs={2}>
            <Avatar
              alt="avatar"
              src="images/lunio/lunio-user@100x100.jpg"
              className={style.avatar}
            />
          </Grid>
          <Grid item xs={5}>
            <span className={style.name}>{order.sell.user.name} {order.sell.user.surname}</span>
            <span className={style.textSmall}>{dateCreate}</span>
            <span className={style.numberText}>{order.sell.amount}</span>
            <span className={style.textSmall}>Oferta</span>
            <div className={style.offerText}>
              <img src={`images/icons/coins/${order.sell.coin}.png`} />
              {order.sell.coin}
            </div>
          </Grid>
          <Grid item xs={5} style={{ paddingLeft: 10 }}>
            <div className={style.boxStar}>
              <StarVotes votes={0} />
              <button className={style.btnClose}><img className={style.btnCloseImg} src="images/icons/p2p/btn-CloseP2p.png" alt="closep2p"/></button>
            </div>
            <span className={style.textSmall}>Unid. R$ {order.unitValue.brl.toFixed(2)}</span>
            <ArrowForward className={style.arrowPrice} />
            <span className={style.numberText}>R${total.toFixed(2)}</span>
            <span className={style.textSmall}>Vende</span>
            <div className={style.offerText}>
              <img src={`images/icons/coins/${order.buy.coin}.png`} />
            </div>
            <span className={style.hours}>00:00 am</span>
          </Grid>
          <Grid item xs={2} />
          <Grid
            item
            xs={10}
            className={style.boxDetails}
            style={openDetails ? { display: "block" } : null}
          >
            <div className={style.textDetails}>
              Pagamento em Real pelo BANCO INTER, SANTANDER OU NUBANK
            </div>
            <button
              className={style.btContinue}
              onClick={() => this.openChat(1)}
            >
              Negociar
            </button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

CardOffer.propTypes = {
  openChat: PropTypes.func.isRequired
};

const mapStateToProps = store => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ openChat }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardOffer);
