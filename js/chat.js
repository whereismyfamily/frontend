const chat = document.getElementById('chat')

const truncate = (string, length) => {
    console.log(string.length, length)
    return {truncatedString: string.substring(0, length), isTruncated: string.length > length}
};

const populateChats = async (users) => {
    for (userIndex in users) {
        const hour = Math.floor(Math.random() * 24)
        const minute = Math.floor(Math.random() * 60)
        const user = users[userIndex]
        const messageElement = document.createElement('div')
        const hr = document.createElement('hr')
        const messageResponse = await fetch('https://api-random.vercel.app/').then(res => res.json())
        const message = truncate(messageResponse.mensage, 100)

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

fetch('https://randomuser.me/api/?results=9&nat=br').then(res => res.json()).then(res => populateChats(res.results))
