const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwNVeWCSSGPg-vW1ajV1JJB4IwI7rpHtB4UIgKNQlHCidmmSxcrYjPxEzNZBpGbFIbshw/exec'; // <--- 請務必在此處更新你的網址

// Toggle Other Input
document.getElementById('other-check').addEventListener('change', (e) => {
    document.getElementById('other-food').style.display = e.target.checked ? 'block' : 'none';
});

// Navigation Logic
document.querySelectorAll('.next-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const current = e.target.closest('.page');
        const nextSection = document.getElementById(btn.dataset.next);

        // Phone Validation
        if(current.id === 'page-2' && !/^\d{8}$/.test(document.getElementById('phone').value)) 
            return alert("Please enter a valid 8-digit phone number");

        // Background Change
        if (nextSection.dataset.bg) {
            const videoSource = document.querySelector('#bg-video source');
            const video = document.getElementById('bg-video');
            videoSource.src = nextSection.dataset.bg;
            video.load();
        }

        current.classList.remove('active');
        nextSection.classList.add('active');

        // Submit Data
        if(btn.id === 'submit-btn') {
            const data = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                food: Array.from(document.querySelectorAll('input[name="food"]:checked')).map(i => i.value).join(','),
                drink: ['Maybe next time', 'A bit tipsy', 'Alcoholic'][document.getElementById('drink-level').value],
                song: document.getElementById('song').value
            };

            fetch(SCRIPT_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain' }, // 配合 no-cors
                body: JSON.stringify(data)
            }).then(() => console.log('Data sent successfully'));
        }
    });
});