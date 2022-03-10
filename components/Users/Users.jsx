import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

let Users = ({
	totalUsersCount,
	pageSize,
	onPageChanged,
	currentPage,
	pagesCount,
	users,
	...props
}) => {
	return (
		<div>
			<Paginator
				totalItemsCount={totalUsersCount}
				pageSize={pageSize}
				onPageChanged={onPageChanged}
				pagesCount={pagesCount}
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
