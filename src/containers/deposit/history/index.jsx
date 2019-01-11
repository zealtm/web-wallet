import React from "react";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";
import CloseIcon from "@material-ui/icons/Close";

// STYLE
import style from "./style.css";

const arrayHistory = [
  {
    nameHistory: "Deposito",
    type: "default",
    info: {
      data: "23/11/2018 17:30",
      status: "Cancel",
      value: "RS 1.000,00"
    },
    user: { cpf: "417.487.228-33", id: "5832158" },
    subItem: [
      { data: "", value: "", status: "" },
      { data: "", value: "", status: "" }
    ]
  },
  {
    nameHistory: "Deposito",
    type: "Recorrent",
    info: {
      data: "15/12/2018 16:30",
      status: "Confirm",
      value: "RS 8.000,00"
    },
    user: { cpf: "471.487.228-33", id: "1232158" },
    subItem: [
      { data: "05/11/2018", value: "RS 3.000,00", status: "Cancel" },
      { data: "07/10/2018", value: "RS 200,00", status: "Confim" }
    ]
  },
  {
    nameHistory: "Deposito",
    type: "Recorrent",
    info: {
      data: "20/11/2018 12:30",
      status: "Pendent",
      value: "RS 5.000,00"
    },
    user: { cpf: "361.487.228-33", id: "1232158" },
    subItem: [
      { data: "12/09/2018", value: "RS 300,00", status: "Pendent" },
      { data: "01/09/2018", value: "RS 100,00", status: "Confim" },
      { data: "14/08/2018", value: "RS 800,00", status: "Cancel" }
    ]
  },
  {
    nameHistory: "Deposito",
    type: "default",
    info: {
      data: "11/11/2018 18:30",
      status: "Confirm",
      value: "RS 700,00"
    },
    user: { cpf: "179.487.228-33", id: "54432158" },
    subItem: [
      { data: "", value: "", status: "" },
      { data: "", value: "", status: "" }
    ]
  }
];

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleHistory: undefined
    };
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

  renderSubItems(id) {
    return arrayHistory[id].subItem.map((item, index) => {
      return (
        <div
          key={index}
          style={{
            width: "100%"
          }}
        >
          <Grid
            className={this.handleClass(id, "hm")}
            container
            justify="center"
            style={{ backgroundColor: "#42227d" }}
          >
            <Grid item xs={9} className={style.boxSubItem}>
              <Grid item xs={4}>
                <p>{item.data}</p>
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
  }

  render() {
    return (
      <Grid container direction="row" justify="center">
        <Grid item xs={12} sm={7} className={style.boxHistory}>
          {arrayHistory.map((item, id) => {
            return (
              <Grid
                className={style.boxHistoryItems}
                key={id}
                onClick={
                  item.type === "Recorrent"
                    ? () => this.stateDataHistory(id)
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
                  <p className={style.textBold}>{item.info.data}</p>
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
                  {item.type === "Recorrent" &&
                  item.info.status === "Confirm" ? (
                    <CloseIcon color="error" style={{ fontSize: 20 }} />
                  ) : null}
                </Grid>
                {item.type === "Recorrent" ? this.renderSubItems(id) : null}
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    );
  }
}

History.propTypes = {};

export default History;
