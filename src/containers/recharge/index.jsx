import React from 'react';
import Tabs from '../../components/tabs';

const titles = [
  'Voucher',
  'Lunes Gift',
  'Cupom',
];

const contents  = [
  <h1>Voucher</h1>,
  <h1>Lunes</h1>,
  <h1>Cupom</h1>,
];

class Recharge extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Tabs tabTitles={titles} tabContents={contents}/>
      </div>
    )
  }
}

export default Recharge;
