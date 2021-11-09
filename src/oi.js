const container = document.querySelector('.types')

const maria = [
    {
        name: 'Eletric',
        url: 'type/13/'
    },
    {
        name: 'Water',
        url: 'type/11/'
    }
]

maria.forEach((element, index) => {
    container.innerHTML += `
    
    <a class="typeLink" data-id="${index}" href="#">${element.name}</a>

    `
});