// Paste your Google Web App URL here
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyywIExXeXFqWhWjyReNdHMOHOkYviVZJrbSxAIUCLEW6-wx3LY6R5SQklpdfwCqHbHWA/exec';

const pages = document.querySelectorAll('.page');
let formData = {};

function goToPage(targetId) {
    pages.forEach(page => {
        page.style.opacity = 0;
        setTimeout(() => {
            page.classList.remove('active');
            if (page.id === targetId) {
                page.classList.add('active');
                setTimeout(() => page.style.opacity = 1, 50);
            }
        }, 500); 
    });
}

// Page 1: Accept Button & Stamp Animation
document.getElementById('btn-accept').addEventListener('click', () => {
    const stamp = document.getElementById('stamp');
    stamp.classList.remove('hidden');
    
    // Trigger cinematic stamp
    setTimeout(() => { stamp.classList.add('show'); }, 10);

    // Flow to Location Briefing (Page 2) instead of Page 3
    setTimeout(() => { goToPage('page-2'); }, 1600);
});

// Generic Next Buttons
document.querySelectorAll('.next-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const nextId = e.target.getAttribute('data-next');
        goToPage(nextId);
    });
});

// Food Selection Logic (Limit to 2)
const foodCheckboxes = document.querySelectorAll('input[name="food"]');
const foodOtherText = document.getElementById('food-other-text');
const foodOtherCheck = document.getElementById('food-other-check');

foodCheckboxes.forEach(box => {
    box.addEventListener('change', () => {
        const checked = document.querySelectorAll('input[name="food"]:checked');
        if (checked.length > 2) {
            box.checked = false; 
            alert("Please select only two options to keep the kitchen smooth.");
        }
        if (foodOtherCheck.checked) {
            foodOtherText.classList.remove('hidden');
        } else {
            foodOtherText.classList.add('hidden');
        }
    });
});

// Final Submit
document.getElementById('submit-btn').addEventListener('click', () => {
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.innerText = "TRANSMITTING...";
    
    formData.name = document.getElementById('guest-name').value;
    formData.phone = document.getElementById('guest-phone').value;
    formData.song = document.getElementById('song-request').value;
    
    let selectedFood = Array.from(document.querySelectorAll('input[name="food"]:checked')).map(cb => cb.value);
    if (selectedFood.includes('Other')) {
        selectedFood[selectedFood.indexOf('Other')] = document.getElementById('food-other-text').value;
    }
    formData.food = selectedFood.join(', ');
    
    const drinkSelection = document.querySelector('input[name="drink"]:checked');
    formData.drinks = drinkSelection ? drinkSelection.value : "None";

    document.getElementById('summary-name').innerText = formData.name;

    fetch(SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'text/plain;charset=utf-8' }
    })
    .then(response => response.json())
    .then(data => {
        goToPage('page-7');
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Transmission interference. Please try again.");
        submitBtn.innerText = "SUBMIT RSVP";
    });
});