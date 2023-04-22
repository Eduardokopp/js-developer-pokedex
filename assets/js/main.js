const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const modalDetails = document.getElementById('modalDetails')
const bodyModalDetails = document.getElementById('bodyModalDetails')


const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToHTML(pokemon) {
    return `
    <div id="pokemon"class="col-12 col-sm-6 col-md-4 col-lg-3 text-white h-100">
        <div class="pokemon ${pokemon.type}" onclick="loadPokemonDetails(${pokemon.number})">
            <div class="w-100 text-end">
                <span class="number" >#${pokemon.number}</span>
            </div>
            <div class="w-100 text-start mb-2 ">
                <span class="fw-light text-capitalize">${pokemon.name}</span>
            </div>
            <div class="row">
                <div class="col d-flex flex-column align-self-center">
                    ${pokemon.types.map((type) =>
        `<span class="type fw-light w-75 text-capitalize ${type}">${type}</span>`).join('')}
                </div>
                <div class="col text-end">
                    <img class="img-fluid" style="max-height: 70px;" src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </div>
        </div>
    </div>
    `
}

function convertPokemonToModal(pokemon) {
    return `
<div id="pokemon"class="col-12 col-sm-6 col-md-4 col-lg-3 text-white h-100">
        <div class="pokemon ${pokemon.type}" onclick="loadPokemonDetails(${pokemon.number})">
            <div class="w-100 text-end">
                <span class="number" >#${pokemon.number}</span>
            </div>
            <div class="w-100 text-start mb-2 ">
                <span class="fw-light text-capitalize">${pokemon.name}</span>
            </div>
            <div class="row">
                <div class="col d-flex flex-column align-self-center">
                    ${pokemon.types.map((type) =>
        `<span class="type fw-light w-75 text-capitalize ${type}">${type}</span>`).join('')}
                </div>
                <div class="col text-end">
                    <img class="img-fluid" style="max-height: 70px;" src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </div>
        </div>
    </div>
    `
}


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToHTML).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function loadPokemonDetails(id) {
    pokeApi.getPokemon(id).then((pokemon = []) => {
        const newModal = convertPokemonToModal(pokemon);
        bodyModalDetails.innerHTML = newModal
    })

    $("#modalDetails").modal("show");
}