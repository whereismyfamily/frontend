const generalPostsList = document.getElementById('general')
const alertsPostsList = document.getElementById('alerts')
const supportPostsList = document.getElementById('support')

const loadingFeed = document.createElement('div')
loadingFeed.className = 'd-flex justify-content-center align-items-center'
loadingFeed.innerHTML = `
    <svg id="svgLoadingFeed" width="100" height="100" viewBox="0 0 250 250" class="circular-progress slow mt-4">
        <circle class="bg"></circle>
        <circle class="fg"></circle>
    </svg>
`

generalPostsList.appendChild(loadingFeed)


const maleRelatives = ['primo', 'irmao', 'pai', 'tio', 'sobrinho', 'avo', 'neto']
const femaleRelatives = ['prima', 'irma', 'mae', 'tia', 'sobrinha', 'avo', 'neta']

const alertPost = (missingPerson, postOwner) => {
    const relative = missingPerson.gender === "male" ? maleRelatives[Math.floor(Math.random() * maleRelatives.length)] : femaleRelatives[Math.floor(Math.random() * maleRelatives.length)]

    return `
        <div class="d-flex align-items-center">
            <img class="post-profile-pic" src="${postOwner.picture.large}" alt="">
            <div class="ml-1">
                <h4 class="m-0">${postOwner.name.first} ${missingPerson.name.last}</h4>
                <h5 class="post-profile-description m-0">${postOwner.location.city.trim()} • ${Math.floor((Math.random() * 10) + 2)} horas atras</h5>
            </div>
        </div>
        <div class="post-description">
            <h3 class="m-0">Ajude ${postOwner.name.first} a reencontrar ${missingPerson.gender === "male" ? 'o' : 'a'} ${relative} <strong>${missingPerson.name.first} ${missingPerson.name.last}</strong></h3>
            <h5 class="m-0">Sua última localização conhecida foi em ${missingPerson.location.city.trim()}, e a família está ansiosa para reencontrá-l${missingPerson.gender === "male" ? 'o' : 'a'}. Se você tiver qualquer informação sobre seu paradeiro, por favor, <a>entre em contato com a familia ${missingPerson.name.last}.</a></h5>
        </div>
        <img class="post-image w-100" src="${missingPerson.picture.large}" alt="" />
        <ul class="p-0 mt-2 mb-2">
            <li><strong>Idade: </strong> ${missingPerson.dob.age} anos</li>
            <li><strong>Ultima localizacao: </strong> ${missingPerson.location.street.name.trim()}, ${missingPerson.location.city.trim()} - ${missingPerson.location.state}</li>
        </ul>
        <div class="d-flex justify-content-start">
            <button class="mui-btn mui-btn--flat mui-btn--primary m-0">Apoiar</button>
            <button class="mui-btn mui-btn--flat mui-btn--primary m-0">Comentar</button>
        </div>
    `
}

const supportPost = (user, message) => {
    return `
        <div class="d-flex align-items-center">
            <img class="post-profile-pic" src="${user.picture.large}" alt="">
            <div class="ml-1">
                <h4 class="m-0">${user.name.first} ${user.name.last}</h4>
                <h5 class="post-profile-description m-0">${user.location.city.trim()} • ${Math.floor((Math.random() * 10) + 2)} horas atras</h5>
            </div>
        </div>
        <div class="post-description">
            <h5 class="m-0">${message}</h5>
        </div>
        <div class="d-flex justify-content-start">
            <button class="mui-btn mui-btn--flat mui-btn--primary m-0">Apoiar</button>
            <button class="mui-btn mui-btn--flat mui-btn--primary m-0">Comentar</button>
        </div>
    `
}

const populateGeneralPosts = (users, postOwners, messages) => {
    const loading = document.getElementById("svgLoadingFeed")
    loading.remove()
    for (userIndex in users) {
        const postElement = document.createElement('article')
        postElement.className = userIndex === '0' ? 'post-section' : 'post-section mt-3'
        postElement.innerHTML = Math.floor(Math.random() * 2) === 0 ? alertPost(users[userIndex], postOwners[userIndex]) : supportPost(users[userIndex], messages[userIndex])
        generalPostsList.appendChild(postElement)
    }
}

const populateAlertsPosts = (users, postOwners) => {
    for (userIndex in users) {
        const postElement = document.createElement('article')
        postElement.className = userIndex === '0' ? 'post-section' : 'post-section mt-3'
        postElement.innerHTML = alertPost(users[userIndex], postOwners[userIndex])
        alertsPostsList.appendChild(postElement)
    }
}

const populateSupportPosts = ({ users, messages }) => {
    for (userIndex in users) {
        const postElement = document.createElement('article')
        postElement.className = userIndex === '0' ? 'post-section' : 'post-section mt-3'
        postElement.innerHTML = supportPost(users[userIndex], messages[userIndex])
        supportPostsList.appendChild(postElement)
    }
}

fetch('https://randomuser.me/api/?results=10&nat=br')
    .then(res => res.json())
    .then(res => fetch('https://randomuser.me/api/?results=10&nat=br')
        .then(res2 => res2.json())
        .then(async res3 => {
            const messagePromises = []
            for (let i = 0; i < 10; i++) {
                const messagePromise = fetch('https://api-random.vercel.app/').then(res4 => res4.json()).then(res4 => res4.mensage)
                messagePromises.push(messagePromise)
            }
            const messages = await Promise.all(messagePromises)
            return { messages, users: res3.results }
        })
        .then(res2 => populateGeneralPosts(res?.results, res2?.users, res2?.messages))
    )

fetch('https://randomuser.me/api/?results=10&nat=br')
    .then(res => res.json())
    .then(res => fetch('https://randomuser.me/api/?results=10&nat=br')
        .then(res2 => res2.json())
        .then(res2 => populateAlertsPosts(res?.results, res2?.results))
    )

fetch('https://randomuser.me/api/?results=10&nat=br').then(res => res.json()).then(async res => {
    const messagePromises = []
    for (let i = 0; i < 10; i++) {
        const messagePromise = fetch('https://api-random.vercel.app/').then(res => res.json()).then(res => res.mensage)
        messagePromises.push(messagePromise)
    }
    const messages = await Promise.all(messagePromises)
    return { messages, users: res.results }
}).then(res => populateSupportPosts(res))

const randomNumbers = document.querySelectorAll('.random-number-100')
for (element of randomNumbers) {
    element.innerHTML = Math.floor(Math.random() * 100)
}