import React from "react";
import PropTypes from "prop-types";

// STYLE
import style from "./style.css";

class ActionButton extends React.Component {
    actionButton = () => {
        const { action , content} = this.props;
        action(content);
    };

    render() {
        const { title, typeAction } = this.props;

        return (
            <div onClick={() => this.actionButton()} className={style.imgAction}>
                {typeAction == 'copy' ? <img src="/images/icons/modal-receive/ic_copy@1x.png" /> : <img src="/images/icons/invite/share@1x.png" />}
                <p>{title ? title : ""}</p>
            </div>
        );
    }
}
ActionButton.propTypes = {
    action: PropTypes.func,
    typeAction: PropTypes.oneOf(['share', 'copy']).isRequired,
    content: PropTypes.string.isRequired,
    title: PropTypes.string,
}

export default ActionButton;