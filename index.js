/* Firebase database integration start >>> */
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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
/* <<< Variable and constants end */


/* Main code/functions start >>> */
onValue(endorsementsInDB, function(snapshot) {
    if (snapshot.val() == null) {
        endorsementsContainer.innerHTML += `<p id="no-endorsements">There are currently no endorsements.</p>`
        console.log(endorsementsContainer.innerHTML)
    }
    clearAll()
    showEndorsements(snapshot)
})

function clearAll() {
    /* Make a function to clear away all endorsement posts */
    endorsementsContainer.innerHTML = ""
}

function showEndorsements(snapshot) {
    /* Make a function to list all endorsements */
}

publishBtn.addEventListener("click", function(){
    let post = new endorsementPost (message.value, from.value, to.value, 0)
    console.log(post)
    document.getElementById("no-endorsements").innerText = ""
    endorsementsContainer.innerHTML += `
    <div class="endorsement">
        <h6>${post.message}</h6>
        <p>From: ${post.from}. To: ${post.to}. Likes: ${post.likes}</p>
    </div>`
})
/* <<< Main code/functions end */