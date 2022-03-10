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

class UsersContainer extends Component {
	componentDidMount() {
		let {currentPage, pageSize} = this.props
		this.props.getUsers(currentPage, pageSize);
	}

	onPageChanged = (pageNumber) => {
		let {pageSize} = this.props
		this.props.getUsers(pageNumber, pageSize);
	};

	render() {
		return (
			<>
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

let mapStateToProps = (state) => {
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
	connect(mapStateToProps, {
		follow,
		unfollow,
		setPage,
		toggleFollowingInProgress,
		getUsers,
	})
)(UsersContainer);
