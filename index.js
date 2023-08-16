/* Firebase database integration start >>> */
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://scimba-watc-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsements")
/* <<< Firebase database integration end */


/* Variable and constants start >>> */
const publishBtn = document.getElementById("publish-btn")

let endorsementPost = {
    message: "msgTest",
    from: "fromTest",
    to: "toTest",
    likes: 0,
}
/* <<< Variable and constants end */


/* Main code/functions start >>> */
publishBtn.addEventListener("click", function(){
    console.log("Clicked publish")
    console.log(endorsementsInDB)
})
/* <<< Main code/functions end */