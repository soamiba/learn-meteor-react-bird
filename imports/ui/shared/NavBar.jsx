import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import Radium from 'radium';

import { white, blue } from '../styles/colors';
import typography from '../styles/typography';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {tabIndex: '/'};
  }
  componentWillMount() {
    this.setState({
      tabIndex: this.getSelectedIndex()
    });
  }
  getSelectedIndex() {
    return this.context.router.isActive('/', true) ? '/' :
      this.context.router.isActive('/signup') ? '/signup' :
      this.context.router.isActive('/login') ? '/login' : '';
  }
  componentWillReceiveProps(nextProps) {
   this.setState({
     tabIndex: this.getSelectedIndex()
   });
  }
  handleChange(value) {
    this.context.router.push(value);
    this.setState({tabIndex: value});
  }

  render() {
    let styles = {
      root: {
        flexShrink: '0',
        height: '64px',
        backgroundColor: blue,
        boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)',
      },
      tabs: {
        width: '390px',
        position: 'absolute',
        right: '60px',
        textTransform: 'uppercase',
        fontFamily: typography.fontFamily
      },
      tab: {
        height: '64px',
        color: white
      },
      inkBar: {
        height: '4px',
        marginTop: '-4px',
      },
    };
    return (
      <div style={styles.root}>
        <Tabs value={this.state.tabIndex} onChange={this.handleChange.bind(this)}
          style={styles.tabs}
          inkBarStyle={styles.inkBar}
          tabItemContainerStyle={{backgroundColor: 'transparent'}}>
          <Tab label='Home' value='/' style={styles.tab} />
          <Tab label='Sign Up' value='/signup' style={styles.tab} />
          <Tab label='Log In' value='/login' style={styles.tab} />
        </Tabs>
      </div>
    );
  }
}

NavBar.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
  router: React.PropTypes.object.isRequired
}
export default Radium(NavBar);
