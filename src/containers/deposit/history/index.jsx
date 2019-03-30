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
                    item.status === "Cancel"
                      ? style.txtCancel
                      : item.status === "Pendent"
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
    if (!history.length) return (<div></div>);
    return (
      <Grid item xs={12} sm={7} className={style.boxHistory}>
        {history.map((item, index) => {
          return (
            <Grid
              className={style.boxHistoryItems}
              key={index}
              onClick={
                item.type === "Recorrent"
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
                  {item.nameHistory}

                  {item.type === "Recorrent" ? (
                    <span> {" - " + item.type}</span>
                  ) : null}
                </p>
                <p className={style.textBold}>{item.info.date}</p>
                <p>{item.user.cpf}</p>
              </Grid>

              <Grid item xs={4} className={style.boxItem_2}>
                <p
                  className={
                    item.info.status === "Cancel"
                      ? style.txtCancel
                      : item.info.status === "Pendent"
                      ? style.txtPendent
                      : style.txtConfirm
                  }
                >
                  {item.info.status}
                </p>

                <p className={style.textBold}>{item.info.value}</p>
                <p>{item.user.id}</p>
              </Grid>

              <Grid item xs={1} className={style.boxIcon}>
                {item.type === "Recorrent" && item.info.status === "Confirm" ? (
                  <CloseIcon color="error" style={{ fontSize: 20 }} />
                ) : null}
              </Grid>
              {item.type === "Recorrent" ? this.renderSubItems(index) : null}
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
  history: PropTypes.array,
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
