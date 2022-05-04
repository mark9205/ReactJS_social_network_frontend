import { authAPI, securityAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = "SET_USER_DATA";
const GET_CAPTCHA_URL_SUCCESS = "GET_CAPTCHA_URL_SUCCESS";

export type initialStateType = {
	userId: number | null;
	login: string | null;
	email: string | null;
	isAuth: boolean;
	captchaUrl: string | null;
};

let initialState: initialStateType = {
	userId: null,
	login: null,
	email: null,
	isAuth: false,
	captchaUrl: null,
};

const authReducer = (state = initialState, action: any): initialStateType => {
	switch (action.type) {
		case SET_USER_DATA:
		case GET_CAPTCHA_URL_SUCCESS:
			return {
				...state,
				...action.data,
			};
		default:
			return state;
	}
};

type setAuthUserDataType = {
	userId: number;
	email: string;
	login: string;
	isAuth: boolean;
};

type setAuthUserType = {
	type: typeof SET_USER_DATA;
	data: setAuthUserDataType;
};

export const setAuthUserData = (
	userId: number,
	email: string,
	login: string,
	isAuth: boolean
): setAuthUserType => ({
	type: SET_USER_DATA,
	data: { userId, email, login, isAuth },
});

type captchaUrlType = {
	captchaUrl: string;
};

type getCaptchaUrlSuccessType = {
	type: typeof GET_CAPTCHA_URL_SUCCESS;
	data: captchaUrlType;
};

export const getCaptchaUrlSuccess = (
	captchaUrl: captchaUrlType
): getCaptchaUrlSuccessType => ({
	type: GET_CAPTCHA_URL_SUCCESS,
	data: captchaUrl,
});

export const getAuthThunkCreator = () => async (dispatch: any) => {
	let data = await authAPI.authMe();
	if (data.resultCode === 0) {
		let { id, login, email } = data.data;
		dispatch(setAuthUserData(id, login, email, true));
	}
};

export const login =
	(email: string, password: string, rememberMe: boolean, captcha: string) =>
	async (dispatch: any) => {
		let response = await authAPI.login(
			email,
			password,
			rememberMe,
			captcha
		);
		if (response.data.resultCode === 0) {
			dispatch(getAuthThunkCreator());
		} else {
			if (response.data.resultCode === 10) {
				dispatch(getCaptchaUrl());
			}
			let message =
				response.data.messages.length > 0
					? response.data.messages[0]
					: "Some error";
			dispatch(stopSubmit("login", { _error: message }));
		}
	};

export const getCaptchaUrl = () => async (dispatch) => {
	const response = await securityAPI.getCaptchaUrl();
	const captchaUrl = response.data.url;
	dispatch(getCaptchaUrlSuccess(captchaUrl));
};

export const logout = () => async (dispatch) => {
	let response = await authAPI.logout();
	if (response.data.resultCode === 0) {
		dispatch(setAuthUserData(null, null, null, false));
	}
};
export default authReducer;
