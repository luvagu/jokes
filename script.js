// Run API call on page load to populate the categories
(async function() {
    try {
        const response = await fetch('https://sv443.net/jokeapi/v2/categories')
        const data = await response.json()
        const { categories } = data
        //console.log(categories)

        categories.forEach(category => {
            let categoryBtn = document.createElement('button')
            categoryBtn.addEventListener("click", () => getJokes(category))
            categoryBtn.innerText = category
            categoriesHtml.appendChild(categoryBtn)
        });

    } catch (err) {
        return console.log('Oooops, could not load categories', err.message);
    }
})();

const flags = document.querySelectorAll('input[name=flags]')
const searchField = document.querySelector('#searchField')
const categoriesHtml = document.querySelector('[data-categories]')
// const filtersHtml = document.querySelector('[data-filters]')
const displayJokes = document.querySelector('#joke')

function getFlags() {
    let checkboxChecked = []
    // loop over them all
    for (var i = 0; i < flags.length; i++) {
        // And stick the checked ones onto an array...
        if (flags[i].checked) {
            checkboxChecked.push(flags[i].value)
        }
    }
    // Return the array if it is non-empty, or null
    //return checkboxChecked.length > 0 ? checkboxChecked : null;
    //console.log('Getting flags:', checkboxChecked)
    return checkboxChecked.length > 0 ? checkboxChecked.join() : ''
}

// function setBackground(img) {
//     document.querySelector('body').style.backgroundImage = `url(${img.toLowerCase()}.jpg`
// }

async function getJokes(category, searchTerm = '') {
    // show loading state
    displayJokes.innerText = 'Loading joke...'

    try {
        const response = await fetch(`https://sv443.net/jokeapi/v2/joke/${category}?blacklistFlags=${getFlags()}&contains=${searchTerm}`)
        const data = await response.json()
        const { type, joke, setup, delivery, error, message } = data

        // handle errors
        if (error) {
            if (category === '') {
                //console.log(`Ooooops, ${message}, Please choose a category and try again!`)
                return displayJokes.innerText = `Ooooops, ${message}, Please choose a category and try again!`
            }
            if (searchField.value.length > 0) {
                //console.log(`Ooooops, ${message}, Please choose a different search term and try again!`)
                return displayJokes.innerText = `Ooooops, ${message}, Please choose a different search term and try again!`
            }
            // console.log(`Ooooops, ${message}, Please try again!`)
            return displayJokes.innerText = `Ooooops, ${message}, Please try again!`
        }

        if (type == 'single') {
            // console.log('Category', category)
            // console.log('Type', type)
            // console.log('Joke', category)
            //setBackground(category)
            return displayJokes.innerText = `${joke}`
        } else {
            // console.log('Category', category)
            // console.log('Type', type)
            // console.log('Joke: setup', setup)
            // console.log('Joke: delivery', delivery)
            //setBackground(category)
            return displayJokes.textContent = `${setup}\r\n${delivery}`
        }

    } catch (err) {
        // console.log('Oooops', err)
        return displayJokes.innerText = `Oooops: ${err.message}`
    }
}

searchField.addEventListener('keydown', function (e) {
    if (searchField.value.length > 0 && e.key === 'Enter') {
        // console.log('Enter key pressed')
        // console.log('Search joke that contains term:', searchField.value)
        getJokes('Any', searchField.value)
        // reset searchField
        searchField.value = ''
    }
})
