import React from "react";

// COMPONENTS
import CustomSwitch from "./customSwitch";

// MATERIAL
import Grid from "@material-ui/core/Grid";

const configs = [
  {
    title: "Definicoes padroes por regiao",
    description: "O idioma selecionado sera automaticamente exibido",
    name: "check1"
  },
  {
    title: "Alerta de Criptomoedas",
    description: "Lorem ipsum asdasdasd as asd s dsdsds ds ds dsdsds d sds.",
    name: "check2"
  }
];

class Consent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSwitch = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  renderSwitch = () => {
    return configs.map((val, key) => {
      return (
        <CustomSwitch
          key={key}
          title={val.title}
          description={val.description}
          action={this.handleSwitch(val.name)}
          checked={this.state[val.name]}
        />
      );
    });
  };

  render() {
    return (
      <Grid container justify="center">
        <Grid item xs={11}>
          {this.renderSwitch()}
        </Grid>
      </Grid>
    );
  }
}

export default Consent;
