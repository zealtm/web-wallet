import React from 'react';
import PropTypes from "prop-types";

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import colors from '../../components/bases/colors';

const tabStyles = theme => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing.unit * 2,
  },
  tabsRoot: {
    marginBottom: theme.spacing.unit * 1,
    borderBottom: `1px solid ${colors.purple.clear}`
  },
  tabsIndicator: {
    backgroundColor: colors.green.dark,
    height: '3px',
  },
  tabRoot: {
    backgroundColor: colors.purple.clear,
    fontWeight: 600,
    borderBottom: `1px solid ${colors.purple.clear}`,
    marginRight: '1px',
    opacity: 0.8,
  }
});

function TabContainer(props) {
  return (
    <div>
      {props.child}
    </div>
  );
}

class CustomTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
    console.log('titles', props.tabTitles, 'contents', props.tabContents);
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
          <Tabs classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
            value={value}
            onChange={this.handleChange}
          >
            {
              this.props.tabTitles.map((title, key) => <Tab classes={{ root: classes.tabRoot }} key={key} label={title} />)
            }
          </Tabs>
        </Grid>
        <Grid item md={12}>
          {
            this.props.tabContents.map((content, key) => value === key ? <div key={key}>{ content }</div> : '')
          }
        </Grid>
      </Grid>
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {this.renderTabs()}
      </div>
    )
  }
}

CustomTabs.prototypes = {
  tabTitles: PropTypes.array.isRequired,
  tabContents: PropTypes.array.isRequired,
};

export default withStyles(tabStyles)(CustomTabs);
