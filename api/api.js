import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {"API-KEY": "9741b6b2-542a-44d1-8d22-5678e207f174"}
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            })
    },
    getProfile(id) {
        return profileAPI.getProfile(id)
    },
    unfollowOfUser (id) {
        return instance.delete(`follow/${id}`)
    },
    followOfUser (id) {
        return instance.post(`follow/${id}`)
    },
}

export const profileAPI = {
    getProfile(id) {
        return instance.get(`profile/${id}`)
    },
    getStatus(id) {
        return instance.get(`profile/status/${id}`)
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {status: status})
    },
    savePhoto(photoFile) {
        const formData = new FormData()
        formData.append('image', photoFile)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile) {
        return instance.put(`profile`, profile)
    },
}

export const authAPI = {
    authMe () {
        return instance.get(`auth/me`)
            .then(response => {
                return response.data;
            })
    },
    login (email, password, rememberMe = false, captcha=null) {
        return instance.post(`auth/login`, { email, password, rememberMe, captcha })
    },
    logout () {
        return instance.delete(`auth/login`)
    }
}

export const securityAPI = {
    getCaptchaUrl () {
        return instance.get(`security/get-captcha-url`)
    }
}
