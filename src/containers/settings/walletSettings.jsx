import React from 'react';

// COMPONENTS
import Tabs from '../../components/tabs';

// PAGES
import {AliasPage, FavoritePage, SeedWordsPage} from './wallet';

// UTILS 
import i18n from "../../utils/i18n";

const titles = [
  "Favoritos",
  "Alias",
  "SeedWords",
];

const contents  = [
  <FavoritePage />,
  <AliasPage />,
  <SeedWordsPage />,
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
    )
  }
}

export default WalletSettings;
