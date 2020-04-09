const BASE_URL = "http://localhost:3001"
const LOGIN_URL = `${BASE_URL}/login`
const VALIDATE_URL = `${BASE_URL}/validate`
const EXERCISES_URL = `${BASE_URL}/exercises`
const WORKOUTS_URL = `${BASE_URL}/workouts`

const getLoggedIn = url => fetch(url, {
    headers: {
        Authorization: localStorage.getItem("token")
    }
}).then(res => res.json())

const login = (email, password) => {
    return fetch(LOGIN_URL, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ user: { email, password } })
    })
        .then(res => res.json())
        .then(data => {
            if (data.token) {
                localStorage.setItem("token", data.token)
            }
            return data.user
        })
}

const validateToken = () => fetch(VALIDATE_URL, {
    headers: {
        Authorization: localStorage.getItem("token")
    }
}).then(res => res.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem("token", data.token)
        }
        return data.user
    })

const getExercises = () => getLoggedIn(EXERCISES_URL)
const postWorkout = (workout) => fetch(WORKOUTS_URL,{
        method: "POST",
        headers: {
            Authorization: localStorage.getItem("token"),
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ workout:workout })
    }).then(resp => resp.json())

export default {
    login,
    validateToken,
    getExercises,
    postWorkout
}