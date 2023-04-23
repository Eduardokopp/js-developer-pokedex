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
    <div class="modal-body ${pokemon.type} ">
        <section class="container section-pokemon rounded-3 p-0  p-md-5 ${pokemon.type}  ">
            <div class="m-auto w-50 text-white w-100 p-0  p-md-5">
                <div class="d-flex justify-content-between align-items-center">
                    <h1>Ivysaur</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="d-flex w-50 ">
                    ${pokemon.types.map((type) =>`<span
                        class="type fw-light me-1 w-100 text-capitalize ${type}">${type}</span>`).join('')}
                </div>
                <div class="d-flex justify-content-center align-items-center py-5">
                    <img src="${pokemon.photo}" alt="" srcset="" class="img-fluid">
                </div>
                    <div class="row rounded bg-light text-dark px-2 text-center m-auto">
                        <div class="col-12 mt-3">
                            <h3 class="text-capitalize">About ${pokemon.name}</h3>
                        </div>
                        <div class="col-6 border-bottom border-dark">Number</div>
                        <div class="col-6 border-bottom border-dark">#${pokemon.number}</div>
                        <div class="col-6 border-bottom border-dark">Name</div>
                        <div class="col-6 border-bottom border-dark">${pokemon.name}</div>
                        <div class="col-6 border-bottom border-dark">Types</div>
                        <div class="col-6 border-bottom border-dark">${pokemon.types.join()}</div>
                        <div class="col-6 border-bottom border-dark">Heigth</div>
                        <div class="col-6 border-bottom border-dark">${pokemon.height}</div>
                        <div class="col-6 border-bottom border-dark">Weigth</div>
                        <div class="col-6 border-bottom border-dark">${pokemon.weight}</div>
                        <div class="col-6 border-bottom border-dark">Base Exp</div>
                        <div class="col-6 border-bottom border-dark">${pokemon.baseExp}</div>
                        <div class="col-6 border-bottom border-dark">Abilities</div>
                        <div class="col-6 border-bottom border-dark">${pokemon.abilities.join()}</div>
                </div>
            </div>
        </section>
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