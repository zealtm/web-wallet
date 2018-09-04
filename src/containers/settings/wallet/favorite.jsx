import React from "react";

// STYLES
import style from "./style.css";

// COMPONENTS 
import WalletRow from "./walletRow";

const wallets = [
  {
    name: "LUNES",
    address: "",
    favorite: true,
  },
  {
    name: "LUNES",
    address: "",
    favorite: false,
  },
  {
    name: "LUNES",
    address: "",
    favorite: true,
  }
];

class FavoritePage extends React.Component {
  constructor(props){
    super(props);
  }

  renderWallets(list){
    return list.map((val,key)=>{
      return <div key={key}>
        <WalletRow coin={val} />
      </div>
    });
  }

  render(){
    return (
      <div className={style.box}>
        {this.renderWallets(wallets)}
      </div>
    )
  }
}

export default FavoritePage;