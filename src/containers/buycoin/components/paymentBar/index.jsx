import React from "react";
import PropTypes from "prop-types";

// MATERIAL
import { Grid,Radio,FormControlLabel,withStyles } from "@material-ui/core/";

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

class PaymentBar extends React.Component {
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
    const {classes} = this.props;

    return (
      <div className={style.baseBar}>
        <Grid container>
          <Grid item xs={12} md={8}>
            <span className={style.label}>Selecione uma forma de pagamento</span>
            <div className={style.baseBackgroundFlex}>

              <FormControlLabel
                value="p2p"
                classes={{label: classes.rootLabel}} 
                control={<Radio color="primary" classes={{root: classes.root, checked: classes.checked}}  />}
                label="Criptomoeda"
                labelPlacement="start"
              />

              
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <span className={style.label}>Moeda para pagamento</span>
            <div className={style.baseBackground}>
              <Select
                list={coinsExample}
                title={title}
                titleImg={img}
                selectItem={this.coinSelected}
                error={null}
                width={"100%"}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

PaymentBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(stylesCustom)(PaymentBar);
