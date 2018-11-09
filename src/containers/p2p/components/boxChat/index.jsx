 import React from "react";
import PropTypes from "prop-types";

// REDUX 
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {closeChat} from "../../redux/p2pAction";

// MATERIAL UI
import { Grid } from "@material-ui/core";


// COMPONENTS 
import Select from "../../../../components/select";


// STYLE
import style from "./style.css";

const stylesCustom = theme => ({
    root: {
      color: "#68f285",
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
  });
  

class boxChat extends React.Component {
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

      handleDetails = () => {
        this.setState({
          ...this.state,
          openDetails: !this.state.openDetails
        });
      };
    
    render() {
        const {title,img,coinsExample} = this.state;
        return (
            
                <div className={style.boxChat}>
                    
                        <div className={style.formGroup}>
                            <Grid container>
                                <Grid item xs={6}>
                                <div className={style.buy}>
                                <div className={style.card}>
                                <div className={style.textSmall}>Compra</div>
                                <Select
                                    list={coinsExample}
                                    title={title}
                                    titleImg={img}
                                    selectItem={this.coinSelected}
                                    error={null}
                                    width={"100%"}
                                />
                                </div>
                                </div>
                                </Grid>
                                <Grid item xs={6}>
                                <div className={style.payment}>
                                <div className={style.card}>
                                <div className={style.textSmall}>Pagamento</div>
                                <Select
                                    list={coinsExample}
                                    title={title}
                                    titleImg={img}
                                    selectItem={this.coinSelected}
                                    error={null}
                                    width={"100%"}
                                />
                                </div>
                                </div> 
                                </Grid>
                            </Grid>
                        </div>
                        <Grid container>
                          <Grid item xs={12}> 
                            <input type="text" placeholder="Descrição" className={style.inputDefault} />
                            <input type="text" placeholder="Endereço carteira" className={style.inputDefault} style={{marginTop: -15}} />
                          </Grid>
                          <Grid item xs={6}>
                            <button className={style.btContinue}>Vender</button>
                          </Grid>
                          
                          <Grid item xs={6}>
                            <button className={style.buttonGeneral}>Escroow</button>
                          </Grid>
                        </Grid>

                        
                   

                </div>  
            
        );
    }
}

boxChat.propTypes = {
    
}






export default connect(stylesCustom)(boxChat);