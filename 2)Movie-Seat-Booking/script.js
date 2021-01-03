const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex === null) {
        return;
    }

    movieSelect.selectedIndex = selectedMovieIndex;
}

container.addEventListener('click', (event) => {
    if(!event.target.classList.contains('seat') || event.target.classList.contains('occupied')){
        return;
    }

    event.target.classList.toggle('selected');
    updateSelectedCount();
})

movieSelect.addEventListener('input', (event) => {
    ticketPrice = +event.target.value;
    setMovieData(event.target.selectedIndex, event.target.value);
    updateSelectedCount();
})

function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

function updateSelectedCount() {
    const selectedSeats = container.querySelectorAll('.seat.selected');

    const selectedSeatsIndex = [...selectedSeats].map((selectedSeat) => {
        return [...seats].indexOf(selectedSeat);
    })

    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeatsIndex));

    const selectedSeatsCount = selectedSeats.length; 

    count.innerText = selectedSeatsCount
    total.innerText = selectedSeatsCount * ticketPrice;
}

updateSelectedCount();