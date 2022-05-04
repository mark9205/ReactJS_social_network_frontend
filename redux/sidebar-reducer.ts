let initialState = {
	friends: [
		{
			id: 1,
			name: "Valery",
			img: "https://assets.faceit-cdn.net/avatars/c1877281-c815-4f1e-b7c1-748f37867d5a_1550985853380.jpg",
		},
		{
			id: 2,
			name: "Valentina",
			img: "https://sun1-24.userapi.com/c845523/v845523525/20d1f5/jg1oeuOOVfc.jpg",
		},
		{
			id: 3,
			name: "Gleb",
			img: "https://store.playstation.com/store/api/chihiro/00_09_000/container/RU/ru/999/EP1566-CUSA03655_00-AV00000000000019/1590753122000/image?w=240&amp;h=240&amp;bg_color=000000&amp;opacity=100&amp;_version=00_09_000",
		},
	],
};

type InitialStateType = typeof initialState;

const sidebarReducer = (
	state = initialState,
	action: any
): InitialStateType => {
	return state;
};

export default sidebarReducer;
