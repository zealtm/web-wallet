import React from "react";
import i18n from "../../utils/i18n";
import { Link } from "react-router-dom";

class NotFoundError extends React.Component {
  render() {
    return (
      <div>
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center"
        }}>
          <div style={{
            width: "38%",
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
                <h1 style={{ margin: 0 }}> {"4"} </h1>
                <h1 style={{ margin: 0 }}> {"0"} </h1>
                <h1 style={{ margin: 0 }}> {"4"} </h1>
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
              {i18n.t("PAGE_ERROR_404")}
              <br />
              <Link to="/">
                <button style={{
                  borderRadius: "6px",
                  backgroundColor: "#68f285",
                  color: "white",
                  border: "0",
                  padding: "5px 10px",
                  marginTop: "10px",
                  cursor: "pointer",
                  fontFamily: "Noto Sans"
                }}>
                  {i18n.t("BTN_HOME")}
                </button>
              </Link>
            </h3>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFoundError;
