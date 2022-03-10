import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import { Field, reduxForm } from "redux-form";
import {
	maxLenghtCreator,
	required,
} from "../../../utils/validators/validators";
import { TextArea } from "../../common/FormsControlls/FormsControlls";

const maxLenght10 = maxLenghtCreator(10);

let AddNewPostForm = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				<Field
					name="newPostText"
					component={TextArea}
					placeholder={"Post message"}
					validate={[required, maxLenght10]}
				/>
			</div>
			<div>
				<button>Add post</button>
			</div>
			<button>Remove</button>
		</form>
	);
};

const MyPosts = React.memo(props => {
	let postsElements = props.posts.map((post) => (
		<Post message={post.message} likesCount={post.likesCount} />
	));

	let onAddPost = values => {
		props.addPost(values.newPostText);
	};

	return (
		<div className={s.postsblock}>
			<h3>My_posts</h3>
			<AddNewPostForm onSubmit={onAddPost} />
			<div className={s.posts}>{postsElements}</div>
		</div>
	);
});

AddNewPostForm = reduxForm({ form: "profileAddNewPostForm" })(AddNewPostForm);

export default MyPosts;
