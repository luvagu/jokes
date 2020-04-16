const cats = document.querySelectorAll('input[name=category]');
const flags = document.querySelectorAll('input[name=flags]');

function getCategories() {
    let radio = cats;
    let radioChecked = [];
    // loop over them all
    for (var i = 0; i < radio.length; i++) {
        // And stick the checked ones onto an array...
        if (radio[i].checked) {
            radioChecked.push(radio[i].value);
        }
    }
    // Return the array if it is non-empty, or null
    //return radioChecked.length > 0 ? radioChecked : null;
    console.log('Getting category:', radioChecked);
    return radioChecked.length > 0 ? radioChecked : '';
}

function getFlags() {
    let checkbox = flags;
    let checkboxChecked = [];
    // loop over them all
    for (var i = 0; i < checkbox.length; i++) {
        // And stick the checked ones onto an array...
        if (checkbox[i].checked) {
            checkboxChecked.push(checkbox[i].value);
        }
    }
    // Return the array if it is non-empty, or null
    //return checkboxChecked.length > 0 ? checkboxChecked : null;
    console.log('Getting flags:', checkboxChecked);
    return checkboxChecked.length > 0 ? checkboxChecked : '';
}

const getJokes = async function() {
    try {
        const response = await fetch(`https://sv443.net/jokeapi/v2/joke/${getCategories()}?blacklistFlags=${getFlags()}`)
        const data = await response.json();
        const { category, type, joke, setup, delivery, error, message } = data;

        function setBackground(img) {
            return document.querySelector('body').style.backgroundImage = `url(${img.toLowerCase()}.jpg`;
        }

        if (error) {
            console.log(`Ooooops, ${message}, Please try again!`);
            return document.querySelector('#joke').textContent = `Ooooops, ${message}, Please try again!`
        }
        
        if (type == 'single') {
            console.log('Category', category);
            console.log('Type', type);
            console.log('Joke', category);
            setBackground(category);
            return document.querySelector('#joke').textContent = `${joke}`;
        } else {
            console.log('Category', category);
            console.log('Type', type);
            console.log('Joke: setup', setup);
            console.log('Joke: delivery', delivery);
            setBackground(category);
            return document.querySelector('#joke').textContent = `${setup}\r\n${delivery}`;
        }
    
    } catch(err) {
        console.log('Oooops', err)
        return document.querySelector('#joke').textContent = `Oooops: ${err}`;
    }
}

if (cats) {
    for (let i = 0; i < cats.length; i++) {
        console.log('Adding event listener to radio button id:', cats[i].value);
        cats[i].addEventListener("change", getJokes);
    }
}