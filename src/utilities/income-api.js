import sendRequest from "./users-api"
// const BASE_URL = "/api/income"
const BASE_URL = "https://expense-tracker-server-6vdh.onrender.com/api/income"

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