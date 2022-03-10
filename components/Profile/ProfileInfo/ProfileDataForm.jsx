import React from "react";
import { reduxForm } from "redux-form";
import {
	createField,
	Input,
	TextArea,
} from "./../../common/FormsControlls/FormsControlls";
import style from "./../../common/FormsControlls/FormsControls.module.css";

const ProfileDataForm = ({ handleSubmit, profile, error }) => {
	return (
		<form onSubmit={handleSubmit}>
			<div><button>save</button></div>
			{error && <div className={style.formSummaryError}>{error}</div>}
			<div>
				<b>full Name: </b>
				{createField("Full name", "fullName", Input, [])}
			</div>
			<div>
				<b>Looking For A Job: </b>
				{createField("", "lookingForAJob", Input, [], {type: "checkbox"})}
			</div>
			<div>
				<b>Job Description: </b>
				{createField("Job Description", "lookingForAJobDescription", TextArea, [] )}
			</div>
			<div>
				<b>About Me: </b>
				{createField("About Me", "aboutMe", TextArea, [])}
			</div>
			<div>
				<b>contacts: </b>
				{Object.keys(profile.contacts).map((key) => {
					return <div key={key}><b>{key}: {createField("key", "contacts."+ key, Input, [])}</b></div>
				})}
			</div>
		</form>
	);
};

const ProfileDataReduxForm = reduxForm({ form: "edit-profile" })(ProfileDataForm);

export default ProfileDataReduxForm;
