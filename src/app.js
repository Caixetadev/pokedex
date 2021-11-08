const pokemonAll = document.querySelector('.containerAll')

const getPost = async (teste) => {
    const url = await fetch(`https://pokeapi.co/api/v2/${teste}`)
    return url.json()
}



const addDom = async () => {
    const pokemon = await getPost(`pokemon?limit=36&offset=0`)
    pokemon.results.map(item => {
        pokemonAll.innerHTML += `
        <h1>${item.name}</h1>
        `
        seila(item.name)
    })

    
}

const seila = async (name) => {
    const pokemon = await getPost(`pokemon/${name}`)
    pokemonAll.innerHTML += `<img src="${pokemon.sprites.front_default}">`
}

addDom()