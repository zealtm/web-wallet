import React from "react";
import style from "../../style.css";
import QrCode from "qrcode.react";
import PropTypes from "prop-types";

class Receive extends React.Component {

    hasAddress = () => {
        let { coin } = this.props;
        return coin.address ?
            <div>
                <div className={style.qrCode}>
                    <QrCode
                        className={style.bgQrCode}
                        value={coin.address}
                        size={176}
                        bgColor={"#fff"}
                        fgColor={"#000"}
                        level={"L"}
                    />
                </div>
                <p className={style.address}>{coin.address}</p>
                <p className={style.qrMessage}>Endereço copiado</p>
            </div> : ""
    };

    render() {
        return (
            <div className={style.boxReceive}>
                {this.hasAddress()}
            </div>
        );
    }
}

Receive.propTypes = {
    coin: PropTypes.object
};


export default Receive;

