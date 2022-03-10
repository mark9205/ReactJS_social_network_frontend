import React, { Component } from "react";
import { connect } from "react-redux";
import { initializeApp } from "./redux/app-reducer";
import "./App.css";
import { Route, withRouter } from "react-router-dom";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import NavBar from "./components/Navbar/Navbar";
import MyNewsContainer from "./components/News/MyNewsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import { compose } from "redux";
import { Provider } from "react-redux";
import store from "./redux/redux-store";
import { withSuspense } from "./hoc/withSuspense";
import { BrowserRouter } from "react-router-dom";
import { Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

class App extends Component {
	componentDidMount() {
		this.props.initializeApp();
	}
	render() {
		
		return (
			<div className="app-wrapper">
				<HeaderContainer />
				<NavBar />
				<div className="app-wrapper-content">
					<Switch>
						<Route path="/dialogs" render={withSuspense(DialogsContainer)}/>
						<Route path="/profile/:userId?" render={withSuspense(ProfileContainer)}/>
						<Route path="/news" render={() => <MyNewsContainer />} />
						<Route path="/music" render={() => <Music />} />
						<Route path="/settings" render={() => <Settings />} />
						<Route path="/users" render={() => <UsersContainer />} />
						<Route path="/login" render={() => <LoginPage />} />
						<Route exact path="/" render={() => <Redirect to={'/profile'} />}/>
					</Switch>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	initialized: state.app.initialized,
});

let AppContainer = compose(
	withRouter,
	connect(mapStateToProps, { initializeApp }))(App);

const MainApp = (props) => {
	return (
		<BrowserRouter>
			<Provider store={store}>
				<AppContainer />
			</Provider>
		</BrowserRouter>
	);
};

export default MainApp;
