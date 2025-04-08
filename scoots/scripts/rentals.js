function populateTable(rentals) {
    const tbody = document.getElementById('tableBody');
    
    rentals.forEach(rental => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${rental.class}</td>
            <td>${rental.type}</td>
            <td>${rental.persons}</td>
            <td class="price">${rental.reservation_half_day}</td>
            <td class="price">${rental.reservation_full_day}</td>
            <td class="price">${rental.walk_in_half_day}</td>
            <td class="price">${rental.walk_in_full_day}</td>
        `;
        tbody.appendChild(row);
    });
}

// Fetch data from external JSON file
fetch('../scoots/data/rentals.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Assuming the JSON structure has a "rentals" array
        populateTable(data.rentals);
    })
    .catch(error => {
        console.error('Error loading JSON:', error);
        // Optional: Add error message to the page
        const tbody = document.getElementById('tableBody');
        tbody.innerHTML = '<tr><td colspan="7">Error loading rental data</td></tr>';
    });