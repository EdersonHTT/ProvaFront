const BASE_URL = "http://localhost:3000"

function getHeaders(extras = {}) {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        ...( token? { Authorization: `Bearer: ${token}` } : {}),
        ...extras
    }
}

async function request(path , options = {}) {
    const res = await fetch(`${BASE_URL}${path}`, {
        headers: getHeaders(options.headers ||{}),
        ...options
    })
    console.log(res)

    if(!res.ok) {
        const text = await res.text()
        throw new Error(text || "Requisição falhou");
    }

    const contentType = res.headers.get("content-type") || ""
    if(contentType.includes("application/json")) {
        return res.json();
    }
    return null;
}

export const api = {
    get: (path) => request(path),
    post: (path, body) => request(path, {method: "POST", body: JSON.stringify(body)}),
    put: (path, body) => request(path, {method: "PUT", body: JSON.stringify(body)}),
    delete: (path, body) => request(path, {method: "DELETE", body: JSON.stringify(body)}),
}