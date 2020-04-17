const apiInfo = async function(param) {
    try {
        const response = await fetch('https://sv443.net/jokeapi/v2/info')
        const data = await response.json();
        const { version, jokes } = data;

        if (param === 'version') {
            return document.querySelector('#version').textContent = version;
        }

        if (param === 'numJokes') {
            return document.querySelector('#numJokes').textContent = jokes.totalCount;
        }
    } catch (err) {
        console.log('Oooops', err);
    }
}
apiInfo('version');
apiInfo('numJokes');