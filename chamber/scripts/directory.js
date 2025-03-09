document.addEventListener('DOMContentLoaded', () => {
    const directory = document.getElementById('directory');
    const gridBtn = document.getElementById('grid-view');
    const listBtn = document.getElementById('list-view');

    // Fetch and display members
    fetch('data/members.json')
        .then(response => response.json())
        .then(members => {
            displayMembers(members, 'grid');
        })
        .catch(error => console.error('Error fetching members:', error));

    // Toggle view
    gridBtn.addEventListener('click', () => {
        directory.className = 'grid';
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
        fetchAndDisplay('grid');
    });

    listBtn.addEventListener('click', () => {
        directory.className = 'list';
        listBtn.classList.add('active');
        gridBtn.classList.remove('active');
        fetchAndDisplay('list');
    });

    function fetchAndDisplay(view) {
        fetch('data/members.json')
            .then(response => response.json())
            .then(members => displayMembers(members, view));
    }

    function displayMembers(members, view) {
        directory.innerHTML = '';
        members.forEach(member => {
            if (view === 'grid') {
                directory.innerHTML += `
                    <div class="card">
                        <img src="images/${member.image}" alt="${member.name}">
                        <h2>${member.name}</h2>
                        <p>${member.address}</p>
                        <p>${member.phone}</p>
                        <a href="${member.website}" target="_blank">Website</a>
                        <p>Membership: ${member.membershipLevel}</p>
                        <p>${member.description}</p>
                    </div>
                `;
            } else {
                directory.innerHTML += `
                    <div class="list-item">
                        <img src="images/${member.image}" alt="${member.name}">
                        <div>
                            <h2>${member.name}</h2>
                            <p>${member.address} | ${member.phone}</p>
                            <a href="${member.website}" target="_blank">Website</a> | 
                            Membership: ${member.membershipLevel}
                        </div>
                    </div>
                `;
            }
        });
    }
});