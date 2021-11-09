const pokemonAll = document.querySelector('.containerAll')
const loader = document.querySelector('.loader')
const buttonAll = document.querySelector('.pokemonAll')
const containerApi = document.querySelector('.containerAPI')
const input = document.querySelector('.search')
const containerSearch = document.querySelector('.containerSearch')
const types = document.querySelector('.typePokemons')

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
    <div class="cardPokemon">
        <header>
            <h3>${dados.name}</h3>
            <span>${dados.id}</span>
        </header>
        <p data-type="${dados.types['0'].type.name}">${dados.types[0].type.name} <br>${dados.types.length === 2 ? dados.types[1].type.name : ''}</p>
        <img class="pokeImage" src="${dados.sprites.other['official-artwork'].front_default}">    
    </div>
    `
    seila()
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

const seila = () => {
    const para = document.querySelectorAll('p')
    para.forEach(item => {
        let card = item.parentElement
        const type = item.getAttribute('data-type')
        if (type === 'fire') card.style.backgroundColor = '#fb926c'
            
        if (type === 'grass') card.style.backgroundColor = '#48d0b0'

        if (type === 'bug') card.style.backgroundColor = '#53d26e'

        if (type === 'normal') card.style.backgroundColor = '#eab4c4'

        if (type === 'water') card.style.backgroundColor = '#79bffe'

        if (type === 'poison') card.style.backgroundColor = '#ae88dd'

        if (type === 'electric') card.style.backgroundColor = '#ffd86f'

        if (type === 'ground') card.style.backgroundColor = '#a9702d'

        if (type === 'fairy') card.style.backgroundColor = '#ec2674'

        if (type === 'fighting') card.style.backgroundColor = '#f0623a'

        if (type === 'psychic') card.style.backgroundColor = '#ff73be'

        if (type === 'rock') card.style.backgroundColor = '#7d7d7d'

        if (type === 'ghost') card.style.backgroundColor = '#906791'

        if (type === 'ice') card.style.backgroundColor = '#95d1eb'

        if (type === 'dragon') card.style.backgroundColor = '#63cad9'
        
        if (type === 'dark') card.style.backgroundColor = '#483c5c'

        if (type === 'steel') card.style.backgroundColor = '#4dad8d'

        if (type === 'flying') card.style.backgroundColor = '#9fb9cb'
    })
}

const search = async () => {
    containerApi.innerHTML = ''
    const inputValue = input.value
    const seila = await getPost(`pokemon/${inputValue}`)
    containerSearch.innerHTML += `
    <h1>${seila.name}</h1>
    <img src="${seila.sprites.other['official-artwork'].front_default}">
    `
}

input.addEventListener('keypress', e => {
    if (e.keyCode === 13) {
        search()
    }
})

buttonAll.addEventListener('click', () => {
    containerApi.innerHTML = ''
    addDom()
    window.addEventListener('scroll', () => {
        const { clientHeight, scrollHeight, scrollTop } = document.documentElement
    
        if (scrollTop + clientHeight >= scrollHeight - 10) {
            showLoader()
        }
    })
})

types.addEventListener('click', () => {
    containerApi.innerHTML = ''
    container.style.display = 'block'
    const names = document.querySelectorAll('.typeLink')
    names.forEach(item => {
        const index = item.getAttribute('data-id')
        const { url } = maria[index]
        item.addEventListener('click', async () => {
            const dados = await getPost(url)
            dados.pokemon.forEach(item => {
                typePokemon(item.pokemon.url)
            })
        })
    })
})

const typePokemon = async (url) => {
    const formatado = url.replace('https://pokeapi.co/api/v2/', '')
    const dados = await getPost(formatado)
    pokemonAll.innerHTML += `
    <div class="cardPokemon">
        <header>
            <h3>${dados.name}</h3>
            <span>${dados.id}</span>
        </header>
        <p data-type="${dados.types['0'].type.name}">${dados.types[0].type.name} <br> ${dados.types.length === 2 ? dados.types[1].type.name : ''}</p>
        <img class="pokeImage" src="${dados.sprites.other['official-artwork'].front_default}">    
    </div>
    `
    seila()
    
}