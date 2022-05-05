import { createSelector } from "reselect";
import { AppStateType } from "./redux-store";

const getUsersSimpleSelector = (state: AppStateType) => {
	return state.usersPage.users;
};

export const getUsersSuperSelector = createSelector(
	getUsersSimpleSelector, (users) => {
	return users.filter((u) => true);
}); 

export const getPageSize = (state: AppStateType) => {
	return state.usersPage.pageSize;
};

export const getTotalUsersCount = (state: AppStateType) => {
	return state.usersPage.totalCount;
};

export const getCurrentPage = (state: AppStateType) => {
	return state.usersPage.currentPage;
};

export const getIsFetching = (state: AppStateType) => {
	return state.usersPage.isFetching;
};

export const getFollowingInProgress = (state: AppStateType) => {
	return state.usersPage.followingInProgress;
};
