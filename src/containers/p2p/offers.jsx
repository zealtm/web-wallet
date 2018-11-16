import React from "react";
import PropTypes from "prop-types";

// MATERIA UI
import { Grid, Input } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

// STYLE
import style from "./style.css";
import colors from "../../components/bases/colors";

// COMPONENTS
import CardOffer from "./components/cardOffer";

// UTILS
import i18n from "../../utils/i18n";

const inputStyle = {
  root: {
    color: colors.messages.info,
    padding: "5px",
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
    borderRadius: "6px",
    border: "solid 1px #654fa4",
    fontSize: "11px",
    height: "20px",
    maxHeight: "20px",
    backgroundImage: "url(images/icons/p2p/search.png)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "95% center",
    backgroundColor: colors.purple.default,
    "&:hover:before": {
      borderBottom: "none"
    }
  },
  cssInput: {
    fontFamily: "Noto Sans, sans-serif",
    fontSize: "12px",
    letterSpacing: "0.5px"
  },
  cssUnderline: {
    "&:before, &:after": {
      //borderBottomColor: colors.purple.dark
      borderBottom: "none"
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
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      tabGiving: true,
      tabDone: false
    };
  }
  onChangeTab(status) {
    if (status == 1) {
      this.setState({ tabGiving: false, tabDone: true });
    } else {
      this.setState({ tabGiving: true, tabDone: false });
    }
  }
  render() {
    const { classes } = this.props;
    const { search, tabGiving, tabDone } = this.state;

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
          onChange={e => this.setState({ search: e.target.value })}
        />

        <div className={style.tabContent}>

          <div
            className={tabGiving ? style.itemTab : style.itemTabActive}
            onClick={() => this.onChangeTab(1)}
          >
            {i18n.t("P2P_STATUS_TEXT_1")}
          </div>
          <div
            className={tabDone ? style.itemTab : style.itemTabActive}
            onClick={() => this.onChangeTab(0)}
          >
            {i18n.t("P2P_STATUS_TEXT_2")}
          </div>

        </div>

        <div className={style.content}>
          {[1, 2, 3].map((val, key) => {
            return <CardOffer key={key} />;
          })}
        </div>
      </div>
    );
  }
}

Offers.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(inputStyle)(Offers);
