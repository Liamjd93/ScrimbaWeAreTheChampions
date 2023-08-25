/* Firebase database integration start >>> */
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, onValue, push} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://scimba-watc-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsements")
/* <<< Firebase database integration end */


/* Variable and constants start >>> */
const publishBtn = document.getElementById("publish-btn")

class endorsementPost {
    constructor(message, from, to, likes) {
        this.message = message
        this.from = from
        this.to = to
        this.likes = 0
    }
}

const message = document.getElementById("main-message")
const from = document.getElementById("from")
const to = document.getElementById("to")
const endorsementsContainer = document.getElementById("endorsements-container")
let endorsementsArray = []
let endorsementsArrayOrdered = []
/* <<< Variable and constants end */


/* Main code/functions start >>> */
onValue(endorsementsInDB, function(snapshot) {
    clearSomething("container", endorsementsContainer)
    endorsementsArray = (Object.entries(snapshot.val()))
    if (snapshot.val() == "") {
        endorsementsContainer.innerHTML += `<p id="no-endorsements">There are currently no endorsements.</p>`
    }
    for (let i = 0; i < endorsementsArray.length; i++) {
        endorsementsArrayOrdered.unshift(endorsementsArray[i])
    }
    showEndorsements(endorsementsArrayOrdered)
})

function clearSomething(category, thing) {
    if (category == "container") {
        thing.innerHTML = ""
    }
    if (category == "input") {
        thing.value = ""
    }
}

function showEndorsements(posts) {
    for (let i = 0; i < posts.length; i++) {
        let heart = `<button id="heart" class="heart" value="${posts[i][0]}">♡</button>`
        if (posts[i][1].likes != 0) {
            heart = "♥"
        }
        endorsementsContainer.innerHTML += `
        <div class="endorsement">
        <h4 class="endorsement-content to">To: ${posts[i][1].to}</h4>
        <p class="message">${posts[i][1].message}</p>
        <h4 class="endorsement-content from">From: ${posts[i][1].from} ${heart} ${posts[i][1].likes}</h4>
        </div>`

        console.log(posts[i][0])

        let heartEl = document.getElementById("heart")
        heartEl.addEventListener("click", function() {
            console.log("clicked heart" + heartEl.value)
        })
    }
}

publishBtn.addEventListener("click", function(){
    let post = new endorsementPost (message.value, from.value, to.value, 0)
    push(endorsementsInDB, post)
    clearSomething("input", message)
    clearSomething("input", from)
    clearSomething("input", to)
})
/* <<< Main code/functions end */