import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import colors from '../../components/bases/colors';
import style from './style.css';

const styles = theme => ({
  tabsIndicator: {
    backgroundColor: colors.green.dark,
  },
  tabRoot: {
    backgroundColor: colors.purple.clear,
    fontWeight: 600,
    borderBottom: `1px solid ${colors.purple.clear}`,
  }
});

const tabs = [
  {title: 'Voucher', content: 'Teste 1'},
  {title: 'Lunes Gift', content: 'Teste 2'},
  {title: 'Cupom', content: 'Teste 3'},
];

class Recharge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  renderTabs = () => {
    const { value } = this.state;
    const { classes } = this.props;

    return (
      <Grid container>
        <Grid item md={12}>
          <Tabs classes={{ indicator: classes.tabsIndicator }}
            value={value}
            onChange={this.handleChange}
          >
            {
              tabs.map((tab, key) => <Tab classes={{ root: classes.tabRoot }} key={key} label={tab.title} />)
            }
          </Tabs>
        </Grid>
        <Grid item md={12}>
          {
            tabs.map((tab, key) => value === key ? <h1 key={key}>{ tab.content }</h1> : '')
          }
        </Grid>
      </Grid>
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={style.container}>
        {this.renderTabs()}
      </div>
    )
  }
}

export default withStyles(styles)(Recharge);
