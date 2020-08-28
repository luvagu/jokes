const apiInfo = (async function (param) {
    try {
        const response = await fetch('https://sv443.net/jokeapi/v2/info')
        const data = await response.json();
        const { version, jokes } = data;

        document.querySelector('#version').textContent = version
        document.querySelector('#numJokes').textContent = jokes.totalCount

    } catch (err) {
        console.log('Oooops', err);
    }
})()