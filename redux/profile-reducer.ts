import { stopSubmit } from "redux-form";
import { profileAPI, usersAPI } from "../api/api";
import { PhotosType, postsType, ProfileType } from "../types/types";

const ADD_POST = "ADD_POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";


let initialState = {
	posts: [
		{ id: 1, message: "Hi, how are you?", likesCount: 12 },
		{ id: 2, message: "I am fine! It my first post!", likesCount: 11 },
		{ id: 3, message: "Yoooo!", likesCount: 99 },
	] as Array<postsType>,
	profile: null as ProfileType | null,
	status: "",
	newPostText: "",
};

export type initialStateType = typeof initialState;

const profileReducer = (
	state = initialState,
	action: any
): initialStateType => {
	switch (action.type) {
		case ADD_POST: {
			let newPost = {
				id: 5,
				message: action.newPostText,
				likesCount: 0,
			};
			return {
				...state,
				posts: [...state.posts, newPost],
				newPostText: "",
			};
		}

		case DELETE_POST: {
			return {
				...state,
				posts: state.posts.filter((p) => p.id !== action.postId),
			};
		}
		case SET_USER_PROFILE:
			return { ...state, profile: action.profile };
		case SAVE_PHOTO_SUCCESS:
			return {
				...state,
				profile: { ...state.profile, photos: action.photos },
			};
		case SET_STATUS:
			return { ...state, status: action.status };
		default:
			return state;
	}
};

type AddPostActionCreatorType = {
	type: typeof ADD_POST;
	newPostText: string;
};

type SetUserProfileType = {
	type: typeof SET_USER_PROFILE;
	profile: ProfileType;
};

type SetStatusType = {
	type: typeof SET_STATUS;
	status: string;
};

type DeletePostType = {
	type: typeof DELETE_POST;
	postId: number;
};

type SavePhotoSuccessType = {
	type: typeof SAVE_PHOTO_SUCCESS;
	photos: PhotosType;
};


export const addPostActionCreator = (
	newPostText: string
): AddPostActionCreatorType => ({
	type: ADD_POST,
	newPostText,
});
export const setUserProfile = (profile: ProfileType): SetUserProfileType => ({
	type: SET_USER_PROFILE,
	profile,
});
export const setStatus = (status: string): SetStatusType => ({
	type: SET_STATUS,
	status,
});
export const deletePost = (postId: number): DeletePostType => ({
	type: DELETE_POST,
	postId,
});
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessType => ({
	type: SAVE_PHOTO_SUCCESS,
	photos,
});

export const getUserProfile = (userId: number) => async (dispatch: any) => {
	const response = await usersAPI.getProfile(userId);
	dispatch(setUserProfile(response.data));
};
export const getStatus = (status: string) => async (dispatch: any) => {
	const response = await profileAPI.getStatus(status);
	dispatch(setStatus(response.data));
};
export const updateStatus = (status: string) => async (dispatch: any) => {
	const response = await profileAPI.updateStatus(status);
	if (response.data.resultCode === 0) {
		dispatch(setStatus(status));
	}
};
export const savePhoto = (file: any) => async (dispatch: any) => {
	const response = await profileAPI.savePhoto(file);
	if (response.data.resultCode === 0) {
		dispatch(savePhotoSuccess(response.data.data.photos));
	}
};

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
	const userId = getState().auth.userId;
	const response = await profileAPI.saveProfile(profile);
	if (response.data.resultCode === 0) {
		dispatch(getUserProfile(userId));
	} else {
		dispatch(
			stopSubmit("edit-profile", { _error: response.data.messages[0] })
		);
		return Promise.reject(response.data.messages[0]);
	}
};

export default profileReducer;
