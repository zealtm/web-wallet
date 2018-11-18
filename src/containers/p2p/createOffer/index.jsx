import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createOfferWhenSelling } from "../redux/p2pAction";

// MATERIAL
import {
  Grid,
  Avatar,
  Radio,
  withStyles,
  FormControlLabel
} from "@material-ui/core/";
import { ArrowForward, ArrowBack } from "@material-ui/icons/";

// ICONS
import { Lens } from "@material-ui/icons";

// COMPONENTS
import Select from "../../../components/select";
import StarVotes from "../components/starvotes";
import MultiSelect from "../components/multiSelect";

// STYLE
import style from "./style.css";

const stylesCustom = {
  root: {
    color: "#654fa4",
    "&$checked": {
      color: "#68f285"
    }
  },
  rootLabel: {
    fontSize: "11px",
    color: "#fff"
  },
  checked: {
    color: "#68f285"
  }
};

class CreateOffer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Lunes",
      img: "images/icons/coins/lunes.png",
      coinsExample: [
        {
          value: "BTC",
          img: "images/icons/coins/btc.png",
          title: "BTC"
        },
        {
          value: "LTC",
          img: "images/icons/coins/ltc.png",
          title: "LTC"
        },
        {
          value: "LUNES",
          img: "images/icons/coins/lunes.png",
          title: "Lunes"
        }
      ],
      listCoinSelects: [],
      selectedValue: "",

      order: {
        coin: "",
        type: "",
        paymentMethodId: "",
        amount: "",
        amountPayment: "",
        addressSeller: ""
      }
    };
  }

  selectItems = listCoins => {
    this.setState({
      ...this.state,
      listCoinSelects: listCoins
    });
  };

  coinSelected = (value, title, img = undefined) => {
    this.setState({
      ...this.state,
      coin: {
        name: title,
        value,
        img
      }
    });
  };

  handleChange = event => {
    this.setState({
      ...this.state,
      order: {
        ...this.state.order,
        type: event.target.value
      },
      selectedValue: event.target.value
    });
  };

  handleFields = e => {
    const { name, value } = e.target;

    switch (name) {
      case "coin":
        this.setState({
          ...this.state,
          coin: value
        });
        break;
      case "type":
        this.setState({
          ...this.state,
          type: value
        });
        break;
      case "paymentMethodId":
        this.setState({
          ...this.state,
          paymentMethodId: value
        });
        break;
      case "amount":
        this.setState({
          ...this.state,
          amount: value
        });
        break;
      case "amountPayment":
        this.setState({
          ...this.state,
          amountPayment: value
        });
        break;
      case "addressSeller":
        this.setState({
          ...this.state,
          addressSeller: value
        });
        break;
    }
  };

  validateForm = () => {
    const {createOfferWhenSelling} = this.props;
    const {order} = this.state;

    // validate the order fields 

    // create
    // createOfferWhenSelling(order);
  };

  render() {
    const { title, img, coinsExample, listCoinSelects } = this.state;
    const { classes } = this.props;
    return (
      <div className={style.baseUser}>
        <div className={style.headerUser}>
          <Grid container>
            <Grid item xs={1}>
              <div className={style.arrowBack} />
            </Grid>
            <Grid item xs={2}>
              <Avatar
                alt="avatar"
                src="https://loremflickr.com/40/40"
                className={style.avatar}
              />
            </Grid>
            <Grid item xs={5}>
              <span className={style.name}>Nome Usuario</span>
              <span className={style.textSmall}>00/00/2018</span>
            </Grid>
            <Grid item xs={4} style={{ paddingLeft: 10 }}>
              <div className={style.boxStar}>
                <StarVotes votes={0} />
              </div>
            </Grid>
          </Grid>
        </div>

        <div className={style.formBase}>
          <div className={style.formGroup}>
            <div className={style.textSmall}>Defina os valores</div>
            <Grid container>
              <Grid item xs={5}>
                <input
                  type="text"
                  name="amount"
                  placeholder="0.0000"
                  className={style.inputDefault}
                  value={this.state.order.amount}
                  onChange={e => this.handleFields(e)}
                />
              </Grid>
              <Grid item xs={2}>
                <ArrowForward className={style.arrowPrice} />
              </Grid>
              <Grid item xs={5}>
                <input
                  type="text"
                  name="amountPayment"
                  placeholder="R$0,00"
                  className={style.inputDefault}
                  value={this.state.order.amountPayment}
                  onChange={e => this.handleFields(e)}
                />
              </Grid>
            </Grid>
          </div>

          <div className={style.formGroup}>
            <div className={style.textSmall}>Moeda desejada</div>
            <Grid container>
              <Grid item xs={5}>
                <Select
                  list={coinsExample}
                  title={title}
                  titleImg={img}
                  selectItem={this.coinSelected}
                  error={null}
                  width={"100%"}
                />
              </Grid>
              <Grid item xs={7}>
                <MultiSelect
                  list={coinsExample}
                  selectItems={this.selectItems}
                />
              </Grid>
            </Grid>
            <hr />
          </div>

          <div className={style.formGroup}>
            <div className={style.textSmall}>Método de negociação</div>
            <FormControlLabel
              value="p2p"
              classes={{ label: classes.rootLabel }}
              control={
                <Radio
                  checked={this.state.selectedValue === "p2p"}
                  icon={<Lens />}
                  checkedIcon={<Lens />}
                  onChange={this.handleChange}
                  classes={{ root: classes.root, checked: classes.checked }}
                />
              }
              label="P2P (Peer to Peer)"
              labelPlacement="end"
            />
            <hr />
          </div>

          <div className={style.formGroup}>
            <div className={style.textSmall}>Endereço Carteira</div>
            <input
              type="text"
              name="addressSeller"
              placeholder="aksdlasd6asd5asd5"
              className={style.inputDefault}
              value={this.state.order.addressSeller}
              onChange={e => this.handleFields(e)}
            />
          </div>
          <hr />
          <div className={style.formGroup}>
            <div className={style.textSmall}>Descrição</div>
            <textarea
              className={style.textArea}
              name="description"
              onChange={e => this.handleFields(e)}
            >
              {this.state.order.description}
            </textarea>
            <button className={style.btContinue} onClick={this.validateForm}>
              CRIAR OFERTA
            </button>
          </div>
        </div>
      </div>
    );
  }
}

CreateOffer.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = store => ({
  //
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createOfferWhenSelling
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(stylesCustom)(CreateOffer));
