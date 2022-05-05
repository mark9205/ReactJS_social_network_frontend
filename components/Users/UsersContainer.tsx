import React, { Component } from "react";
import { connect } from "react-redux";
import {
	follow,
	getUsers,
	setPage,
	toggleFollowingInProgress,
	unfollow,
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import {
	getCurrentPage,
	getFollowingInProgress,
	getIsFetching,
	getPageSize,
	getTotalUsersCount,
	getUsersSuperSelector,
} from "../../redux/users-selectors";
import { UserType } from "../../types/types";
import { AppStateType } from "../../redux/redux-store";

type MapStatePropsType = {
	currentPage: number;
	pageSize: number;
	isFetching: boolean;
	totalCount: number;
	users: Array<UserType>;
	followingInProgress: Array<number>;
};

type MapDispatchPropsType = {
	follow: (userID: number) => void;
	unfollow: (userID: number) => void;
	getUsers: (currentPage: number, pageSize: number) => void;	
};

type OwnPropsType = {
	pageTitle: string;
};

type PropsType = MapDispatchPropsType & MapStatePropsType & OwnPropsType;

class UsersContainer extends Component<PropsType> {
	componentDidMount() {
		let { currentPage, pageSize } = this.props;
		this.props.getUsers(currentPage, pageSize);
	}

	onPageChanged = (pageNumber: number) => {
		let { pageSize } = this.props;
		this.props.getUsers(pageNumber, pageSize);
	};

	render() {
		return (
			<>
				<h2>{this.props.pageTitle}</h2>
				{this.props.isFetching ? <Preloader /> : null}
				<Users
					totalUsersCount={this.props.totalCount}
					pageSize={this.props.pageSize}
					currentPage={this.props.currentPage}
					onPageChanged={this.onPageChanged}
					users={this.props.users}
					follow={this.props.follow}
					unfollow={this.props.unfollow}
					followingInProgress={this.props.followingInProgress}
				/>
			</>
		);
	}
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
	return {
		users: getUsersSuperSelector(state),
		pageSize: getPageSize(state),
		totalCount: getTotalUsersCount(state),
		currentPage: getCurrentPage(state),
		isFetching: getIsFetching(state),
		followingInProgress: getFollowingInProgress(state),
	};
};

export default compose(
	withAuthRedirect,
	connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
		mapStateToProps,
		{
			follow,
			unfollow,
			getUsers,
		}
	)
)(UsersContainer);
