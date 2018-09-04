import React from "react";

// COMPONENTS
import Tabs from "../../../components/tabs";

// PAGES
import AliasPage from "./alias";
import FavoritePage from "./favorite";
import SeedWordsPage from "./seed";

// UTILS

const titles = ["Favoritos", "Alias", "SeedWords"];

const contents = [
  <FavoritePage key="1" />,
  <AliasPage key="2" />,
  <SeedWordsPage key="3" />
];

class WalletSettings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Tabs tabTitles={titles} tabContents={contents} justify="center" />
      </div>
    );
  }
}

export default WalletSettings;
