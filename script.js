// 1. Scroll (Kaydırma) Animasyonu
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}
window.addEventListener("scroll", reveal);
reveal();

// 2. Mobil Menü (Burger) İşlevi
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
});

// 3. Karadelik Arka Plan Animasyonu (Ana Sayfa İçin)
const canvas = document.getElementById('physicsCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height, center;

    // Sadece ana sayfa (home) bölümü kadar (100vh) kaplaması için
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight; 
        center = { x: width / 2, y: height / 2 };
    }
    window.addEventListener('resize', resize);
    resize();

    const particles = [];
    const particleCount = 350;

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.angle = Math.random() * Math.PI * 2;
            this.distance = Math.random() * (width > height ? width : height);
            this.size = Math.random() * 2 + 0.5;
            this.speed = Math.random() * 0.02 + 0.005;
            this.pull = Math.random() * 2 + 0.5;
            
            // Toprak ve Kahve temasına uygun renkler (Ateş, kiremit, kehribar tonları)
            const colors = ['#80461B', '#a65c26', '#ffb347', '#ff7b00', '#f4eae1'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        update() {
            this.distance -= this.pull;
            this.angle += this.speed;
            
            if (this.distance < 45) {
                this.reset();
                this.distance = (width > height ? width : height) / 1.1;
            }
        }
        draw() {
            const x = center.x + Math.cos(this.angle) * this.distance;
            const y = center.y + Math.sin(this.angle) * this.distance;

            ctx.beginPath();
            ctx.arc(x, y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.shadowBlur = 0; 
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        // Tam siyah yerine sitenin kendi koyu kahve (#331800) arkaplanına 
        // doğru eriyen bir kuyruk efekti veriyoruz.
        ctx.fillStyle = "rgba(51, 24, 0, 0.2)"; 
        ctx.fillRect(0, 0, width, height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        // Merkezdeki Karadelik (Olay Ufku)
        ctx.beginPath();
        ctx.arc(center.x, center.y, 50, 0, Math.PI * 2);
        ctx.fillStyle = "#120800"; // Deliğin içi ekstra koyu siyah/kahve
        ctx.shadowBlur = 70;
        ctx.shadowColor = "#80461B"; // Karadeliğin etrafındaki kiremit rengi hale
        ctx.fill();
        ctx.shadowBlur = 0; 

        requestAnimationFrame(animate);
    }

    animate();
}
