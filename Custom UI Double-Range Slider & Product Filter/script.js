
const STATE = {
    products: [],

    filters: {
        currentSearchItem: '',
        currentMinPrice: 0,
        currentMaxPrice: 20000,
        activeCategory: 'ALL'
    },


    ui: {
        searchInput: document.getElementById('searchInput'),
        priceRangeLebal: document.getElementById('priceRangeLebal'),
        minSlider: document.getElementById('minSlider'),
        maxSlider: document.getElementById('maxSlider'),
        sliderTrack: document.getElementById('sliderTrack'),
        categoryContainer: document.getElementById('categoryContainer'),
        resetBtn: document.getElementById('resetFilterBtn'),
        resultCountSpan: document.getElementById('resultCount'),
        productGrid: document.getElementById('productGrid')
    }
}


async function fetchProducts() {
    try {
        const API_URL = './products.json'
        const response = await fetch(API_URL)

        if (!response.ok) {
            throw new Error(`HTTP network error! status code: ${response.status}`)
        }

        const data = await response.json()

        await new Promise(resolve => setTimeout(resolve, 1000))

        products = data
        renderCategoryBtn()
        // renderProducts()
    } catch (error) {
        console.error('Product fetch failed:', error)
    }
}

function getAllCategories() {
    const categorySet = products.map(item => item.category)
    return ['ALL', ...new Set(categorySet)]
}

function renderCategoryBtn() {
    const categorys = getAllCategories()
    categoryContainer.innerHTML = ''

    categorys.forEach((cat) => {
        const btn = document.createElement('button')
        btn.type = 'button'
        btn.classList.add('cat-btn')
        btn.textContent = cat === 'ALL' ? '📌 ALL' : cat

        if ((activeCategory === cat) || (cat === 'ALL' && activeCategory === 'ALL')) {
            btn.classList.add('active')
        }

        btn.addEventListener('click', () => {
            activeCategory = cat
            renderCategoryBtn()
        })

        categoryContainer.appendChild(btn)
    })

}
