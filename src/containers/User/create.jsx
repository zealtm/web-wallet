import React from "react";

// COMPONENTS
import CustomCheckBox from "../../components/CustomCheckBox";

class Create extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkbox1: false
    };
  }

  // MANIPULACAO DE CHECKBOX
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    return (
      <div>
        <div>CREATE</div>

        <CustomCheckBox
          checked={this.state.checkbox1}
          onChange={this.handleChange("checkbox1")}
          value="checkbox1"
        />
      </div>
    );
  }
}

export default Create;
