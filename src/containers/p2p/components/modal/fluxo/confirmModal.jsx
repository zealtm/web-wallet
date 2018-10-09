import React from "react";
// STYLE
import style from "../style.css";
import PropTypes from "prop-types";

class ConfirmModal extends React.Component {
    constructor() {
        super();
        this.state = {
            confirm: false,
            selectFee: false,
        };
        this.hendlerContinue = this.hendlerContinue.bind(this);
    }

    calcFee() {
        console.log("fee : " + confirm);
        this.setState({ selectFee: true });
    }

    hendlerContinue = () => {
        if(this.state.selectFree){
            this.setState({ confirm: !this.state.confirm });
        }
        
    }

    render() {
        return (
            <div className={style.modalBox}>
                <img
                    src={"/images/icons/coins/lunes.png"}
                    className={style.modalIconCoin}
                />
                <div>
                    <span>{"You are sending "}</span>
                    <span className={style.totalConfirm}>
                        {"542.59359739 LUNES"}
                    </span>
                    <br />
                    <span>{"for payment platform P2P "}</span>
                </div>

                <div className={style.confirmFee}>
                    <div>
                        {"Your transaction fee on the network LUNES is"}
                    </div>
                    <div className={style.txtamount}>{"0"}</div>
                </div>

                <div className={style.boxFee}>
                    <span
                        className={style.greenLabelFee}
                        onClick={() => this.calcFee()}
                    >
                        {"Low 0.001"}
                    </span>
                    <span
                        className={style.yellowLabelFee}
                        onClick={() => this.calcFee()}
                    >
                        {"Medium 0.001"}
                    </span>
                    <span
                        className={style.redLabelFee}
                        onClick={() => this.calcFee()}
                    >
                        {"High 0.001"}
                    </span>
                </div>
                <button
                    className={style.btGreen}
                    onClick={ this.hendlerContinue() }
                >
                    {"Confirmar"}
                </button>
            </div>
        );
    }
}
ConfirmModal.propTypes = {

}
export default ConfirmModal;