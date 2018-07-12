import React from "react";

let content_1 = <div>Conteúdo 1</div>;
let content_2 = <div>Conteúdo 2</div>;
let content_3 = <div>Conteúdo 3</div>;

let contents = [content_1, content_2, content_3];

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0
    };
  }

  nextContent() {
    let { step } = this.state;
    if(contents[step + 1]) {
      return this.setState({ step: step + 1 });
    }

    return;
  }

  prevContent() {
    let { step } = this.state;
    if(contents[step - 1]) {
      return this.setState({ step: step - 1 });
    }
    
    return;
  }

  render() {
    let { step } = this.state;
    return (
      <div>
        {contents[step]}
        <button onClick={() => this.nextContent()}> PROXIMO </button>
        <button onClick={() => this.prevContent()}> ANTERIOR </button>
      </div>
    );
  }
}

export default Create;
