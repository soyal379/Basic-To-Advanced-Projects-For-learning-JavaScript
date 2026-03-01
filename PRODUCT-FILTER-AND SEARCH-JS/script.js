let products = {
    data: [
        {
            productName: "men black Shirt",
            category: "Topwear",
            price: "30",
            image: "images/topwear-2.png",
        },
        {
            productName: "women black Shirt",
            category: "Topwear",
            price: "34",
            image: "images/topwear.png",
        },
        {
            productName: "men lower pants",
            category: "Bottomwear",
            price: "49",
            image: "images/bottumwear-2.png",
        },
        {
            productName: "womenlower pants",
            category: "Bottomwear",
            price: "49",
            image: "images/bottumwear.webp",
        },
        {
            productName: "Sporty SmartWatch",
            category: "Watch",
            price: "99",
            image: "images/watch.webp",
        },
        {
            productName: "Sporty family Watch",
            category: "Watch",
            price: "99",
            image: "images/watch-2.webp",
        },
        {
            productName: "Black Leather Jacket",
            category: "Jacket",
            price: "129",
            image: "images/jacket-2.png",
        },
        {
            productName: "white hoodie Jacket",
            category: "Jacket",
            price: "129",
            image: "images/jacket.webp",
        },
        {
            productName: "formal shoes",
            category: "Shoes",
            price: "89",
            image: "images/shoes.png",
        },
        {
            productName: "white sporty shoes",
            category: "Shoes",
            price: "89",
            image: "images/shoes-2.webp",
        },
    ],
}


for (const i of products.data) {

    let card = document.createElement("div")
    card.classList.add("card", i.category.toLowerCase(), "hide")

    let imgcontainer = document.createElement("div")
    imgcontainer.classList.add("image-container")

    let image = document.createElement("img")
    image.setAttribute("src", i.image)

    imgcontainer.appendChild(image)
    card.appendChild(imgcontainer)

    let content = document.createElement("div")
    content.classList.add("card-content")

    let name = document.createElement("h4")
    name.classList.add("product-name")
    name.innerText = i.productName.toUpperCase()

    let price = document.createElement("h5")
    price.innerText = "$" + i.price


    content.appendChild(name)
    content.appendChild(price)
    card.appendChild(content)


    document.getElementById("products").appendChild(card)
}


function filterProduct(value) {
    let buttons = document.querySelectorAll(".button-value")
    buttons.forEach((button) => {
        if (value.toUpperCase() == button.innerText.toUpperCase()) {
            button.classList.add("active")
        } else {
            button.classList.remove("active")
        }
    })

    let elements = document.querySelectorAll(".card")
    elements.forEach((element) => {
        if (value == "all") {
            element.classList.remove("hide")
        } else {
            if (element.classList.contains(value)) {
                element.classList.remove("hide")
            } else {
                element.classList.add("hide")
            }
        }
    })
}


window.onload = () => {
    filterProduct("all")
}


document.getElementById("search").addEventListener("click", () => {

    let serachInput = document.getElementById("searchInput").value.toUpperCase()
    let elements = document.querySelectorAll(".product-name")
    let cards = document.querySelectorAll(".card")
    let foundProduct = false

    if (serachInput == "") {
        document.getElementById("searchInput").setAttribute("placeholder", "Please enter a product name")
        return
    }

    elements.forEach((element, index) => {
        if (element.innerText.includes(serachInput)) {
            cards[index].classList.remove("hide")
            foundProduct = true
        } else {
            cards[index].classList.add("hide")
        }
    })

    if (!foundProduct) {
        alert("No products found")

        window.onload = () => {
            filterProduct("all")
        }

        document.getElementById("searchInput").value = ""
        cards.forEach((card) => {
            card.classList.remove("hide")
        })
    }
})