import React from "react";
import PropTypes from "prop-types";

// MATERIA UI
import { Grid, Input } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

// STYLE 
import style from "./style.css";
import colors from "../../components/bases/colors";

// COMPONENTS
import StarVotes from "./components/starvotes";

const inputStyle = {
  root: {
    color: colors.messages.info,
    margin: "0",
    padding: "3px",
    width: "95%",
    marginLeft:"auto",
    marginRight:"auto",
    display:"block",
    borderRadius: '6px',
    border: 'solid 1px #654fa4',
    fontSize: "11px",
    height: "20px",
    maxHeight: "20px",
    backgroundImage: "url(images/icons/p2p/search.png)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "95% center",
    backgroundColor: colors.purple.default,
    "&:hover:before": {
      borderBottom: 'none'
    }
  },
  cssInput: {
    fontFamily: "Noto Sans, sans-serif",
    fontSize: "12px",
    letterSpacing: "0.5px",
  },
  cssUnderline: {
    "&:before, &:after": {
      //borderBottomColor: colors.purple.dark
      borderBottom: 'none'
    },
    "&:hover:not($disabled):not($error):not($focused):before": {
      //borderBottomColor: `${colors.purple.dark} !important`
      borderBottom: "none"
    }
  },
  disabled: {},
  error: {},
  focused: {}
};
class Offers extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      search: "",
    }
  }

  render(){
    const {classes} = this.props;
    const {search} = this.state;
    
    return (
      <div>
        <Input
          classes={{
            root: classes.root,
            underline: classes.cssUnderline,
            input: classes.cssInput
          }}
          value={search}
          id="find"
          onChange={(e)=>this.setState({search: e.target.value})}
        />

       <div className={style.tabContent}>
         <div className={style.itemTabActive}>P2P</div>
         <div className={style.itemTab}>ESCROOW</div>
       </div>

       <div>
         conteudo 1 

          <StarVotes votes={5} />

       </div>
      </div>
    )
  }
}

Offers.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(inputStyle)(Offers);