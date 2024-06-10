const btnCreateFamily = document.getElementById("btn-create-family")
const familySection = document.getElementById("family-section")
const familyName = document.getElementById("family-name")
const containerBtnsFamily = document.getElementById("container-btns-family")
const pFamily = document.getElementById("p-family")

const populateMembers = async(user) => {
    for(let i = 0; i <= 3; i++) {
        const memberElement = document.createElement('div')
        memberElement.innerHTML = `
        <img class="members-profile-pic" src="${user.picture.large}" alt="">
        <div>
            <p class="message-name">${user.name.first} ${user.name.last}</p>
        </div>
        `
    }

}

function createFamily() {
    familyName.innerHTML = "<p> Putin</p "
    pFamily.innerHTML = ""
    containerBtnsFamily.innerHTML = `
        <ul class="mui-tabs__bar mui-tabs__bar--justified">
            <li class="mui--is-active"><a data-mui-toggle="tab" data-mui-controls="pane-justified-1">Visão geral</a></li>
            <li><a data-mui-toggle="tab" data-mui-controls="pane-justified-2">Membros</a></li>
        </ul>
        <div class="mui-tabs__pane mui--is-active" id="pane-justified-1">Pane-1</div>
        <div class="mui-tabs__pane" id="pane-justified-2">
        </div>
    `
}

btnCreateFamily.addEventListener("click", createFamily)

fetch('https://randomuser.me/api/?results=9&nat=br').then(res => res.json()).then(res => populateMembers(res.results))