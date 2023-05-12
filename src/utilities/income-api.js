import sendRequest from "./users-api"
const BASE_URL = process.env.REACT_APP_BASE_URL + "income"

export async function show() {
    return sendRequest(BASE_URL, "GET")
}

export async function create(incomeData) {
    return sendRequest(BASE_URL, "POST", incomeData)
}

export async function remove(incomeId) {
    return sendRequest(`${BASE_URL}/${incomeId}`, "DELETE")
}

export async function update(incomeId, incomeData) {
    return sendRequest(`${BASE_URL}/${incomeId}`, "PATCH", incomeData)
}