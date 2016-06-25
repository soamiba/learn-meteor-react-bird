import React, { Component } from 'react';
import Card from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Radium from 'radium';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { HTTP } from 'meteor/http';
import isEmpty from 'lodash/fp/isEmpty';
import UserInfo from './user/UserInfo.jsx';
import '../api/users.js';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  handleClick(e) {
    e.preventDefault();
    Meteor.call('update/user', this.state.user, (error) => {
      if(error) {
        console.log(error);
        return;
      }
      this.context.router.push('/chat');
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const username = this.refs.username.getValue();
    const url = `https://api.github.com/users/${username}`;
    HTTP.call('get', url, (error, res) => {
      if(error) {
        console.log(error);
      } else {
        this.setState({user: JSON.parse(res.content)})
      }
    });
  }

  render() {
    let styles = {
    root: {
      flexGrow: 1,
      overflowY: 'scroll',
      paddingTop: '64px',
      paddingLeft: '16px',
      paddingRight: '16px'
    },
    card: {
      maxWidth: '700px',
      margin: '20px auto',
      padding: '20px',
    }
  };

  let GitHubInfo;
  let currentUser = this.props.currentUser;
    if(!isEmpty(this.state.user)) {
      GitHubInfo = (
        <div>
          <UserInfo userInfo={this.state.user} />
          <RaisedButton
            style={{display: 'block', margin: '30px auto 0', width: '180px'}}
            primary={true}
            label="save"
            onClick={this.handleClick.bind(this)} />
        </div>
      );
    } else if(currentUser && currentUser.avatar_url) {
      GitHubInfo = (
        <UserInfo userInfo={this.props.currentUser} />
      );
    }

    return (
      <div style={styles.root}>
        <Card style={styles.card}>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <TextField
              hintText="GitHub 账号"
              ref='username'
              style={{
              width: '50%',
            }}/>
            <FlatButton
              type="submit"
              primary={true}
              label="search github"
              style={{
              width: '50%',
            }}/>
          </form>
          { GitHubInfo }
        </Card>
      </div>
    );
  }
}

Account.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default createContainer(() => {
  Meteor.subscribe('userInfo');
  return {
    currentUser: Meteor.user(),
  };
}, Radium(Account));
