document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('add-photoshoot-form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        addPhotoshoot();
    });

    loadPhotoshoots();
});

function addPhotoshoot() {
    const form = document.getElementById('add-photoshoot-form');
    const companySelect = document.getElementById('company');
    const revenueInput = document.getElementById('revenue');
    const hoursInput = document.getElementById('hours');
    const dateInput = document.getElementById('date');
    const typeOfShootInput = document.getElementById('type_of_shoot');

    if (companySelect.value === 'TMC') {
        if (hoursInput.value === '') {
            alert('Please enter the Number of Hours for TMC.');
            return;
        } else {
            const hours = parseFloat(hoursInput.value);
            const hourlyRate = 85;
            const revenue = hours * hourlyRate;
            revenueInput.value = revenue;
        }
    }

    const formData = new FormData(form);

    fetch('/add-photoshoot', {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            form.reset();
            loadPhotoshoots();
        })
        .catch(error => {
            console.error('Error adding photoshoot:', error);
        });
}

function loadPhotoshoots() {
    fetch('/get-photoshoots')
        .then(response => response.json())
        .then(data => {
            displayPhotoshoots(data);
        })
        .catch(error => {
            console.error('Error fetching photoshoots:', error);
        });
}

function displayPhotoshoots(photoshoots) {
    const table = document.getElementById('photoshoot-table');
    table.innerHTML = '';

    photoshoots.forEach(photoshoot => {
        const row = table.insertRow();
        row.insertCell(0).textContent = photoshoot.date;
        row.insertCell(1).textContent = photoshoot.company;
        row.insertCell(2).textContent = photoshoot.revenue;
        row.insertCell(3).textContent = photoshoot.type_of_shoot;
    });
}
