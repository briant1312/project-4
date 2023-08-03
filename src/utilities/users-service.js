import * as usersAPI from "./users-api"

export async function signUp(userData) {
    try {
        const token = await usersAPI.signUp(userData)

        if(!token) throw new Error('')
        localStorage.setItem('token', token)
        return getUser()
    } catch (err) {
        throw new Error(err.message)
    }
}

export function getToken() {
    const token = localStorage.getItem('token') 
    if(!token) return null
    const payload = token.split('.')[1]
    const decodedPayload = atob(payload)
    const parsedPayload = JSON.parse(decodedPayload)
    if(parsedPayload.exp < Date.now() / 1000) {
        localStorage.removeItem('token')
        return null
    } else {
        return token
    }
}

export function getUser() {
    const token = getToken()
    if(token) {
        const payload = token.split('.')[1]
        const decodedPayload = atob(payload)
        const parsedPayload = JSON.parse(decodedPayload)
        return parsedPayload.user
    } else {
        return null
    }
}

export function logOut() {
    localStorage.removeItem('token')
}

export async function logIn(credentials) {
    const token = await usersAPI.logIn(credentials)
    localStorage.setItem('token', token)
    return getUser()
}

export function checkToken() {
    return usersAPI.checkToken()
        .then(dateStr => new Date(dateStr))
}
