const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyywIExXeXFqWhWjyReNdHMOHOkYviVZJrbSxAIUCLEW6-wx3LY6R5SQklpdfwCqHbHWA/exec';
const pages = document.querySelectorAll('.page');

// 顯示其他食物欄位
document.getElementById('other-check').addEventListener('change', (e) => {
    document.getElementById('other-food').style.display = e.target.checked ? 'block' : 'none';
});

// 蓋章邏輯與跳轉
document.getElementById('btn-accept').addEventListener('click', () => {
    if(!document.getElementById('name').value) return alert("請輸入名字");
    const stamp = document.getElementById('stamp');
    stamp.classList.remove('hidden');
    stamp.classList.add('show');
    setTimeout(() => {
        pages[0].classList.remove('active');
        pages[1].classList.add('active');
    }, 1500);
});

// 下一頁驗證
document.querySelectorAll('.next-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const current = e.target.closest('.page');
        if(current.id === 'page-2') {
            const phone = document.getElementById('phone').value;
            if(!/^\d{8}$/.test(phone)) return alert("請輸入正確的 8 位數字電話");
        }
        current.classList.remove('active');
        document.getElementById(btn.dataset.next).classList.add('active');
        
        if(btn.id === 'submit-btn') submitData();
    });
});

function submitData() {
    const data = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        food: Array.from(document.querySelectorAll('input[name="food"]:checked')).map(i => i.value).join(','),
        drink: document.getElementById('drink-level').value,
        song: document.getElementById('song').value
    };
    fetch(SCRIPT_URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(data) });
}