import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-e812e-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEL = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")
const clickToDeleteEl = document.getElementById("click-to-delete")

addButtonEL.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)

    clearInput()

})

onValue(shoppingListInDB, function(snapshot) {

    if(snapshot.exists()) {

        let itemsArray = Object.entries(snapshot.val())
        clearShoppingList()
    
        for(let i=0; i<itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemId = currentItem[0]
            let currentItemValue = currentItem[1] 
            addShoppingList(currentItem)
        }
    }
    else{
        shoppingListEl.innerHTML =  `<p class="pt-5 text-slate-800 font-medium text-1xl text-center">No items added</p>`
    }
})

function clearInput() {
    inputFieldEl.value = ""
}

function addShoppingList(item) {
    //shoppingListEl.innerHTML += `<li class="bg-list-bg shadow py-[10px] px-[15px] rounded-md grow text-center">${inputValue}</li>` 

    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")
    newEl.classList.add('bg-list-bg', 'shadow', 'py-[10px]', 'px-[15px]', 'rounded-md', 'grow', 'text-center', 'hover-list') //or give a class name and apply in input.css
    newEl.textContent = itemValue

    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })
    
    shoppingListEl.append(newEl)
}

function clearShoppingList() {
    shoppingListEl.innerHTML = ""
}