import * as React from 'react';
import { FormEvent } from 'react';
import { bindActionCreators, Action } from 'redux';
import { MapStateToProps, connect, Connect, MapDispatchToProps, Dispatch } from 'react-redux';
import axios from 'axios';
import { HomeForm } from './HomeForm';
import { UsersList } from './UsersList';
import { usersActions } from '../../actions/usersActions';
import { IHomePageState, IHomePageProps, IStateProps, IDispatchProps } from '../../interfaces/HomePage';
import { IUser, IInitialState } from '../../interfaces/general';



const defaultHomePageState: IHomePageState = {
  user: {
    github: '',
    name: ''
  },
  loading: false
}

export class HomePage extends React.Component<IHomePageProps, IHomePageState> {
  constructor(props: IHomePageProps) {
    super(props);
    this.state = defaultHomePageState;
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event: FormEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const user: IUser = {
      ...this.state.user,
      [input.name]: input.value
    };
    this.setState({ user });
  }

  onFormSubmit(event: FormEvent<HTMLFormElement>) {
    this.setState({ loading: true });
    this.props.actions.addUser(this.state.user)
      .then(() => this.setState(defaultHomePageState))
      .catch((error: Error) => {
        alert(error);
      });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <HomeForm onInputChange={this.onInputChange} onFormSubmit={this.onFormSubmit} loading={this.state.loading} user={this.state.user} />
        {this.props.users.length > 0 && <UsersList users={this.props.users} />}
        {this.state.loading && <p>Loading</p>}
      </div>
    );
  }
}

const mapStateToProps: MapStateToProps<IStateProps, any, IInitialState> = (state) => {
  return {
    users: state.users
  };
}

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, any> = (dispatch: Dispatch<any>) => {
  return {
    actions: bindActionCreators(usersActions, dispatch)
  }
}

export const HomePageConnected = connect(mapStateToProps, mapDispatchToProps)(HomePage);