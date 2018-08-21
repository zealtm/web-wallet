import React from "react";
import style from "../../style.css";
import QrCode from "qrcode.react"
import PropTypes from "prop-types";

class Receive extends React.Component {

    hasAddress = () => {
        let { coin } = this.props;
        return coin.address ?
            <div className={style.modalBox}>
                <QrCode
                    value={coin.address}
                    size={200}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    level={"L"}
                />
            </div> : ""
    };

    render() {
        return (
            <div>
                {this.hasAddress()}
            </div>
        );
    }
}

Receive.propTypes = {
    coin: PropTypes.object
};


export default Receive;

