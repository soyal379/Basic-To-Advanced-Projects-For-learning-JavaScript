
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
        productGrid: document.getElementById('productGrid'),
        noResult: document.getElementsByClassName('no-result'),
        retryBtn: document.getElementById('retryBtn')
    },

    error: {
        loader: document.getElementById('loadingError'),
        errorAlert: document.getElementById('errorAlert'),
        errorMessage: document.getElementById('errorMessage'),
    }
}


async function fetchProducts() {
    toggleLoading(true)
    toggleError(false)
    noResultMessage(false)

    try {
        const API_URL = './products.json'
        const response = await fetch(API_URL)

        if (!response.ok) {
            throw new Error(`HTTP network error! status code: ${response.status}`)
        }

        await new Promise(resolve => setTimeout(resolve, 2000))

        const data = await response.json()


        STATE.products = data
        renderCategoryBtn()

    } catch (error) {
        console.error('Product fetch failed:', error)
        showError(error.message || 'Somthing Went Wrong While Fetching Data.')
    } finally {
        toggleLoading(false)
        noResultMessage(false)
    }
}


function noResultMessage(loading){
    const elems = STATE.ui.noResult || []
    for (let i = 0; i < elems.length; i++) {
        elems[i].style.display = loading ? 'block' : 'none'
    }
}

function toggleLoading(isLoading) {
    STATE.error.loader.style.display = isLoading ? 'block' : 'none'
}

function toggleError(show) {
    STATE.error.errorAlert.style.display = show ? 'flex' : 'none'
}

function showError(message) {
    STATE.error.errorMessage.style.textContent = `API Error: ${message}`
    toggleError(true)
}

function getAllCategories() {
    const categorySet = STATE.products.map(item => item.category)
    return ['ALL', ...new Set(categorySet)]
}

function renderCategoryBtn() {
    const categories = getAllCategories()
    STATE.ui.categoryContainer.innerHTML = ''
    categories.forEach((cat) => {
        const btn = document.createElement('button')
        btn.type = 'button'
        btn.classList.add('cat-btn')
        btn.textContent = cat === 'ALL' ? '📌 ALL' : cat

        if ((STATE.filters.activeCategory === cat) || (cat === 'ALL' && STATE.filters.activeCategory === 'ALL')) {
            btn.classList.add('active')
        }

        btn.addEventListener('click', () => {
            STATE.filters.activeCategory = cat
            renderCategoryBtn()
            applyFiltersAndRenderProducts()
        })

        STATE.ui.categoryContainer.appendChild(btn)
    })

}


function updateSliderTrack() {
    const min = parseInt(STATE.ui.minSlider.value, 10)
    const max = parseInt(STATE.ui.maxSlider.value, 10)
    const totalRange = 20000
    const leftPercent = (min / totalRange) * 100
    const rightPercent = (max / totalRange) * 100
    STATE.ui.sliderTrack.style.left = `${leftPercent}%`
    STATE.ui.sliderTrack.style.width = `${rightPercent - leftPercent}%`
    STATE.ui.priceRangeLebal.innerText = `₹${min.toLocaleString('en-IN')} — ₹${max.toLocaleString('en-IN')}`

    STATE.filters.currentMinPrice = min
    STATE.filters.currentMaxPrice = max

    applyFiltersAndRenderProducts()
}


function bindSliderEvent() {
    STATE.ui.minSlider.addEventListener('input', (e) => {
        let minValue = parseInt(e.target.value, 10)
        let maxValue = parseInt(STATE.ui.maxSlider.value, 10)

        if (minValue > maxValue) {
            STATE.ui.minSlider.value = maxValue
            minValue = maxValue
        }
        STATE.filters.currentMinPrice = minValue
        updateSliderTrack()
    })

    STATE.ui.maxSlider.addEventListener('input', (e) => {
        let maxValue = parseInt(e.target.value, 10)
        let minValue = parseInt(STATE.ui.minSlider.value, 10)

        if (maxValue < minValue) {
            STATE.ui.maxSlider.value = minValue
            maxValue = minValue
        }
        STATE.filters.currentMaxPrice = maxValue
        updateSliderTrack()
    })

    updateSliderTrack()
}


