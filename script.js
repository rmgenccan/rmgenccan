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


// --- 3D Particle Sphere Canvas (eokahya.github.io esintili Dönen Nokta Küre) ---
const sphereCanvas = document.getElementById('sphereCanvas');
if (sphereCanvas) {
        const sCtx = sphereCanvas.getContext('2d');
        let sWidth = sphereCanvas.width = sphereCanvas.clientWidth || 300;
        let sHeight = sphereCanvas.height = sphereCanvas.clientHeight || 300;
        const numDots = 200;
        const dots = [];
        const radius = Math.min(sWidth, sHeight) * 0.35;
        let angleX = 0.005;
        let angleY = 0.005;

    for (let i = 0; i < numDots; i++) {
                const theta = Math.acos(2 * Math.random() - 1);
                const phi = 2 * Math.PI * Math.random();
                dots.push({
                                x: radius * Math.sin(theta) * Math.cos(phi),
                                y: radius * Math.sin(theta) * Math.sin(phi),
                                z: radius * Math.cos(theta)
                });
    }

    function renderSphere() {
                sCtx.clearRect(0, 0, sWidth, sHeight);
                const cx = sWidth / 2;
                const cy = sHeight / 2;

            for (let i = 0; i < dots.length; i++) {
                            let d = dots[i];
                            let cosX = Math.cos(angleX), sinX = Math.sin(angleX);
                            let cosY = Math.cos(angleY), sinY = Math.sin(angleY);

                    let y1 = d.y * cosX - d.z * sinX;
                            let z1 = d.z * cosX + d.y * sinX;
                            let x1 = d.x * cosY + z1 * sinY;
                            let z2 = z1 * cosY - d.x * sinY;

                    d.x = x1; d.y = y1; d.z = z2;

                    let scale = 300 / (300 + d.z);
                            let px = d.x * scale + cx;
                            let py = d.y * scale + cy;
                            let alpha = (d.z + radius) / (2 * radius);

                    sCtx.beginPath();
                            sCtx.arc(px, py, 2 * scale, 0, Math.PI * 2);
                            sCtx.fillStyle = `rgba(255, 187, 71, ${Math.max(0.2, alpha)})`;
                            sCtx.fill();
            }
                requestAnimationFrame(renderSphere);
    }
        renderSphere();
}

// --- Tema Değiştirme (Dark/Light Mode Transition) ---
const themeBtn = document.getElementById('themeToggleBtn');
if (themeBtn) {
        themeBtn.addEventListener('click', () => {
                    document.body.classList.toggle('light-mode');
                    const icon = themeBtn.querySelector('i');
                    if (icon) {
                                    icon.classList.toggle('fa-sun');
                                    icon.classList.toggle('fa-moon');
                    }
        });
}
