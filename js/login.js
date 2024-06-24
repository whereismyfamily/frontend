const username = document.getElementById("email")
const password = document.getElementById("senha")
const btn = document.getElementById('submitBtn')
const error = document.getElementById('error')
const form = document.getElementById('form')

const showError = () => {
    error.innerHTML = "<p style='margin: 0; text-align:left; color: red'>Email/Senha incorretos. Tente novamente!</p>"
}

const handleLogin = (e) => {
    e.preventDefault()
    const email = username.value
    const psw = password.value

    if (email === "vladimir.putin@kremlin.ru" && psw === "12345678") {
        window.location.pathname = "frontend"
        error.innerHTML = ""
    } else {
        showError()
    }
}

btn.onclick = handleLogin
form.onsubmit = handleLogin
