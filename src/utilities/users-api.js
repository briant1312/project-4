import { getToken } from "./users-service"
const BASE_URL = process.env.REACT_APP_BASE_URL + "users"

export async function signUp(userData) {
    return sendRequest(BASE_URL, 'POST', userData)
}

export async function logIn(credentials) {
    return sendRequest(`${BASE_URL}/log-in`, 'POST', credentials)
}

export default async function sendRequest(url, method='GET', payload=null) {
    const options = { method }
    if(payload) {
        options.headers = { 'Content-Type': 'application/json'}
        options.body = JSON.stringify(payload)
    }
    const token = getToken()
    if(token) {
        options.headers = options.headers || {}
        options.headers.Authorization = `Bearer ${token}`
    }
    const res = await fetch(url, options)
    if(res.ok) {
        if(res.status === 204) {
            return res
        } else {
            return res.json()
        }
    } else {
        const error = await res.json();
        throw new Error(error)
    }
}

export async function checkToken() {
    return sendRequest(BASE_URL + '/check-token')
}
