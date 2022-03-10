
import profileReducer, {
	addPostActionCreator,
	deletePost,
} from "./profile-reducer";

let state = {
	posts: [
		{ id: 1, message: "Hi, how are you?", likesCount: 12 },
		{ id: 2, message: "I am fine! It my first post!", likesCount: 11 },
		{ id: 3, message: "Yoooo!", likesCount: 99 },
	],
};

it("new post should be added", () => {
	let action = addPostActionCreator("it-kamasutra");
	let newState = profileReducer(state, action);
	expect(newState.posts.length).toBe(4);
});

it("message of new post should be correct", () => {
	let action = addPostActionCreator("it-kamasutra");
	let newState = profileReducer(state, action);
	expect(newState.posts[3].message).toBe("it-kamasutra");
});

it("after deleting length should be decrement", () => {
	let action = deletePost(1);
	let newState = profileReducer(state, action);
	expect(newState.posts.length).toBe(2);
});

