import { usersAPI } from "../api/api";
import { UserType } from "../types/types";
import { updateObjectInArray } from "../utils/object-helpers";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_COUNT = "SET_TOTAL_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";

let initialState = {
	users: [] as Array<UserType>,
	pageSize: 20,
	totalCount: 0,
	currentPage: 1,
	isFetching: false,
	followingInProgress: [] as Array<number>, //array of users id
};

type initialStateType = typeof initialState;

const usersReducer = (state = initialState, action: any): initialStateType => {
	switch (action.type) {
		case FOLLOW:
			return {
				...state,
				users: updateObjectInArray(state.users, action.userID, "id", {
					followed: true,
				}),
			};
		case UNFOLLOW:
			return {
				...state,
				users: updateObjectInArray(state.users, action.userID, "id", {
					followed: false,
				}),
			};
		case SET_USERS: {
			return { ...state, users: action.users };
		}
		case SET_CURRENT_PAGE: {
			return { ...state, currentPage: action.currentPage };
		}
		case SET_TOTAL_COUNT: {
			return { ...state, totalCount: action.totalCount };
		}
		case TOGGLE_IS_FETCHING: {
			return { ...state, isFetching: action.isFetching };
		}
		case TOGGLE_IS_FOLLOWING_PROGRESS: {
			return {
				...state,
				followingInProgress: action.isFetching
					? [...state.followingInProgress, action.userID]
					: state.followingInProgress.filter(
							(id) => id !== action.userID
					  ),
			};
		}
		default:
			return state;
	}
};

type FollowSuccessActionType = {
	type: typeof FOLLOW;
	userID: number;
};

type UnfollowSuccessActionType = {
	type: typeof UNFOLLOW;
	userID: number;
};

type SetUsersActionType = {
	type: typeof SET_USERS;
	users: Array<UserType>;
};

type SetPageActionType = {
	type: typeof SET_CURRENT_PAGE;
	currentPage: number;
};

type SetTotalCountActionType = {
	type: typeof SET_TOTAL_COUNT;
	totalCount: number;
};

type ToggleIsFetchingActionType = {
	type: typeof TOGGLE_IS_FETCHING;
	isFetching: boolean;
};

type ToggleFollowingInProgressActionType = {
	type: typeof TOGGLE_IS_FOLLOWING_PROGRESS;
	isFetching: boolean;
	userID: number;
};

export const followSuccess = (userID: number): FollowSuccessActionType => ({
	type: FOLLOW,
	userID,
});
export const unfollowSuccess = (userID: number): UnfollowSuccessActionType => ({
	type: UNFOLLOW,
	userID,
});
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({
	type: SET_USERS,
	users,
});
export const setPage = (currentPage: number): SetPageActionType => ({
	type: SET_CURRENT_PAGE,
	currentPage,
});
export const setTotalCount = (totalCount: number): SetTotalCountActionType => ({
	type: SET_TOTAL_COUNT,
	totalCount,
});
export const toggleIsFetching = (
	isFetching: boolean
): ToggleIsFetchingActionType => ({
	type: TOGGLE_IS_FETCHING,
	isFetching,
});
export const toggleFollowingInProgress = (
	isFetching: boolean,
	userID
): ToggleFollowingInProgressActionType => ({
	type: TOGGLE_IS_FOLLOWING_PROGRESS,
	isFetching,
	userID,
});

export const getUsers = (currentPage: number, pageSize: number) => {
	return async (dispatch: any) => {
		dispatch(toggleIsFetching(true));
		dispatch(setPage(currentPage));
		let data = await usersAPI.getUsers(currentPage, pageSize);
		dispatch(toggleIsFetching(false));
		dispatch(setUsers(data.items));
		dispatch(setTotalCount(data.totalCount));
	};
};

const followUnfollowFlow = async (
	dispatch: any,
	userID: any,
	apiMethod: any,
	actionCreator: any
) => {
	dispatch(toggleFollowingInProgress(true, userID));
	let response = await apiMethod(userID);
	if (response.data.resultCode === 0) {
		dispatch(actionCreator(userID));
	}
	dispatch(toggleFollowingInProgress(false, userID));
};

export const follow = (userID: number) => {
	return async (dispatch: any) => {
		followUnfollowFlow(
			dispatch,
			userID,
			usersAPI.followOfUser.bind(usersAPI),
			followSuccess
		);
	};
};

export const unfollow = (userID: number) => {
	return async (dispatch: any) => {
		followUnfollowFlow(
			dispatch,
			userID,
			usersAPI.unfollowOfUser.bind(usersAPI),
			unfollowSuccess
		);
	};
};

export default usersReducer;
