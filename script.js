const SCRIPT_URL = '請務必貼上你的 Google Apps Script 網址';

document.getElementById('other-check').addEventListener('change', (e) => {
    document.getElementById('other-food').style.display = e.target.checked ? 'block' : 'none';
});

document.getElementById('btn-accept').addEventListener('click', () => {
    if(!document.getElementById('name').value) return alert("Please enter your name");
    document.getElementById('stamp').classList.remove('hidden');
    document.getElementById('stamp').classList.add('show');
    setTimeout(() => {
        document.getElementById('page-1').classList.remove('active');
        document.getElementById('page-2').classList.add('active');
    }, 1500);
});

document.querySelectorAll('.next-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const current = e.target.closest('.page');
        const nextSection = document.getElementById(btn.dataset.next);

        if(current.id === 'page-2' && !/^\d{8}$/.test(document.getElementById('phone').value)) 
            return alert("Please enter a valid 8-digit phone number");

        if (nextSection.dataset.bg) {
            const videoSource = document.querySelector('#bg-video source');
            const video = document.getElementById('bg-video');
            videoSource.src = nextSection.dataset.bg;
            video.load();
        }

        current.classList.remove('active');
        nextSection.classList.add('active');
        if(btn.id === 'submit-btn') submitData();
    });
});

function submitData() {
    const data = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        food: Array.from(document.querySelectorAll('input[name="food"]:checked')).map(i => i.value).join(','),
        drink: ['Maybe next time', 'A bit tipsy', 'Alcoholic'][document.getElementById('drink-level').value],
        song: document.getElementById('song').value
    };
    fetch(SCRIPT_URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(data) });
}