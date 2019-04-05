import React from "react";
import PropTypes from "prop-types";

//REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getDepositHistory } from "../redux/depositAction";
// MATERIAL UI
import Grid from "@material-ui/core/Grid";
import CloseIcon from "@material-ui/icons/Close";
// STYLE
import style from "./style.css";
// COMPONENTS
import Loading from "../../../components/loading";
// UTILS
import i18n from "../../../utils/i18n";
import { formatDate } from "../../../utils/numbers";

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleHistory: undefined
    };
  }

  componentDidMount() {
    const { getDepositHistory } = this.props;
    getDepositHistory();
  }

  stateDataHistory = key => {
    let { toggleHistory } = this.state;

    this.setState({
      toggleHistory: toggleHistory === key ? undefined : key
    });
  };

  handleClass = (index, type) => {
    let { toggleHistory } = this.state;
    if (type) {
      return toggleHistory !== undefined && toggleHistory === index
        ? style.boxSubIte
        : style.opacityItem;
    }

    return style.opacityItem;
  };

  renderSubItems = rowIndex => {
    const { history } = this.props;

    return history[rowIndex].subItem.map((item, index) => {
      return (
        <div
          key={index}
          style={{
            width: "100%"
          }}
        >
          <Grid
            className={this.handleClass(rowIndex, "hm")}
            container
            justify="center"
            style={{ backgroundColor: "#42227d" }}
          >
            <Grid item xs={9} className={style.boxSubItem}>
              <Grid item xs={4}>
                <p>{item.date}</p>
              </Grid>
              <Grid item xs={4} style={{ textAlign: "center" }}>
                <p>{item.value}</p>
              </Grid>
              <Grid item xs={4} style={{ textAlign: "end" }}>
                <p
                  className={
                    item.status === "canceled"
                      ? style.txtCancel
                      : item.status === "waiting"
                      ? style.txtPendent
                      : style.txtConfirm
                  }
                >
                  {item.status}
                </p>
              </Grid>
            </Grid>
          </Grid>
        </div>
      );
    });
  };

  renderDepositHistory = () => {
    const { history,loading } = this.props;

    if (loading) return <Loading />;
    if (!history.length)
    return (
      <div className={style.boxContainer}>
        <div className={style.box1}>
          <h1 className={style.textCenter}>
            {i18n.t("DEPOSIT_INF_NOT_FOUND_HIT")}
          </h1>
        </div>
      </div>
    );
    return (
      <Grid item xs={12} sm={7} className={style.boxHistory}>
        {history.map((item, index) => {
          let date =
          formatDate(item.createdAt, "DMY", true) + " " + formatDate(item.createdAt, "HM");
          return (
            <Grid
              className={style.boxHistoryItems}
              key={index}
              onClick={
                Object.keys(item.recurrence).length !== 0
                  ? () => this.stateDataHistory(index)
                  : null
              }
              container
              direction="row"
              justify="center"
            >
              <Grid item xs={1} />

              <Grid item xs={5} className={style.boxItem_1}>
                <p className={style.txtConfirm}>
                  {item.paymentMethod == 'bill'?'Boleto':
                  item.paymentMethod == 'debit'?i18n.t("DEPOSIT_HISTORY_PAYMENT_DEBIT"):""}

                  {Object.keys(item.recurrence).length !== 0  ? (
                    <span> {" - Recorrente"}</span>
                  ) : null}
                </p>
                <p className={style.textBold}>{date}</p>
                <span>{"ID "}</span><span>{item.id}</span>
              </Grid>

              <Grid item xs={4} className={style.boxItem_2}>
                <p
                  className={
                    item.status === "canceled"
                      ? style.txtCancel
                      : item.status === "waiting"
                      ? style.txtPendent
                      : style.txtConfirm
                  }
                >
                  { item.status === "canceled"?i18n.t("DEPOSIT_HISTORY_STATUS_CANCEL"):
                    item.status === "waiting"?i18n.t("DEPOSIT_HISTORY_STATUS_PENDING"):i18n.t("DEPOSIT_HISTORY_STATUS_CONFIRM")}
                </p>

                <p className={style.textBold}>R$ {parseFloat(item.value).toFixed(2)}</p>
                <span>{i18n.t("DEPOSIT_HISTORY_PROTOCOL")} </span><span>{item.protocol}</span>
              </Grid>

              <Grid item xs={1} className={style.boxIcon}>
                {Object.keys(item.recurrence).length !== 0  && item.status === "confirm" ? (
                  <CloseIcon color="error" style={{ fontSize: 20 }} />
                ) : null}
              </Grid>
              {Object.keys(item.recurrence).length !== 0  ? this.renderSubItems(index) : null}
            </Grid>
          );
        })}
      </Grid>
    );
  };

  render() {
    return (
      <Grid container direction="row" justify="center">
        {this.renderDepositHistory()}
      </Grid>
    );
  }
}

History.propTypes = {
  history: PropTypes.array.isRequired,
  getDepositHistory: PropTypes.func,
  loading : PropTypes.bool
};

const mapStateToProps = store => ({
  history: store.deposit.history,
  loading: store.deposit.loading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getDepositHistory
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(History);
