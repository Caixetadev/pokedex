const pokemonAll = document.querySelector('.containerAll')

const getPost = async (teste) => {
    const url = await fetch(`https://pokeapi.co/api/v2/${teste}`)
    return url.json()
}

const addDom = async () => {
    const pokemon = await getPost(`pokemon?limit=36&offset=0`)
    pokemon.results.map(item => {
        pokeImage(item.url)
    })
}

const pokeImage = async (image) => {
    const formatado = image.replace('https://pokeapi.co/api/v2/', '')
    const dados = await getPost(formatado)

    pokemonAll.innerHTML += `
    <h1>${dados.name}</h1>
    <img src="${dados.sprites.front_default}">
    `
}

addDom()