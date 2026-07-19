const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyywIExXeXFqWhWjyReNdHMOHOkYviVZJrbSxAIUCLEW6-wx3LY6R5SQklpdfwCqHbHWA/exec';

// 1. 蓋章後跳轉
document.getElementById('btn-accept').addEventListener('click', () => {
    const stamp = document.getElementById('stamp');
    stamp.classList.remove('hidden');
    setTimeout(() => stamp.classList.add('show'), 100);
    setTimeout(() => {
        document.getElementById('page-1').classList.remove('active');
        document.getElementById('page-2').classList.add('active');
    }, 1500);
});

// 2. 處理食物多選限制
const checkboxes = document.querySelectorAll('input[name="food"]');
checkboxes.forEach(cb => cb.addEventListener('change', () => {
    const checked = document.querySelectorAll('input[name="food"]:checked');
    if (checked.length > 2) cb.checked = false;
}));

// 3. 最後送出
document.getElementById('page-6').addEventListener('click', () => {
    const data = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        food: Array.from(document.querySelectorAll('input[name="food"]:checked')).map(i => i.value).join(','),
        drink: document.querySelector('input[name="drink"]:checked')?.value,
        song: document.getElementById('song').value
    };
    fetch(SCRIPT_URL, { method: 'POST', body: JSON.stringify(data) });
});