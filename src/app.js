const pokemonAll = document.querySelector('.containerAll')
const loader = document.querySelector('.loader')
const buttonAll = document.querySelector('.pokemonAll')
const containerApi = document.querySelector('.containerAPI')
const input = document.querySelector('.search')
const containerSearch = document.querySelector('.containerSearch')
const types = document.querySelector('.typePokemons')
const type = document.querySelector('.types')
const randomButton = document.querySelector('.randomPokemon')

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
        <p data-type="${dados.types['0'].type.name}">${dados.types[0].type.name}</p>
        <p>${dados.types.length === 2 ? dados.types[1].type.name : ''}</p>
        <img class="pokeImage" src="${dados.sprites.other['official-artwork'].front_default}">    
    </div>
    `
    click()
    colocandoCor()
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

const colocandoCor = () => {
    const p = document.querySelectorAll('p')
    p.forEach(item => {
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
    type.style.display = 'none'
    containerApi.innerHTML = ''
    const inputValue = input.value
    const seila = await getPost(`pokemon/${inputValue}`)
    const species = seila.species.url
    const speciesFormatado = species.replace('https://pokeapi.co/api/v2/', '')
    const oi = await getPost(speciesFormatado)
    const urlGeneration = oi.evolution_chain.url
    const generationFormatado = urlGeneration.replace('https://pokeapi.co/api/v2/', '')
    const generation = await getPost(generationFormatado)
    const primeriaEvolucao = generation.chain.species.name === undefined ? '' : await getPost(`pokemon/${generation.chain.species.name}`)
    const segundaEvolucao = generation.chain.evolves_to[0] === undefined ? '' : await getPost(`pokemon/${generation.chain.evolves_to[0].species.name}`)
    const terceiraEvolucao = generation.chain.evolves_to[0].evolves_to[0] === undefined ? '' : await getPost(`pokemon/${generation.chain.evolves_to[0].evolves_to[0].species.name}`)
    
    containerSearch.innerHTML = `
    <div class="infoContainer">
    <p data-type="${seila.types['0'].type.name}"></p>

        <div class="infoContainerImage">
            <span>#${seila.id}</span>
            <h1>${seila.name}</h1>
            <img src="${seila.sprites.other['official-artwork'].front_default}">
        </div>
        <div class="infoContainerData">
            <div class="abilities">
                <div class="headerData">
                    Abilities
                </div>
                <div class="abilityList">
                    <ul>
                        <li>${seila.abilities[0].ability.name}</li>
                        <li>${seila.abilities.length === 2 ? seila.abilities[1].ability.name : ''}</li>
                    </ul>
                </div>
                <div class="headerData">
                    Base Stats
                </div>
                <div class="atributtes">
                    <div class="containerColumns">
                        <div class="red">HP</div>
                        <div>${seila.stats[0].base_stat}</div>
                    </div>
                    <div class="containerColumns">
                        <div class="red">ATTACK</div>
                        <div>${seila.stats[1].base_stat}</div>
                    </div>
                    <div class="containerColumns">
                        <div class="red">DEFENSE</div>
                        <div>${seila.stats[2].base_stat}</div>
                    </div>
                    <div class="containerColumns">
                        <div class="red">SPECIAL-ATTACK</div>
                        <div>${seila.stats[3].base_stat}</div>
                    </div>
                    <div class="containerColumns">
                        <div class="red">SPECIAL-DEFENSE</div>
                        <div>${seila.stats[4].base_stat}</div>
                    </div>
                    <div class="containerColumns">
                        <div class="red">SPEED</div>
                        <div>${seila.stats[5].base_stat}</div>
                    </div>
                </div>
            </div>
            <div class="headerData">
                Evolution
            </div>
            <div class="containerBg">
                <div class="bg">
                    <img src="${primeriaEvolucao === '' ? '' : primeriaEvolucao.sprites.other['official-artwork'].front_default}">
                </div>
                <svg class="MuiSvgIcon-root arrow__right" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z"></path></svg>
                <div class="bg">
                    <img src="${segundaEvolucao === '' ? '' : segundaEvolucao.sprites.other['official-artwork'].front_default}">
                </div>
                <svg class="MuiSvgIcon-root arrow__right" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z"></path></svg>
                <div class="bg">
                    <img src="${terceiraEvolucao === '' ? 'fim' : terceiraEvolucao.sprites.other['official-artwork'].front_default}">
                </div>
            </div>
        </div>
    
    </div>
    
    `
    colocandoCor()
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
    container.style.cssText = `
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    `
    const names = document.querySelectorAll('.typeLink')
    names.forEach(item => {
        const index = item.getAttribute('data-id')
        const { url } = apiNames[index]
        item.addEventListener('click', async () => {
            const dados = await getPost(url)
            dados.pokemon.forEach(item => {
                typePokemon(item.pokemon.url)
            })
        })
    })
})

const typePokemon = async (url) => {
    type.style.display = 'none'
    const formatado = url.replace('https://pokeapi.co/api/v2/', '')
    const dados = await getPost(formatado)
    pokemonAll.innerHTML += `
    <div class="cardPokemon">
        <header>
            <h3>${dados.name}</h3>
            <span>${dados.id}</span>
        </header>
        <p data-type="${dados.types['0'].type.name}">${dados.types[0].type.name}</p>
        <p>${dados.types.length === 2 ? dados.types[1].type.name : ''}</p>
        <img class="pokeImage" src="${dados.sprites.other['official-artwork'].front_default}">    
    </div>
    `
    colocandoCor()
    click()
    
}

const click = async () => {
    const card = document.querySelectorAll('.cardPokemon')
    card.forEach(item => {
        item.addEventListener('click', async () => {
            pokemonAll.style.display = 'none'
            const name = item.children
            const namePokemon = name[0].children[0]
            const seila = await getPost(`pokemon/${namePokemon.innerText}`)
            const species = seila.species.url
            const speciesFormatado = species.replace('https://pokeapi.co/api/v2/', '')
            const oi = await getPost(speciesFormatado)
            const urlGeneration = oi.evolution_chain.url
            const generationFormatado = urlGeneration.replace('https://pokeapi.co/api/v2/', '')
            const generation = await getPost(generationFormatado)
            const primeriaEvolucao = generation.chain.species.name === undefined ? '' : await getPost(`pokemon/${generation.chain.species.name}`)
            const segundaEvolucao = generation.chain.evolves_to[0] === undefined ? '' : await getPost(`pokemon/${generation.chain.evolves_to[0].species.name}`)
            const terceiraEvolucao = generation.chain.evolves_to[0].evolves_to[0] === undefined ? '' : await getPost(`pokemon/${generation.chain.evolves_to[0].evolves_to[0].species.name}`)
            
            containerSearch.innerHTML = `
            <div class="infoContainer">
            <p data-type="${seila.types['0'].type.name}"></p>
        
                <div class="infoContainerImage">
                    <span>#${seila.id}</span>
                    <h1>${seila.name}</h1>
                    <img src="${seila.sprites.other['official-artwork'].front_default}">
                </div>
                <div class="infoContainerData">
                    <div class="abilities">
                        <div class="headerData">
                            Abilities
                        </div>
                        <div class="abilityList">
                            <ul>
                                <li>${seila.abilities[0].ability.name}</li>
                                <li>${seila.abilities.length === 2 ? seila.abilities[1].ability.name : ''}</li>
                            </ul>
                        </div>
                        <div class="headerData">
                            Base Stats
                        </div>
                        <div class="atributtes">
                            <div class="containerColumns">
                                <div class="red">HP</div>
                                <div>${seila.stats[0].base_stat}</div>
                            </div>
                            <div class="containerColumns">
                                <div class="red">ATTACK</div>
                                <div>${seila.stats[1].base_stat}</div>
                            </div>
                            <div class="containerColumns">
                                <div class="red">DEFENSE</div>
                                <div>${seila.stats[2].base_stat}</div>
                            </div>
                            <div class="containerColumns">
                                <div class="red">SPECIAL-ATTACK</div>
                                <div>${seila.stats[3].base_stat}</div>
                            </div>
                            <div class="containerColumns">
                                <div class="red">SPECIAL-DEFENSE</div>
                                <div>${seila.stats[4].base_stat}</div>
                            </div>
                            <div class="containerColumns">
                                <div class="red">SPEED</div>
                                <div>${seila.stats[5].base_stat}</div>
                            </div>
                        </div>
                    </div>
                    <div class="headerData">
                        Evolution
                    </div>
                    <div class="containerBg">
                        <div class="bg">
                            <img src="${primeriaEvolucao === '' ? '' : primeriaEvolucao.sprites.other['official-artwork'].front_default}">
                        </div>
                        <svg class="MuiSvgIcon-root arrow__right" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z"></path></svg>
                        <div class="bg">
                            <img src="${segundaEvolucao === '' ? '' : segundaEvolucao.sprites.other['official-artwork'].front_default}">
                        </div>
                        <svg class="MuiSvgIcon-root arrow__right" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z"></path></svg>
                        <div class="bg">
                            <img src="${terceiraEvolucao === '' ? 'fim' : terceiraEvolucao.sprites.other['official-artwork'].front_default}">
                        </div>
                    </div>
                </div>
            
            </div>`
            colocandoCor()
        })
    })
}

const randomNumbers = async (max = 898, min = 1) => {
    type.style.display = 'none'
    containerApi.innerHTML = ''
    const random = Math.round(Math.random() * (max - min) + min)
    console.log(random)
    const bosta = await getPost(`pokemon/${random}`)
    const species = bosta.species.url
            const speciesFormatado = species.replace('https://pokeapi.co/api/v2/', '')
            const oi = await getPost(speciesFormatado)
            const urlGeneration = oi.evolution_chain.url
            const generationFormatado = urlGeneration.replace('https://pokeapi.co/api/v2/', '')
            const generation = await getPost(generationFormatado)
            const primeriaEvolucao = generation.chain.species.name === undefined ? '' : await getPost(`pokemon/${generation.chain.species.name}`)
            const segundaEvolucao = generation.chain.evolves_to[0] === undefined ? '' : await getPost(`pokemon/${generation.chain.evolves_to[0].species.name}`)
            const terceiraEvolucao = generation.chain.evolves_to[0].evolves_to[0] === undefined ? '' : await getPost(`pokemon/${generation.chain.evolves_to[0].evolves_to[0].species.name}`)
            
            containerSearch.innerHTML = `
            <div class="infoContainer">
            <p data-type="${bosta.types['0'].type.name}"></p>
        
                <div class="infoContainerImage">
                    <span>#${bosta.id}</span>
                    <h1>${bosta.name}</h1>
                    <img src="${bosta.sprites.other['official-artwork'].front_default}">
                </div>
                <div class="infoContainerData">
                    <div class="abilities">
                        <div class="headerData">
                            Abilities
                        </div>
                        <div class="abilityList">
                            <ul>
                                <li>${bosta.abilities[0].ability.name}</li>
                                <li>${bosta.abilities.length === 2 ? bosta.abilities[1].ability.name : ''}</li>
                            </ul>
                        </div>
                        <div class="headerData">
                            Base Stats
                        </div>
                        <div class="atributtes">
                            <div class="containerColumns">
                                <div class="red">HP</div>
                                <div>${bosta.stats[0].base_stat}</div>
                            </div>
                            <div class="containerColumns">
                                <div class="red">ATTACK</div>
                                <div>${bosta.stats[1].base_stat}</div>
                            </div>
                            <div class="containerColumns">
                                <div class="red">DEFENSE</div>
                                <div>${bosta.stats[2].base_stat}</div>
                            </div>
                            <div class="containerColumns">
                                <div class="red">SPECIAL-ATTACK</div>
                                <div>${bosta.stats[3].base_stat}</div>
                            </div>
                            <div class="containerColumns">
                                <div class="red">SPECIAL-DEFENSE</div>
                                <div>${bosta.stats[4].base_stat}</div>
                            </div>
                            <div class="containerColumns">
                                <div class="red">SPEED</div>
                                <div>${bosta.stats[5].base_stat}</div>
                            </div>
                        </div>
                    </div>
                    <div class="headerData">
                        Evolution
                    </div>
                    <div class="containerBg">
                        <div class="bg">
                            <img src="${primeriaEvolucao === '' ? '' : primeriaEvolucao.sprites.other['official-artwork'].front_default}">
                        </div>
                        <svg class="MuiSvgIcon-root arrow__right" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z"></path></svg>
                        <div class="bg">
                            <img src="${segundaEvolucao === '' ? '' : segundaEvolucao.sprites.other['official-artwork'].front_default}">
                        </div>
                        <svg class="MuiSvgIcon-root arrow__right" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z"></path></svg>
                        <div class="bg">
                            <img src="${terceiraEvolucao === '' ? 'fim' : terceiraEvolucao.sprites.other['official-artwork'].front_default}">
                        </div>
                    </div>
                </div>
            
            </div>`
            colocandoCor()
}

randomButton.addEventListener('click', () => {
    randomNumbers()
})
