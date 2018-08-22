import React from "react";
import style from "../../style.css";
import QrCode from "qrcode.react";
import PropTypes from "prop-types";
import Hidden from "@material-ui/core/Hidden";

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

                <div className={style.spacingBox}>
                    <div className={style.alignButtons}>
                        <div className={style.buttonReceive}>
                            <img src="/images/icons/modal-receive/ic_copy@1x.png" />
                            <p>
                                <span className={style.spanCopy}>
                                    Copiar
                                </span>
                            </p>
                        </div>
                        <div className={style.buttonReceive}>
                            <img src="/images/icons/modal-receive/ic_print@1x.png" />
                            <p><span className={style.spanPrint}>Imprimir</span></p>
                        </div>
                        <div className={style.buttonReceive}>
                            <img src="/images/icons/modal-receive/ic_email@1x.png" />
                            <p>
                                <span className={style.spanEmail}>Email</span>
                            </p>

                        </div>
                        <Hidden xsDown>
                            <div className={style.buttonReceive}>
                                <img src="/images/icons/modal-receive/ic_compartilhar@1x.png" />
                                <p><span className={style.spanShared}>Compartilhar</span></p>
                            </div>
                        </Hidden>
                    </div>

                </div>
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

