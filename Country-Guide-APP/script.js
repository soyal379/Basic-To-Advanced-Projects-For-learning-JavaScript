let searchBTN = document.getElementById('search-btn');
let countryINP = document.getElementById('country-inp');
let result = document.getElementById('result');

searchBTN.addEventListener("click", () => {
    let countryName = countryINP.value;
    let finalUrl = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
    // console.log(finalUrl)
    fetch(finalUrl)
        .then((responce) => responce.json())
        .then((data) => {
            result.innerHTML = `
                <img src = " ${data[0].flags.svg}" class="flag-img">
                <h2> ${data[0].name.common}</h2>
                <div class="wrapper">
                    <div class="data-wrapper">
                        <h4> Capital :</h4>
                        <span> ${data[0].capital[0]} </span>
                    </div>
                </div>
                <div class="wrapper">
                    <div class="data-wrapper">
                        <h4> Continent :</h4>
                        <span> ${data[0].continents[0]} </span>
                    </div>
                </div>
                <div class="wrapper">
                    <div class="data-wrapper">
                        <h4> Population :</h4>
                        <span> ${data[0].population} </span>
                    </div>
                </div>
                <div class="wrapper">
                    <div class="data-wrapper">
                        <h4> Currency :</h4>
                        <span> ${Object.keys(data[0].currencies)[0]} - ${data[0].currencies[Object.keys(data[0].currencies)].name} </span>
                    </div>
                </div>
                <div class="wrapper">
                    <div class="data-wrapper">
                        <h4> Common Languages :</h4>
                        <span> ${Object.values(data[0].languages).toString().split(",").join(", ")} </span>
                    </div>
                </div>
            `;
        })
        .catch(() => {
            if (countryName.lenght == 0) {
                result.innerHTML += ` <h3> The input field connot be Empty.</h3> `
            } else {
                result.innerHTML += ` <h3> Please enter a valid Country name.</h3> `
            }
        })

});
