import { menuArray } from "/data.js"

const snackSectionEl = document.getElementById("menu-option")
const itemOrderedEl = document.getElementById("order")
const orderSectionEl = document.getElementById("order-section")
const checkoutEl = document.getElementById("checkout-container")
const payBtnEl = document.getElementById("pay-btn")
const checkoutFormEl = document.getElementById("checkout-form")
const closeCheckoutBtn = document.getElementById("close-checkout")
const inputsEl = document.querySelectorAll('.input')
let orderedItemArr = []
let allowClickEvent = true

document.addEventListener("click", function(e){
    if(allowClickEvent){
        if(e.target.dataset.add){
            addSelectedSnack(e.target.dataset.add)
            document.getElementById("checkout-message").innerHTML = ""
        } else if(e.target.dataset.remove){
            removeOrder(e.target.dataset.remove)
        } else if (e.target.id === "complete-order-btn"){
            checkoutEl.style.display = "block"
            allowClickEvent = false
        }
    }
})

checkoutFormEl.addEventListener("submit", function(e){
    e.preventDefault()
    
    const checkoutFormData = new FormData(checkoutFormEl)
    const name = checkoutFormData.get("name")
    
    document.getElementById("checkout-message").innerHTML = `
    <div class="message-container">
        <p class="message">Thanks, ${name}!, your order is on its way!</p>
    </div>`
    for (let i = 0; i < inputsEl.length; i++) {
        inputsEl[i].value = ''
    }
    allowClickEvent = true
    orderedItemArr = []
    checkoutEl.style.display = "none"
    render()
})

closeCheckoutBtn.addEventListener("click", function(){
    checkoutEl.style.display = "none"
    allowClickEvent = true
})

function addSelectedSnack(itemId){
    const selectedSnack = menuArray.filter(menu => menu.id == itemId)[0]
    if (!orderedItemArr.includes(selectedSnack)){
        orderedItemArr.push(selectedSnack)
    }
    
    render()
}

function removeOrder(itemId){
    if(orderedItemArr) {
        orderedItemArr = orderedItemArr.filter(item => item.id != itemId)
    }
    render()
    
}

function getTotalPrice() {
    const totalPrice = orderedItemArr.reduce((total, currentProp) => {
        return total + currentProp.price
    }, 0)
    return `$${totalPrice}`
}

function showOrder(){
    let displayOrder = orderedItemArr.length > 0 ? 
            orderSectionEl.style.display = "block" :
            orderSectionEl.style.display = "none"
    return displayOrder
}

function dinerHTML() {
const snackDiv = menuArray.map(menu => {
    return `
    <div class="each-menu-option">
        <div class="snack-container">
            <h4 class="snack-emoji">${menu.emoji}</h4>
            <div class="snack-properties">
                <p class="snack-name">${menu.name}</p>
                <p class="snack-ingredient">${menu.ingredients}</p>
                <p class="snack-price">$${menu.price}</p>
            </div>    
        </div>
        <div class="btn-div">
            <button class="add-btn" data-add="${menu.id}">+</button>
        </div>
    </div>
    `
}).join("")
return snackDiv
}

function orderedItemHTML() {
    if(orderedItemArr){
        const orderHTML = orderedItemArr.map(item => {
            return `
            <div class="snack-order-container">
                <span class="item-remove-wrapper">
                    <p class="item-order">${item.name}</p>
                    <button class="remove-btn" data-remove="${item.id}">remove</button>
                </span>
                <div>
                    <p class="item-order-price">$${item.price}</p>
                </div>
            </div>`
        }).join("")
        return orderHTML
    }
}

function render() {
    snackSectionEl.innerHTML = dinerHTML()
    showOrder()
    itemOrderedEl.innerHTML = orderedItemHTML()
    document.getElementById("total-price").innerText = getTotalPrice()
    
}

render()


