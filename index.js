import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-e812e-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEL = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEL.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)

    clearInput()

})

onValue(shoppingListInDB, function(snapshot) {
    let itemsArray = Object.values(snapshot.val())
    clearShoppingList()
    for(let i=0; i<itemsArray.length; i++) {
        addShoppingList(itemsArray[i])
    }
})

function clearInput() {
    inputFieldEl.value = ""
}

function addShoppingList(inputValue) {
    shoppingListEl.innerHTML += `<li class="bg-list-bg shadow py-[10px] px-[15px] rounded-md grow text-center">${inputValue}</li>` 
}

function clearShoppingList() {
    shoppingListEl.innerHTML = ""
}