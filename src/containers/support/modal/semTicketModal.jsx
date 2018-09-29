import React from "react";

// STYLE
import style from "../style.css";

// UTILS
import i18n from "../../../utils/i18n";

// COMPONENTS

class SemTicketModal extends React.Component {


    render() {
        return (
            <div className={style.alignInstructions}>
                <div className={style.infoModal}>
                    <p>
                        <img src="/images/icons/recharge/ic_instrucoes@2x.png" height="69px" width="69px" alt={i18n.t("COUPON_INSTRUCTIONS")} />
                    </p>
                    <p>

                        {"Você não tem conversas!"}
                        <br />
                        {'Para iniciar uma consersa volte a tela anterior e faça uma pergunta para nossos atendentes.'}

                    </p>
                    <button className={style.buttonBorderGreen}>{'Continuar'}</button>
                </div>
            </div>
        );
    }
}

export default SemTicketModal;
