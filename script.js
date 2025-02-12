document.getElementById("yes").addEventListener("click", function() {
    createHeartExplosion();
    showLoveMessage();
});

document.getElementById("no").addEventListener("mouseover", function() {
    let noButton = document.getElementById("no");
    let randomX = Math.random() * (window.innerWidth - noButton.offsetWidth);
    let randomY = Math.random() * (window.innerHeight - noButton.offsetHeight);
    noButton.style.position = "absolute";
    noButton.style.left = `${randomX}px`;
    noButton.style.top = `${randomY}px`;
});

document.addEventListener("DOMContentLoaded", function() {
    animateFloatingHearts();
});

function createHeartExplosion() {
    let button = document.getElementById("yes");
    let buttonRect = button.getBoundingClientRect();
    let buttonX = buttonRect.left + buttonRect.width / 2;
    let buttonY = buttonRect.top + buttonRect.height / 2;

    for (let i = 0; i < 20; i++) {
        let heart = document.createElement("div");
        heart.className = "explosion-heart";
        heart.innerHTML = "❤️";
        document.body.appendChild(heart);
        
        let angle = Math.random() * 2 * Math.PI;
        let distance = Math.random() * 100 + 30;
        let targetX = buttonX + Math.cos(angle) * distance;
        let targetY = buttonY + Math.sin(angle) * distance;
        
        heart.style.position = "absolute";
        heart.style.left = `${buttonX}px`;
        heart.style.top = `${buttonY}px`;

        heart.animate([
            { transform: `translate(0, 0) scale(1)`, opacity: 1 },
            { transform: `translate(${targetX - buttonX}px, ${targetY - buttonY}px) scale(0)`, opacity: 0 }
        ], {
            duration: 1500,
            easing: "ease-out",
            fill: "forwards"
        });

        setTimeout(() => { heart.remove(); }, 1500);
    }
}

function showLoveMessage() {
    let loveMessage = document.getElementById("love-message");
    loveMessage.style.display = "block";
}

function animateFloatingHearts() {
    const canvas = document.getElementById("heartCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let hearts = [];
    for (let i = 0; i < 50; i++) {
        hearts.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 5 + 2,
            speed: Math.random() * 1 + 0.5
        });
    }

    function drawHearts() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(255, 0, 0, 0.7)";
        hearts.forEach(heart => {
            ctx.beginPath();
            ctx.arc(heart.x, heart.y, heart.size, 0, Math.PI * 2);
            ctx.fill();
            heart.y -= heart.speed;
            if (heart.y < 0) heart.y = canvas.height;
        });
        requestAnimationFrame(drawHearts);
    }
    drawHearts();
}




