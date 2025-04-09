// Fetch rental data and populate vehicle types
let rentalData = {};
fetch('../scoots/data/rentals.json')
  .then(response => response.json())
  .then(data => {
    rentalData = data;
    calculateCost(); // Initial calculation if defaults are selected
  })
  .catch(error => console.error('Error fetching rentals.json:', error));

const rentalClass = document.getElementById('rental-class');
const rentalType = document.getElementById('rental-type');
const rentalPeriod = document.getElementById('rental-period');
const costDisplay = document.getElementById('cost-display');

// Update vehicle type options when rental class changes
rentalClass.addEventListener('change', () => {
  const selectedClass = rentalClass.value;
  rentalType.innerHTML = '<option value="">Select Vehicle Type</option>'; // Reset options
  rentalType.disabled = !selectedClass; // Enable only if class is selected

  if (selectedClass && rentalData.rentals) {
    const vehicles = rentalData.rentals.filter(item => item.class === selectedClass);
    vehicles.forEach(vehicle => {
      const option = document.createElement('option');
      option.value = vehicle.type;
      option.textContent = `${vehicle.type} (Up to ${vehicle.persons} person${vehicle.persons > 1 ? 's' : ''})`;
      rentalType.appendChild(option);
    });
  }
  calculateCost(); // Recalculate cost after class change
});

// Recalculate cost when rental type or period changes
rentalType.addEventListener('change', calculateCost);
rentalPeriod.addEventListener('change', calculateCost);

function calculateCost() {
  const type = rentalType.value; // Specific vehicle type (e.g., "Honda Metro Scooter")
  const period = rentalPeriod.value; // "half-day" or "full-day"
  let cost = 0;

  if (type && period && rentalData.rentals) {
    const rental = rentalData.rentals.find(item => item.type === type);
    if (rental) {
      cost = period === 'half-day' ? rental.reservation_half_day : rental.reservation_full_day;
    }
  }

  costDisplay.textContent = `$${cost.toFixed(2)}`;
}

// Handle form submission and redirect
document.getElementById('rental-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  console.log(Object.fromEntries(formData)); // For debugging
  window.location.href = '../scoots/submit.html';
});
