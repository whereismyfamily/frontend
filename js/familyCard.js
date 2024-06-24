const btnCreateFamily = document.getElementById("btn-create-family")
const familySection = document.getElementById("family-section")
const familyName = document.getElementById("family-name")
const containerBtnsFamily = document.getElementById("container-btns-family")
const pFamily = document.getElementById("p-family")

const fetchUsers = async () => {
    const response = await fetch('https://randomuser.me/api/?results=9&nat=br')
    const data = await response.json()
    return data.results
}

const createFamilyMembers = async () => {
    familyName.innerHTML = "<p>Putin</p "
    pFamily.innerHTML = ""
    const users = await fetchUsers()
    const relatives = {
        "female": ["Avó", "Tia", "Mãe", "Irmã", "Prima", "Sobrinha", "Neta", "Madrinha", "Entiada"],
        "male": ["Avô", "Tio", "Pai", "Irmão", "Primo", "Sobrinho", "Neto", "Padrinho", "Enteado"]
    }

    containerBtnsFamily.innerHTML = `
        <ul class="mui-tabs__bar mui-tabs__bar--justified">
            <li class="mui--is-active"><a data-mui-toggle="tab" data-mui-controls="pane-justified-1">Membros</a></li>
            <li><a data-mui-toggle="tab" data-mui-controls="pane-justified-2">Visão geral</a></li>
        </ul>
        <div class="mui-tabs__pane" id="pane-justified-2"></div>
        <div class="mui-tabs__pane mui--is-active" id="pane-justified-1"><ul class="overflow-y-scroll-100" style='padding:0; margin-top: 8px' id="list-members"></ul></div>
    `
    const listMembers = document.getElementById("list-members")
    for (userIndex in users) {
        const liMember = document.createElement("li")
        const randomIndex = Math.floor(Math.random() * users.length)
        const hr = document.createElement('hr')
        liMember.className = 'd-flex w-100'
        liMember.innerHTML = `
        <img class="members-profile-pic mr-1" src="${users[userIndex].picture.large}" alt="">
        <div class="d-flex flex-column align-items-start">
            <p class="message-name">${users[userIndex].name.first} ${users[userIndex].name.last}</p>
            <p class="message-content">${relatives[users[userIndex].gender][randomIndex]}</p>
        </div>
    `
        listMembers.appendChild(liMember)
        listMembers.appendChild(hr)
    }
}

btnCreateFamily.addEventListener("click", createFamilyMembers)
