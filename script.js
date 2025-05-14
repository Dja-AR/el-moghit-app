// زر ابدأ الآن
const startNowBtn = document.getElementById('startNowBtn');

// عند الضغط على زر ابدأ الآن
startNowBtn.addEventListener('click', function() {
    fetch('admin.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('فشل تحميل الصفحة');
            }
            return response.text();
        })
        .then(data => {
            const adminContent = document.getElementById('adminContent');
            adminContent.innerHTML = data;
            adminContent.style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        })
        .catch(error => {
            console.error('خطأ أثناء تحميل admin.html:', error);
        });
});

// إظهار وإخفاء الزر عند التمرير
window.addEventListener('scroll', () => {
    if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 100) {
        startNowBtn.style.display = 'block';
    } else {
        startNowBtn.style.display = 'none';
    }
});

// تفعيل مكتبة AOS
AOS.init();
