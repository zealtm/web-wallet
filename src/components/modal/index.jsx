import React from "react";
import ReactModal from "react-modal";
import PropTypes from "prop-types";

//STYLE
import style from "./style.css";

class GeneralModal extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: true
    };
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  renderHeader = () => {
    let { title } = this.props;

    return (
      <div className={style.header}>
        <div className={style.headerImage} onClick={() => this.handleCloseModal()}>
          <img src="/images/icons/arrow/arrow-white-left@2x.png" alt="Back" />
        </div>
        <div className={style.headerTitle}>{title}</div>
      </div>
    );
  };

  render() {
    let { showModal } = this.state;

    return (
      <div>
        <ReactModal
          isOpen={showModal}
          className={style.modalBox}
          overlayClassName={style.overlay}
        >
          {this.renderHeader()}
        </ReactModal>
      </div>
    );
  }
}

GeneralModal.propTypes = {
  title: PropTypes.string,
};


export default GeneralModal;
