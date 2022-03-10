import React from "react";
import { reduxForm } from "redux-form";
import { required } from "../../utils/validators/validators";
import { createField, Input } from "../common/FormsControlls/FormsControlls";
import { connect } from "react-redux";
import { login } from "../../redux/auth-reducer";
import { Redirect } from "react-router-dom";
import style from "./../common/FormsControlls/FormsControls.module.css";

const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
	return (
		<form onSubmit={handleSubmit}>
			{createField("Email", "email", Input, [required])}
            {createField("Password", "password", Input, [required], {type: "password"})}
            {createField(null, "rememberMe", Input, [], {type: "checkbox"}, "remember me")}
			{captchaUrl && <img src={captchaUrl} alt="captcha"/>}
			{captchaUrl && createField("Symbols", "captcha", Input, [required], "remember me")}
			{error && <div className={style.formSummaryError}>{error}</div>}
			<div>
				<button>Login</button>
			</div>
		</form>
	);
};

const LoginReduxForm = reduxForm({ form: "login" })(LoginForm);

const Login = (props) => {
	const onSubmit = (formData) => {
		props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
	};

	if (props.isAuth) {
		return <Redirect to={"/profile"} />;
	}

	return (
		<div>
			<h1>LOGIN</h1>
			<LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
		</div>
	);
};

const mapStateToProps = (state) => ({
	captchaUrl: state.auth.captchaUrl,
	isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, { login })(Login);
