const SCRIPT_URL = ‘https://script.google.com/macros/s/AKfycby3r62kYIa3sYO9pt_yIIPpeBppgwLJsxJyaebm1tKfQrzdQ1HfrV6wgxfvid4zDMnz/exec';

// 顯示其他選項的輸入框
document.getElementById('other-check').addEventListener('change', (e) => {
    document.getElementById('other-food').style.display = e.target.checked ? 'block' : 'none';
});

// P1: 接受邀請蓋章與跳轉
document.getElementById('btn-accept').addEventListener('click', () => {
    const name = document.getElementById('name').value;
    if(!name) return alert("Please enter your name");
    
    // 顯示蓋章動畫
    document.getElementById('stamp').classList.remove('hidden');
    document.getElementById('stamp').classList.add('show');
    
    // 延遲跳轉以展示蓋章效果
    setTimeout(() => {
        document.getElementById('page-1').classList.remove('active');
        document.getElementById('page-2').classList.add('active');
    }, 1200);
});

// 頁面導航與背景過場邏輯
document.querySelectorAll('.next-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const current = e.target.closest('.page');
        const nextId = btn.dataset.next;
        const nextSection = document.getElementById(nextId);

        // 驗證電話 (Page 2)
        if(current.id === 'page-2' && !/^\d{8}$/.test(document.getElementById('phone').value)) {
            return alert("Please enter a valid 8-digit phone number");
        }

        // 背景影片過場處理
        if (nextSection.dataset.bg) {
            const video = document.getElementById('bg-video');
            const source = video.querySelector('source');
            if (source.src.indexOf(nextSection.dataset.bg) === -1) {
                source.src = nextSection.dataset.bg;
                video.load();
                video.play();
            }
        }

        current.classList.remove('active');
        nextSection.classList.add('active');

        // 最後一頁執行送出
        if(btn.id === 'submit-btn') {
            submitData();
        }
    });
});

// 送出資料到 Google Sheet
function submitData() {
    const foodItems = Array.from(document.querySelectorAll('input[name="food"]:checked'))
                           .map(i => i.value === 'Other' ? document.getElementById('other-food').value : i.value);
    
    const data = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        food: foodItems.join(', '),
        drink: ['Maybe next time', 'A bit tipsy', 'Alcoholic'][document.getElementById('drink-level').value],
        song: document.getElementById('song').value
    };

    fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(() => {
        console.log("Data submitted successfully");
    })
    .catch(error => {
        console.error("Submission error:", error);
    });
}