function deBounce(fun, delay) {
    let timeOutId
    return function (...args) {
        clearTimeout(timeOutId)

        timeOutId = setTimeout(() => {
            fun.apply(this, args)
        }, delay)
    }
}


const handelSearchChange = (event) => {
    const rowValue = event.target.value
    STATE.filters.currentSearchItem = rowValue
    applyFiltersAndRenderProducts()
}


const deBouncedSearchHandler = deBounce(handelSearchChange, 320)


function initSearch() {
    STATE.ui.searchInput.addEventListener('input', (e) => {
        deBouncedSearchHandler(e)
    })
}


function getFilterdProducts() {
    let filtered = STATE.products

    if (STATE.filters.activeCategory !== 'ALL') {
        filtered = filtered.filter(product => product.category === STATE.filters.activeCategory)
    }

    filtered = filtered.filter(product => {
        return product.price >= STATE.filters.currentMinPrice && product.price <= STATE.filters.currentMaxPrice
    })

    if (STATE.filters.currentSearchItem.trim() !== '') {
        const searchLower = STATE.filters.currentSearchItem.trim().toLowerCase()
        filtered = filtered.filter(product => product.name.toLowerCase().includes(searchLower))
    }

    return filtered

}


function renderProducts(productArray) {
    const { productGrid } = STATE.ui
    productGrid.innerHTML = ''


    if (productArray.length === 0) {
        const noResultDiv = document.createElement('div')
        noResultDiv.className = 'no-result'
        noResultDiv.innerHTML = `
         ✨ no products match the filters. <br> Try adjusting price, search or category. `

        STATE.ui.productGrid.appendChild(noResultDiv)
        STATE.ui.resultCountSpan.innerText = `0 Products`
        return
    }


    STATE.ui.resultCountSpan.innerText = `${productArray.length} Product${productArray.length !== 1 ? 's' : ''}`

    const fregment = document.createDocumentFragment()

    productArray.forEach((product) => {
        const card = document.createElement('div')
        card.classList = 'product-card'
        card.setAttribute('data-id', product.id)

        card.innerHTML = `
            <div class="product-img-wrapper">
                <img src="${product.image}" alt="" class="product-img">
            </div>
            <div class="product-info">
                <span class="product-category"> ${product.category}</span>
                <h3 class="product-titel">${product.name}</h3>
                <div class="product-price">${product.price}</div>
            </div>
        `

        fregment.appendChild(card)
    })
    productGrid.appendChild(fregment)
}


function applyFiltersAndRenderProducts() {
    const filtered = getFilterdProducts()
    renderProducts(filtered)
}


function resetAllFilters(){
    STATE.ui.searchInput.value = ''
    STATE.filters.currentSearchItem = ''

    STATE.ui.minSlider.value = 0
    STATE.ui.maxSlider.value = 20000

    STATE.filters.currentMinPrice = 0
    STATE.filters.currentMaxPrice = 20000

    STATE.filters.activeCategory = 'ALL'

    updateSliderTrack()

    renderCategoryBtn()

    applyFiltersAndRenderProducts()
}


function syncFormSlider(){
    STATE.filters.currentMinPrice = parseInt(STATE.ui.minSlider.value, 10)
    STATE.filters.currentMaxPrice = parseInt(STATE.ui.maxSlider.value, 10)

    updateSliderTrack()
}

async function init(){
    bindSliderEvent()
    initSearch()
    STATE.ui.resetBtn.addEventListener('click', resetAllFilters)
    if (STATE.ui.retryBtn) STATE.ui.retryBtn.addEventListener('click', () => fetchProducts())

    await fetchProducts()
    syncFormSlider()
    applyFiltersAndRenderProducts()
}

init()

