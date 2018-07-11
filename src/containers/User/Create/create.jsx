import React from "react";
import SlidePage from "../../../components/slidePage";

let content_1 = <div>Conteúdo 1</div>;
let content_2 = <div>Conteúdo 2</div>;
let content_3 = <div>Conteúdo 3</div>;

let contents = [
  content_1,
  content_2,
  content_3
]

class Create extends React.Component {

  render() {
    return (
      <SlidePage content={contents}/>
    )
  }
}

export default Create;
