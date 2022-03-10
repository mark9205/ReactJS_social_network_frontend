import { usersAPI } from "../api/api";
import { updateObjectInArray } from "../utils/object-helpers";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_COUNT = "SET_TOTAL_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";

let initialState = {
	users: [],
	pageSize: 20,
	totalCount: 0,
	currentPage: 1,
	isFetching: false,
	followingInProgress: [],
};

const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case FOLLOW:
			return {
				...state,
				users: updateObjectInArray(state.users, action.userID, "id", {followed: true})
			};
		case UNFOLLOW:
			return {
				...state,
				users: updateObjectInArray(state.users, action.userID, "id", {followed: false})
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

export const followSuccess = (userID) => ({ type: FOLLOW, userID });
export const unfollowSuccess = (userID) => ({ type: UNFOLLOW, userID });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setPage = (currentPage) => ({
	type: SET_CURRENT_PAGE,
	currentPage,
});
export const setTotalCount = (totalCount) => ({
	type: SET_TOTAL_COUNT,
	totalCount,
});
export const toggleIsFetching = (isFetching) => ({
	type: TOGGLE_IS_FETCHING,
	isFetching,
});
export const toggleFollowingInProgress = (isFetching, userID) => ({
	type: TOGGLE_IS_FOLLOWING_PROGRESS,
	isFetching,
	userID,
});

export const getUsers = (currentPage, pageSize) => {
	return async (dispatch) => {
		dispatch(toggleIsFetching(true));
		dispatch(setPage(currentPage));
		let data = await usersAPI.getUsers(currentPage, pageSize);
		dispatch(toggleIsFetching(false));
		dispatch(setUsers(data.items));
		dispatch(setTotalCount(data.totalCount));
	};
};

const followUnfollowFlow = async (dispatch,userID,apiMethod,actionCreator) => {
	dispatch(toggleFollowingInProgress(true, userID));
	let response = await apiMethod(userID);
	if (response.data.resultCode === 0) {
		dispatch(actionCreator(userID));
	}
	dispatch(toggleFollowingInProgress(false, userID));
};

export const follow = (userID) => {
	return async (dispatch) => {
		followUnfollowFlow(dispatch, userID, usersAPI.followOfUser.bind(usersAPI), followSuccess);
	};
};

export const unfollow = (userID) => {
	return async (dispatch) => {
		followUnfollowFlow(dispatch, userID, usersAPI.unfollowOfUser.bind(usersAPI), unfollowSuccess);
	};
};

export default usersReducer;
