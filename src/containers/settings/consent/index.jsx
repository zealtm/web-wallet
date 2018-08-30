import React from "react";
import PropTypes from 'prop-types';

// COMPONENTS 
import CustomSwitch from "./customSwitch";

// UTILS
import i18n from "../../../utils/i18n";

// MATERIAL 
import Grid from "@material-ui/core/Grid";

// STYLES
import style from "./style.css";

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
  },
  {
    title: "Atualizacao da Plataforma",
    description: "Lorem ipsum asdasdasd as asd s dsdsds ds ds dsdsds d sds.",
    name: "check3"
  },
  {
    title: "Utilizar dados para melhor experiencia",
    description: "Lorem ipsum asdasdasd as asd s dsdsds ds ds dsdsds d sds.",
    name: "check4"
  },
  {
    title: "Termo GDPR",
    description: "Lorem ipsum asdasdasd as asd s dsdsds ds ds dsdsds d sds.",
    name: "check5"
  },
  {
    title: "Transacoes",
    description: "Lorem ipsum asdasdasd as asd s dsdsds ds ds dsdsds d sds.",
    name: "check6"
  },
  {
    title: "Armazenamento em cache",
    description: "Lorem ipsum asdasdasd as asd s dsdsds ds ds dsdsds d sds.",
    name: "check7"
  },
];

class Consent extends React.Component {
  constructor(props){
    super(props);
    this.state = { };
  }
  
  handleSwitch = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render(){
    return (
      <Grid container justify="center">
        <Grid item xs={11}>
         
        {
          configs.map((val,key)=>{
            return (
              <CustomSwitch
                key={key}
                title={val.title}
                description={val.description}
                action={this.handleSwitch(val.name)}
                checked={this.state[val.name]}
                />
            )
          })
        }

        </Grid>
      </Grid>
    )
  }
}

export default Consent;