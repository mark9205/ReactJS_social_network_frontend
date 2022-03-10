import React, { useState } from "react";
import s from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import nowork from "./../../../assets/images/no_work.png";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataReduxForm from "./ProfileDataForm";

const ProfileInfo = ({ profile, status, updateStatus, savePhoto, isOwner, saveProfile }) => {
	
    const [editMode, setEditMode] = useState(false);
    
    if (!profile) {
		return <Preloader />;
	}

	const onMainPhotoSelected = (e) => {
		if (e.target.files.length) {
			savePhoto(e.target.files[0]);
		}
	};

	const onSubmit = (formData) => {
		saveProfile(formData).then(()=>{
			setEditMode(false)
		})
	};

	return (
		<div>
			<div className={s.descr}>
				<img
					src={profile.photos.large || nowork}
					className={s.mainPhoto}
					alt=""
				/>
				{isOwner && (
					<input type="file" onChange={onMainPhotoSelected} />
				)}
                {editMode
                ? <ProfileDataReduxForm
					profile={profile}
					onSubmit={onSubmit}
					initialValues={profile}/> 
                : <ProfileData 
                    profile={profile} 
                    isOwner={isOwner}
                    goToEditMode={() => {setEditMode(true)}}
                 />}
                
				<ProfileStatusWithHooks
					status={status}
					updateStatus={updateStatus}
				/>
				<div>{profile.fullname}</div>
			</div>
		</div>
	);
};

const ProfileData = ({ profile, isOwner, goToEditMode}) => {
	return (
		<div>
            {isOwner && <div><button onClick={goToEditMode}>edit</button></div>}
			<div className={s.textInfo}>Profile Info</div>

			<div>
				<div>
					<b>full Name: </b>
					{profile.fullName}
				</div>
				<div>
					<b>Looking For A Job: </b>
					{profile.lookingForAJob ? "yes" : "no"}
				</div>
				{profile.lookingForAJob && (
					<div>
						<b>Job Description: </b>
						{profile.lookingForAJobDescription}
					</div>
				)}
				<div>
					<b>About Me: </b>
					{profile.aboutMe}
				</div>
				<div>
					<b>contacts: </b>
					{Object.keys(profile.contacts).map((key) => {
						return (
							<Contact
								key={key}
								contactTitle={key}
								contactValue={profile.contacts[key]}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};


const Contact = ({ contactTitle, contactValue }) => {
	return (
		<div>
			<b>{contactTitle}</b>:{contactValue}
		</div>
	);
};

export default ProfileInfo;
