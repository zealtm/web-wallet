import React from "react";
import PropTypes from "prop-types";
// STYLE
import style from "../style.css";
// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setModalStep } from "../../redux/p2pAction";

class InforModal extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={style.modalBox}>
                <img
                    src={"/images/icons/confirm/confirm.png"}
                    className={style.iconInfor}
                />
                <div className={style.totalConfirm}>
                    <span>{"Você acabou de debitar um boleto"}</span>
                    <span>
                        {"no valor de R$ 30,00 em sua Wallet Lunes"}
                    </span>
                </div>                

                <div className={style.confirmFee}>
                    <div>
                        {"Você pode visualizar a transação em sua aba “Históricos” desse boleto."}
                    </div>
                </div>

            </div>
        );
    }
}
InforModal.propTypes = {

    setModalStep: PropTypes.func.isRequired,
}
const mapStateToProps = store => ({
    modalStep: store.p2p.modalStep
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            setModalStep,
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (InforModal);