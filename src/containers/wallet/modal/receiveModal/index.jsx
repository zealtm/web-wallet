import React from "react";
import style from "../../style.css";
import QrCode from "qrcode.react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { successRequest } from "../../../errors/redux/errorAction";
import Hidden from "@material-ui/core/Hidden";
import { bindActionCreators } from "redux";

class Receive extends React.Component {

    copyCoinAddress = () => {
        let { coin, successRequest } = this.props;
        const element = document.createElement("textarea");
        element.value = coin.address;
        document.body.appendChild(element);
        element.select();
        document.execCommand("copy");
        document.body.removeChild(element);
        successRequest("Endereço copiado");
    }

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

                <div className={style.spacingBox}>
                    <div className={style.alignButtons}>
                        <div
                            className={style.buttonReceive}
                            onClick={() => this.copyCoinAddress()}>
                            <img src="/images/icons/modal-receive/ic_copy@1x.png" />
                            <p>
                                <span className={style.spanCopy}>Copiar</span>
                            </p>
                        </div>

                        <div
                            className={style.buttonReceive}>
                            <img src="/images/icons/modal-receive/ic_print@1x.png" />
                            <p>
                                <span className={style.spanPrint}>Imprimir</span>
                            </p>
                        </div>
                        <div className={style.buttonReceive}>
                            <img src="/images/icons/modal-receive/ic_email@1x.png" />
                            <p>
                                <span className={style.spanEmail}>Email</span>
                            </p>

                        </div>
                        <Hidden smUp>
                            <div className={style.buttonReceive}>
                                <img src="/images/icons/modal-receive/ic_compartilhar@1x.png" />
                                <p>
                                    <span className={style.spanShared}>Compartilhar</span>
                                </p>
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
    coin: PropTypes.object,
    successRequest: PropTypes.func
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({ successRequest }, dispatch);

export default connect(null, mapDispatchToProps)(Receive);

