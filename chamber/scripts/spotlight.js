document.addEventListener('DOMContentLoaded', () => {
  fetch('../chamber/data/members.json')
    .then(response => response.json())
    .then(data => {
      // Filter for Silver or Gold members
      const eligibleMembers = data.filter(member => 
        member.membershipLevel === 'Silver' || member.membershipLevel === 'Gold'
      );
      // Randomly select 3 members
      const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());
      const selectedMembers = shuffled.slice(0, 3);

      // Get the spotlight container
      const container = document.getElementById('spotlight-container');

      // Populate the container with member data
      selectedMembers.forEach(member => {
        const memberDiv = document.createElement('div');
        memberDiv.classList.add('spotlight-member');

        const img = document.createElement('img');
        img.src = `../chamber/images/${member.image}`;
        img.alt = `${member.name}`;
        img.onerror = () => { img.src = '../chamber/images/placeholder.webp'; };

        const p = document.createElement('p');
        p.innerHTML = `<strong>${member.name}</strong><br>${member.description}`;

        const contactDiv = document.createElement('div');
        contactDiv.classList.add('member-contact');
        contactDiv.innerHTML = `
          <p>Email: <a href="mailto:${member.email}">${member.email}</a></p>
          <p>Phone: ${member.phone}</p>
          <p>Website: <a href="${member.website}" target="_blank">${member.website}</a></p>
        `;

        memberDiv.appendChild(img);
        memberDiv.appendChild(p);
        memberDiv.appendChild(contactDiv);
        container.appendChild(memberDiv);
      });
    })
    .catch(error => {
      console.error('Error loading members:', error);
      const container = document.getElementById('spotlight-container');
      container.innerHTML = '<p>Unable to load member data.</p>';
    });
});