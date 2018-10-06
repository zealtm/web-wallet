import React from "react";
// STYLE
import InforModal from "./inforModal"
import style from "../style.css";

class ConfirmModal extends React.Component {
    constructor() {
        super();
        this.state = {
            confirm: false
        };
    }
    renderContent = () => {
        return <InforModal />;
    }
    
    hendlerContinue = () => this.setState({confirm: !this.state.confirm});

    render() {
        const { confirm } = this.state;
         if (confirm) {
            return this.renderContent();
        }       
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
                    >
                        {"Low 0.001"}
                    </span>
                    <span
                        className={style.yellowLabelFee}
                    >
                        {"Medium 0.001"}
                    </span>
                    <span
                        className={style.redLabelFee}
                    >
                        {"High 0.001"}
                    </span>
                </div>
                <button
                    className={style.btGreen}
                    onClick={this.hendlerContinue()}
                >
                   {"Confirmar"}
                </button>
            </div>
        );
    }
}
export default ConfirmModal;