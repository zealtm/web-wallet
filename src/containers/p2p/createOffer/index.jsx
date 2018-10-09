import React from "react";
import PropTypes from "prop-types";

// MATERIAL
import { Grid, Avatar } from "@material-ui/core/";
import { ArrowForward } from "@material-ui/icons/";

// COMPONENTS 
import Select from "../../../components/select";
import StarVotes from "../components/starvotes";

// STYLE
import style from "./style.css";

class CreateOffer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Lunes",
      img: "images/icons/coins/lunes.png",
      coinsExample: [
        {
          img: "images/icons/coins/lunes.png",
          title: "Lunes"
        },
        {
          img: "images/icons/coins/lunes.png",
          title: "Lunes"
        },
        {
          img: "images/icons/coins/lunes.png",
          title: "Lunes"
        },
      ],
    };
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

  render() {
    const {title,img,coinsExample} = this.state;
    return (
      <div className={style.baseUser} >
      
          <div className={style.headerUser}>
            <Grid container>
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
              <Grid item xs={5} style={{ paddingLeft: 10 }}>
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
                  <Select
                    list={coinsExample}
                    title={title}
                    titleImg={img}
                    selectItem={this.coinSelected}
                    error={null}
                    width={"100%"}
                  /> 
                </Grid>
              </Grid>

              <hr />
            </div>

            <div className={style.formGroup}>
              <div className={style.textSmall}>Método de negociação</div>
              <Grid container>
                <Grid item xs={6}>
                  P2P (Peer to Peer)
                </Grid>
                <Grid item xs={6}>
                  SCROOW 
                </Grid>
              </Grid>

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

CreateOffer.propTypes = {};

export default CreateOffer;
