import React from 'react';
import Tabs from '../../components/tabs';
import Voucher from './voucher';
import LunesGift from './lunesGift';

const titles = [
  'Voucher',
  'Lunes Gift',
  'Cupom',
];

const contents  = [
  <Voucher />,
  <LunesGift />,
  <h1>Cupom</h1>,
];

class Recharge extends React.Component {
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

export default Recharge;
