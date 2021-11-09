const pokemonAll = document.querySelector('.containerAll')

let limit = 36
let seila = 0

const getPost = async (teste) => {
    const url = await fetch(`https://pokeapi.co/api/v2/${teste}`)
    return url.json()
}

const addDom = async () => {
    const pokemon = await getPost(`pokemon?limit=${limit}&offset=${seila}`)
    pokemon.results.map(item => {
        pokeImage(item.url)
    })
}

const pokeImage = async (image) => {
    const formatado = image.replace('https://pokeapi.co/api/v2/', '')
    const dados = await getPost(formatado)
    pokemonAll.innerHTML += `
    <h1>${dados.name}</h1>
    <img src="${dados.sprites.other['official-artwork'].front_default}">
    `
}

const getNextPosts = () => {
    setTimeout(() => {
        seila +=36
        console.log(seila)
        addDom()
    }, 300)
}

window.addEventListener('scroll', () => {
    const { clientHeight, scrollHeight, scrollTop } = document.documentElement

    if (scrollTop + clientHeight >= scrollHeight - 10) {
        getNextPosts()
    }
})

addDom()