import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// COMPONENTS
import LeasingHistory from "./leasingHistory";
import Modal from "../../components/modal";
import StartLeasing from "./modal/startLeasing";
import { setLeasingLoading } from "./redux/leasingAction";
import Loading from "../../components/loading";

class Leasing extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false
    };
  }

  componentDidMount() {
    setLeasingLoading(true);
  }

  handleModalLeasing = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    let { isOpen } = this.state;
    return (
      <div>
        <div>
          <LeasingHistory openModal={this.handleModalLeasing} />
        </div>
        <Modal
          title={"Iniciar Leasing"}
          content={<StartLeasing />}
          show={isOpen}
          close={() => this.handleModalLeasing()}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setLeasingLoading
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(Leasing);
