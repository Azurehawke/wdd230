// Show/hide cruise line field based on rental type
const rentalType = document.getElementById('rental-type');
const cruiseSection = document.getElementById('cruise-line-section');
rentalType.addEventListener('change', () => {
  cruiseSection.style.display = rentalType.value === 'cruise' ? 'block' : 'none';
});