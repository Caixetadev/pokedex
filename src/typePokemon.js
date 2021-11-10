const container = document.querySelector('.types')

const apiNames = [
    {
        name: 'Eletric',
        url: 'type/13/'
    },
    {
        name: 'Water',
        url: 'type/11/'
    }
]

apiNames.forEach((element, index) => {
    container.innerHTML += `
    
    <a class="typeLink" data-id="${index}" href="#">${element.name}</a>

    `
});