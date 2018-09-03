import React from "react";
import i18n from "../../utils/i18n";

class InternalError extends React.Component {
  constructor() {
    super();
    this.state = {
      timer: 3
    }
  }

  counter = () => {
    let { timer } = this.state;
    if (timer > 0) {
      this.setState({
        ...this.state,
        timer: this.state.timer - 1
      })
    }
  }

  componentDidMount() {
    setInterval(() => this.counter(), 1000)
  }

  render() {
    let { timer } = this.state;
    return (

      <div style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}>

        <div>
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}>

            <div style={{
              width: "30%",
            }}>

              <div style={{
                fontSize: "12vh",
                color: "#654fa4",
                display: "flex",
              }}>
                <div style={{
                  display: "flex",
                  width: "100%",
                  height: "27vh",
                  justifyContent: "space-evenly"
                }}>
                  <h1 style={{ margin: 0 }}> {"5"} </h1>
                  <h1 style={{ margin: 0 }}> {"0"} </h1>
                  <h1 style={{ margin: 0 }}> {"0"} </h1>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <center>

                <h3 style={{ margin: "0" }}> {i18n.t("PAGE_ERROR_500")} </h3>
                <br />
                <div style={{
                  color: "#68f285",
                  fontWeight: "bold"
                }}>
                  <p>
                    {i18n.t("PAGE_ERROR_500_REDIRECT")}
                    {"... " + timer}
                  </p>
                </div>
              </center>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InternalError;
