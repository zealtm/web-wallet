import React from "react";
import { connect } from "react-redux";
import style from "../../style.css";
import QrCode from "qrcode.react"
import PropTypes from "prop-types";


class Receive extends React.Component {
    render() {
        let { seed } = this.props;
        return (
            <div className={style.modalBox}>

                <QrCode
                    value={seed}
                    size={200}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    level={"L"}
                />
            </div>
        );
    }
}

Receive.propTypes = {
    seed: PropTypes.string.isRequired
};

const mapSateToProps = store => ({
    seed: store.user.user.seed
});

export default connect(
    mapSateToProps,
    null
)(Receive);

