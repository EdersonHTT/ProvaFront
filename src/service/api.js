const BASE_URL = "http://localhost:3000"

function getHeaders(extras = {}) {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "aplication/json",
        ...( token? { authorization: `Bearer: ${token}` } : {}),
        ...extras
    }
}

async function request(path , options = {}) {
    const res = await fetch(`${BASE_URL}${path}`, {
        headers: getHeaders(options.headers),
        ...options
    })
    console.log(res.headers())

    if(!res.ok) {
        const text = await res.text()
        throw new Error(text | "Requisição falhou");
    }

    const contentType = await res.headers.get("content-type") | ""
    if(contentType.includes("aplication/json")) {
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