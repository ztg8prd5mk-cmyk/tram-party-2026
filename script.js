// 1. 請在此處替換你的網址 (必須以 /exec 結尾)
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwNVeWCSSGPg-vW1ajV1JJB4IwI7rpHtB4UIgKNQlHCidmmSxcrYjPxEzNZBpGbFIbshw/exec';

// 頁面切換控制
const pages = document.querySelectorAll('.page');

// 顯示或隱藏 "Other" 欄位
document.getElementById('other-check').addEventListener('change', (e) => {
    document.getElementById('other-food').style.display = e.target.checked ? 'block' : 'none';
});

// P1: 蓋章動畫與跳轉
document.getElementById('btn-accept').addEventListener('click', () => {
    const name = document.getElementById('name').value;
    if(!name) return alert("Please enter your name");
    
    document.getElementById('stamp').classList.remove('hidden');
    document.getElementById('stamp').classList.add('show');
    
    setTimeout(() => {
        document.getElementById('page-1').classList.remove('active');
        document.getElementById('page-2').classList.add('active');
    }, 1500);
});

// 導航與資料送出邏輯
document.querySelectorAll('.next-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const current = e.target.closest('.page');
        const nextId = btn.dataset.next;
        const nextSection = document.getElementById(nextId);

        // P2: 驗證 8 位數電話
        if(current.id === 'page-2' && !/^\d{8}$/.test(document.getElementById('phone').value)) {
            return alert("Please enter a valid 8-digit phone number");
        }

        // 背景影片過場切換
        if (nextSection.dataset.bg) {
            const videoSource = document.querySelector('#bg-video source');
            const video = document.getElementById('bg-video');
            videoSource.src = nextSection.dataset.bg;
            video.load();
        }

        current.classList.remove('active');
        nextSection.classList.add('active');

        // 最後一頁執行資料送出
        if(btn.id === 'submit-btn') {
            submitData();
        }
    });
});

// 資料送出函數 (使用 fetch 傳送 JSON)
function submitData() {
    const foodList = Array.from(document.querySelectorAll('input[name="food"]:checked'))
                          .map(i => i.value === 'Other' ? document.getElementById('other-food').value : i.value);
    
    const data = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        food: foodList.join(', '),
        drink: ['Maybe next time', 'A bit tipsy', 'Alcoholic'][document.getElementById('drink-level').value],
        song: document.getElementById('song').value
    };

    fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // 處理跨域請求
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(() => console.log('Data successfully sent to Sheet'))
    .catch(error => console.error('Error:', error));
}