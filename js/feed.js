const generalPostsList = document.getElementById('general')

window.onload = () => generalPostsList.focus()

const populateGeneralPosts = (users, postOwners) => {
    const maleRelatives = ['primo', 'irmao', 'pai', 'tio', 'sobrinho', 'avo', 'neto']
    const femaleRelatives = ['prima', 'irma', 'mae', 'tia', 'sobrinha', 'avo', 'neta']
    for (userIndex in users) {
        const user = users[userIndex]
        const postOwner = postOwners[userIndex]
        const relative = user.gender === "male" ? maleRelatives[Math.floor(Math.random() * maleRelatives.length)] : femaleRelatives[Math.floor(Math.random() * maleRelatives.length)]
        const postElement = document.createElement('article')
        postElement.className = userIndex === '0' ? 'post-section' : 'post-section mt-3'
        postElement.innerHTML = `
                    <div class="d-flex align-items-center">
                        <img class="post-profile-pic" src="${postOwner.picture.large}" alt="">
                        <div class="ml-1">
                            <h4 class="m-0">${postOwner.name.first} ${user.name.last}</h4>
                        </div>
                    </div>
                    <div class="post-description">
                        <h3 class="m-0">Ajude ${postOwner.name.first} a reencontrar ${user.gender === "male" ? 'o' : 'a'} ${relative} <strong>${user.name.first} ${user.name.last}</strong></h3>
                        <h5 class="m-0">Sua última localização conhecida foi em ${user.location.city.trim()}, e a família está ansiosa para reencontrá-l${user.gender === "male" ? 'o' : 'a'}. Se você tiver qualquer informação sobre seu paradeiro, por favor, <a>entre em contato com a familia ${user.name.last}.</a></h5>
                    </div>
                    <img class="post-image w-100" src="${user.picture.large}" alt="" />
                    <ul class="p-0 mt-2 mb-2">
                        <li><strong>Idade: </strong> ${user.dob.age} anos</li>
                        <li><strong>Ultima localizacao: </strong> ${user.location.street.name.trim()}, ${user.location.city.trim()} - ${user.location.state}</li>
                    </ul>
                    <div class="d-flex justify-content-start">
                        <button class="mui-btn mui-btn--flat mui-btn--primary m-0">Apoiar</button>
                        <button class="mui-btn mui-btn--flat mui-btn--primary m-0">Comentar</button>
                    </div>
                `
        generalPostsList.appendChild(postElement)
    }
}

fetch('https://randomuser.me/api/?results=10&nat=br')
    .then(res => res.json())
    .then(res => fetch('https://randomuser.me/api/?results=10&nat=br')
        .then(res2 => res2.json())
        .then(res2 => populateGeneralPosts(res?.results, res2?.results))
    )
