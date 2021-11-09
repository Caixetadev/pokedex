const pokemonAll = document.querySelector('.containerAll')
const loader = document.querySelector('.loader')
const buttonAll = document.querySelector('.pokemonAll')

let limit = 36
let offset = 0

const getPost = async (url) => {
    const api = await fetch(`https://pokeapi.co/api/v2/${url}`)
    return api.json()
}

const addDom = async () => {
    const pokemon = await getPost(`pokemon?limit=${limit}&offset=${offset}`)
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

const getNextPokemons = () => {
    setTimeout(() => {
        offset +=36
        addDom()
    }, 300)
}

const removeLoader = () => {
    setTimeout(() => {
        loader.classList.remove('show')
        getNextPokemons()
    }, 1000)
}

const showLoader = () => {
    loader.classList.add('show')
    removeLoader()
}

window.addEventListener('scroll', () => {
    const { clientHeight, scrollHeight, scrollTop } = document.documentElement

    if (scrollTop + clientHeight >= scrollHeight - 10) {
        showLoader()
    }
})

buttonAll.addEventListener('click', () => {
    addDom()
})

