import React from "react";
import PropTypes from 'prop-types';

// COMPONENTS 
import CustomSelectImage from "./customSelectImage";

// UTILS
import i18n from "../../../utils/i18n";

// MATERIAL 
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';

// STYLES
import style from "./style.css";

const materialStyle = theme => ({
  iOSSwitchBase: {
    '&$iOSChecked': {
      color: '#ffffff',
      '& + $iOSBar': {
        backgroundColor: '#52d869',
      },
    },
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.sharp,
    }),
  },
  iOSChecked: {
    transform: 'translateX(15px)',
    '& + $iOSBar': {
      opacity: 1,
      border: 'none',
    },
  },
  iOSBar: {
    borderRadius: 13,
    width: 42,
    height: 26,
    marginTop: -13,
    marginLeft: -21,
    border: 'none',
    backgroundColor: '#ccc',
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  iOSIcon: {
    width: 24,
    height: 24,
  },
  iOSIconChecked: {
    boxShadow: theme.shadows[1],
  },
});


class Definitions extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container justify="center">
        <Grid item xs={11}>
          <div className={style.box}>

            <h2>{i18n.t("SET_DEFINITIONS_TITLE_1")}</h2>
            <div className={style.formSwitch}>
              {i18n.t("SET_DEFINITIONS_OPTION_1")}

              <Switch
                classes={{
                  switchBase: classes.iOSSwitchBase,
                  bar: classes.iOSBar,
                  icon: classes.iOSIcon,
                  iconChecked: classes.iOSIconChecked,
                  checked: classes.iOSChecked,
                }}
                disableRipple
                checked={true}
                value="checkedB"
              />

            </div>
            <div className={style.formSwitch}>
              {i18n.t("SET_DEFINITIONS_OPTION_2")}
              <Switch
                classes={{
                  switchBase: classes.iOSSwitchBase,
                  bar: classes.iOSBar,
                  icon: classes.iOSIcon,
                  iconChecked: classes.iOSIconChecked,
                  checked: classes.iOSChecked,
                }}
                disableRipple
                checked={false}
                value="checkedB"
              />

            </div>

            <hr className={style.line} />

            <Grid container className={style.formDefinition}>
              <Grid item xs={12} className={style.contentDefinition} >
                <Grid item xs={12} sm={3} >
                  {i18n.t("SET_DEFINITIONS_LABEL_LANG")}
                  <CustomSelectImage action={() => alert("teste")} />
                </Grid>

                <Grid item xs={12} sm={3} >
                  {i18n.t("SET_DEFINITIONS_LABEL_CURR")}
                  <CustomSelectImage action={() => alert("teste")} />
                </Grid>

                <Grid item xs={12} sm={3} >
                  {i18n.t("SET_DEFINITIONS_LABEL_COIN")}
                  <CustomSelectImage action={() => alert("teste")} />
                </Grid>

              </Grid>

            </Grid>

          </div>
        </Grid>
      </Grid>
    )
  }
}

Definitions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(materialStyle)(Definitions);