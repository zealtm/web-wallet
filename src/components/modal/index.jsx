import React from "react";
import ReactModal from "react-modal";
import PropTypes from "prop-types";

//STYLE
import style from "./style.css";

class Modal extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    };
  }

  componentDidMount() {
    let { show } = this.props;
    show ? this.handleOpenModal() : null
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
        <div
          className={style.headerImage}
          onClick={() => this.handleCloseModal()}
        >
          <img src="/images/icons/arrow/arrow-white-left@2x.png" alt="Back" />
        </div>
        <div className={style.headerTitle}>{title}</div>
      </div>
    );
  };

  renderContent = () => {
    let { content } = this.props
    return (
      <div>
        {content}
      </div>
    )
  }

  render() {
    let { showModal } = this.state;

    return (
      <div>
        <ReactModal
          isOpen={showModal}
          ariaHideApp={false}
          className={style.modalBox}
          overlayClassName={style.overlay}
        >
          <div>{this.renderHeader()}{this.renderContent()}</div>
        </ReactModal>
      </div>
    );
  }
}

Modal.propTypes = {
  title: PropTypes.string,
  show: PropTypes.bool,
  content: PropTypes.string.isRequired
};

export default Modal;
