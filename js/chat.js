const chat = document.getElementById('chat')

window.onload = () => {
    const loading = document.createElement('div')
    loading.className = 'd-flex justify-content-center align-items-center'
    loading.innerHTML = `
        <svg id="svgLoading" width="100" height="100" viewBox="0 0 250 250" class="circular-progress">
            <circle class="bg"></circle>
            <circle class="fg"></circle>
        </svg>
    `
    chat.appendChild(loading)
}

const truncate = (string, length) => ({truncatedString: string.substring(0, length), isTruncated: string.length > length})

const populateChats = async ({users, messages}) => {
    const loading = document.getElementById("svgLoading")
    loading.remove()
    for (userIndex in users) {
        const hour = Math.floor(Math.random() * 24)
        const minute = Math.floor(Math.random() * 60)
        const user = users[userIndex]
        const message = messages[userIndex]
        const messageElement = document.createElement('div')
        const hr = document.createElement('hr')

        messageElement.className = 'd-flex align-items-center'
        messageElement.innerHTML = `
            <img class="members-profile-pic" src="${user.picture.large}" alt="">
            <div class="members-message-item">
                <p class="message-name">${user.name.first} ${user.name.last}</p>
                <p class="message-content">${message.truncatedString}${message.isTruncated ? '...' : ''}</p>
                <p class="message-time">${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}</p>
            </div> 
        `
        chat.appendChild(messageElement)
        chat.appendChild(hr)
    }
}

fetch('https://randomuser.me/api/?results=9&nat=br').then(res => res.json()).then(async res => {
    const messagePromises = []
    for (let i=0; i<9; i++) {
        const messagePromise = fetch('https://api-random.vercel.app/').then(res => res.json()).then(res => truncate(res.mensage, 100))
        messagePromises.push(messagePromise)
    }
    const messages = await Promise.all(messagePromises)
    return {messages, users: res.results}
}).then(res => populateChats(res))
