import React from "react";
import PropTypes from "prop-types";

// MATERIAL
import { Grid, Avatar, Radio, withStyles, FormControlLabel } from "@material-ui/core/";
import { ArrowForward, ArrowBack } from "@material-ui/icons/";

// ICONS 
import { Lens } from "@material-ui/icons";

// COMPONENTS 
import Select from "../../../components/select";
import StarVotes from "../components/starvotes";
import MultiSelect from "../components/multiSelect"

// STYLE
import style from "./style.css";

const stylesCustom = {
  root: {
    color: "#654fa4",
    '&$checked': {
      color: "#68f285",
    },
  },
  rootLabel: {
    fontSize: "11px",
    color: "#fff"
  },
  checked: {
    color: "#68f285",
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
          value:"LTC",
          img: "images/icons/coins/ltc.png",
          title: "LTC"
        },
        {
          value:"LUNES",
          img: "images/icons/coins/lunes.png",
          title: "Lunes"
        },
      ],
      listCoinSelects:[],
      selectedValue: ''
    };
  }
  selectItems = (listCoins) => {
    this.setState({
      ...this.state,
      listCoinSelects: listCoins
    });
  }

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
    this.setState({ selectedValue: event.target.value });
  };

  render() {
    const {title,img,coinsExample, listCoinSelects} = this.state;
    const {classes} = this.props;
    return (
      <div className={style.baseUser} >

        <div className={style.headerUser}>
          <Grid container>
            <Grid item xs={1}>
              <ArrowBack className={style.arrowBack} />
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
                <StarVotes votes={4} />
              </div>
            </Grid>
          </Grid>
        </div>

        <div className={style.formBase}>
          <div className={style.formGroup}>
            <div className={style.textSmall}>Defina os valores</div>
            <Grid container>
              <Grid item xs={5}>
                <input type="text" placeholder="0.0000" className={style.inputDefault} />
              </Grid>
              <Grid item xs={2}>
                <ArrowForward className={style.arrowPrice} />
              </Grid>
              <Grid item xs={5}>
                <input type="text" placeholder="R$0,00" className={style.inputDefault} />
              </Grid>
            </Grid>
          </div>

            <div className={style.formGroup}>
              <div className={style.textSmall}>Moeda desejada</div>
              <Grid container>
                <Grid item xs={5} className={style.singleSelect}>
                  <Select
                    list={coinsExample}
                    title={title}
                    titleImg={img}
                    selectItem={this.coinSelected}
                    error={null}
                    width={"100%"}
                  />
                </Grid>
                <Grid item xs={5} className={style.multiSelect}>
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
              control={<Radio
                checked={this.state.selectedValue === 'p2p'}
                icon={<Lens />}
                checkedIcon={<Lens />}
                onChange={this.handleChange}
                classes={{ root: classes.root, checked: classes.checked }}
              />}
              label="P2P (Peer to Peer)"
              labelPlacement="end"
            />
            <FormControlLabel
              value="scroow"
              classes={{ label: classes.rootLabel }}
              control={<Radio
                checked={this.state.selectedValue === 'scroow'}
                icon={<Lens />}
                checkedIcon={<Lens />}
                onChange={this.handleChange}
                classes={{ root: classes.root, checked: classes.checked }}
              />}
              label="SCROOW"
              labelPlacement="end"
            />
            <hr />
          </div>

          <div className={style.formGroup}>
            <div className={style.textSmall}>Endereço Carteira</div>
            <input type="text" placeholder="aksdlasd6asd5asd5" className={style.inputDefault} />
          </div>
          <div className={style.formGroup}>
            <div className={style.textSmall}>E-mail</div>
            <input type="text" placeholder="email@email.com" className={style.inputDefault} />
          </div>
          <hr />
          <div className={style.formGroup}>
            <div className={style.textSmall}>Descrição</div>
            <textarea className={style.textArea}>
              Pagamento em Real pelo BANCO INTER, SANTANDER OU NUBANK
              </textarea>
            <button className={style.btContinue}>CRIAR OFERTA</button>

          </div>
        </div>
      </div>
    );
  }
}

CreateOffer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(stylesCustom)(CreateOffer);
