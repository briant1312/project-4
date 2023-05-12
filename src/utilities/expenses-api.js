import sendRequest from "./users-api"
// const BASE_URL = "/api/expenses"
const BASE_URL = "https://expense-tracker-server-6vdh.onrender.com/api/expenses"

export async function show() {
    return sendRequest(BASE_URL, "GET")
}

export async function create(expenseData) {
    return sendRequest(BASE_URL, "POST", expenseData)
}

export async function remove(expenseId) {
    return sendRequest(`${BASE_URL}/${expenseId}`, "DELETE")
}

export async function update(expenseId, expenseData) {
    return sendRequest(`${BASE_URL}/${expenseId}`, "PATCH", expenseData)
}