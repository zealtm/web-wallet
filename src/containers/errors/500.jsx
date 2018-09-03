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
      <div>
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          marginTop: "8%"
        }}>
          <div style={{
            width: "25%",
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
          <img src="./images/lunio-404@1x.png" style={{
            position: "absolute",
            bottom: "0",
            width: "28vh"
          }} />
        </div>

        <div>
          <div>
            <h3 style={{
              margin: "0",
              textAlign: "center"
            }}>
              <p style={{ color: "#68f285" }}>
                {i18n.t("PAGE_ERROR_500_REDIRECT")}
                {"... " + timer}
              </p>

            </h3>
          </div>
        </div>
      </div>
    );
  }
}

export default InternalError;
