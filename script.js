const flags = document.querySelectorAll('input[name=flags]')
const searchTerm = document.querySelector('#searchTerm')
const categoriesHtml = document.querySelector('[data-categories]')
const filtersHtml = document.querySelector('[data-filters]')
const displayJokes = document.querySelector('#joke')

const populateCategories = (async function () {
    try {
        const response = await fetch('https://sv443.net/jokeapi/v2/categories')
        const data = await response.json()
        const { categories } = data
        //console.log(categories)

        categories.forEach(element => {
            let addButton = document.createElement('button')
            addButton.addEventListener("click", () => getJokes(element))
            addButton.innerText = element
            categoriesHtml.appendChild(addButton)
        });

    } catch (err) {
        return console.log('Oooops, could not load categories', err);
    }
})()

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

const getJokes = async (subject) => {
    try {
        const response = await fetch(`https://sv443.net/jokeapi/v2/joke/${subject}?blacklistFlags=${getFlags()}&contains=${searchTerm.value}`)
        const data = await response.json()
        const { category, type, joke, setup, delivery, error, message } = data

        // handle errors
        if (error) {
            if (subject === '') {
                //console.log(`Ooooops, ${message}, Please choose a category and try again!`)
                return displayJokes.textContent = `Ooooops, ${message}, Please choose a category and try again!`
            }
            if (searchTerm.value.length > 0) {
                //console.log(`Ooooops, ${message}, Please choose a different search term and try again!`)
                return displayJokes.textContent = `Ooooops, ${message}, Please choose a different search term and try again!`
            }
            // console.log(`Ooooops, ${message}, Please try again!`)
            return displayJokes.textContent = `Ooooops, ${message}, Please try again!`
        }

        if (type == 'single') {
            // console.log('Category', category)
            // console.log('Type', type)
            // console.log('Joke', category)
            //setBackground(category)
            return displayJokes.textContent = `${joke}`
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
        return displayJokes.textContent = `Oooops: ${err}`
    }
}

searchTerm.addEventListener('keypress', function (e) {
    if (searchTerm.value.length > 0 && e.keyCode === 13) {
        // console.log('Enter key pressed')
        // console.log('Search joke that contains term:', searchTerm.value)
        getJokes('Any')
    }
})