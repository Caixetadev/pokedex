const container = document.querySelector('.types')

const apiNames = [
    {
        name: 'grass',
        img: './src/assets/type-grass.svg',
        url: 'type/grass/'
    },
    {
        name: 'Bug',
        img: './src/assets/type-bug.svg',
        url: 'type/bug/'
    },
    {
        name: 'Electric',
        img: './src/assets/type-electric.svg',
        url: 'type/electric/'
    },
    {
        name: 'Rock',
        img: './src/assets/type-rock.svg',
        url: 'type/rock/'
    },
    {
        name: 'Ground',
        img: './src/assets/type-ground.svg',
        url: 'type/ground/'
    },
    {
        name: 'Ice',
        img: './src/assets/type-ice.svg',
        url: 'type/ice/'
    },
    {
        name: 'Fighting',
        img: './src/assets/type-fighting.svg',
        url: 'type/fighting/'
    },
    {
        name: 'Dark',
        img: './src/assets/type-dark.svg',
        url: 'type/dark/'
    },
    {
        name: 'Water',
        img: './src/assets/type-water.svg',
        url: 'type/water/'
    },
    {
        name: 'Steel',
        img: './src/assets/type-steel.svg',
        url: 'type/steel/'
    },
    {
        name: 'Ghost',
        img: './src/assets/type-ghost.svg',
        url: 'type/ghost/'
    },
    {
        name: 'Fire',
        img: './src/assets/type-fire.svg',
        url: 'type/fire/'
    },
    {
        name: 'Flying',
        img: './src/assets/type-flying.svg',
        url: 'type/flying/'
    },
    {
        name: 'Fairy',
        img: './src/assets/type-fairy.svg',
        url: 'type/fairy/'
    },
    {
        name: 'Dragon',
        img: './src/assets/type-dragon.svg',
        url: 'type/dragon/'
    },
    {
        name: 'Poison',
        img: './src/assets/type-poison.svg',
        url: 'type/poison/'
    },
    {
        name: 'Psychic',
        img: './src/assets/type-psychic.svg',
        url: 'type/psychic/'
    }
]

apiNames.forEach((element, index) => {
    container.innerHTML += `
    <div class="types-pokemon">
        <a class="typeLink" style="display: block;" data-id="${index}" href="#">
            <img src="${element.img}">
            <p style="text-align: center;">${element.name}</p>
        </a>
    </div>
    `
});