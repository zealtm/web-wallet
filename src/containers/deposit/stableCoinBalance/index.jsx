import React from "react";
import PropTypes from "prop-types";
//REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// UTILS
import i18n from "../../../utils/i18n";
import { convertBiggestCoinUnit } from "../../../utils/numbers";
// STYLES
import style from "./style.css";
import { Grid} from "@material-ui/core";

class StableCoinBalance extends React.Component {
  render() {
    const {
      credit,
      service
    } = this.props;

    const creditAmount = convertBiggestCoinUnit(credit.available, 8);

    return (
        <Grid container spacing={16} className={service === "buy" ? style.contentBalanceBuy : style.contentBalance}>
          <Grid item xs>
            <hr className={style.linBalance} /> 
          </Grid>
          <Grid item width={"auto"} className={style.textBalanceBox}>
            <span className={style.textBalance}>{i18n.t("DEPOSIT_CREDIT")}</span>
            <span className={style.textBalanceGreen}>R$ {creditAmount.toFixed(2)} </span>
          </Grid>            
        </Grid>
    );
  }
}
StableCoinBalance.propTypes = {
    credit: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
    service: PropTypes.string
  };
  
  const mapStateToProps = store => ({
    credit: store.skeleton.creditBalance,
  });
  
  const mapDispatchToProps = dispatch =>
    bindActionCreators(
      {
      },
      dispatch
    );
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(StableCoinBalance);