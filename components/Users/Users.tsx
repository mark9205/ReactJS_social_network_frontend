import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UserType} from '../../types/types'

type PropsType = {
	totalUsersCount: number;
	currentPage: number;
	onPageChanged: (p: number) => void;
	pageSize: number;
	users: Array<UserType>
	followingInProgress: Array<number>
	follow: (userID: number) => void
	unfollow: (userID: number) => void
};

let Users: React.FC<PropsType> = ({
	totalUsersCount,
	pageSize,
	onPageChanged,
	currentPage,
	users,
	...props
}) => {
	return (
		<div>
			<Paginator
				totalItemsCount={totalUsersCount}
				pageSize={pageSize}
				onPageChanged={onPageChanged}
				currentPage={currentPage}
			/>
			<div>
				{users.map((u) => (
					<User
						key={u.id}
						user={u}
						follow={props.follow}
						unfollow={props.unfollow}
						followingInProgress={props.followingInProgress}
					/>
				))}
			</div>
		</div>
	);
};

export default Users;
