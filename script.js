let currentScene = 1;
let completedQuests = 0;
let revealedPhotos = 0;

function updateProgress() {
    document.getElementById('progress').style.width = (currentScene * 25) + '%';
}

function nextScene(n) {
    document.getElementById('scene' + currentScene).classList.remove('active');
    document.getElementById('scene' + n).classList.add('active');
    currentScene = n;
    updateProgress();
    createHeartConfetti();
}

function openEnvelope() {
    const envelope = document.querySelector('.envelope');
    envelope.style.transform = 'scale(0) rotate(360deg)';
    envelope.style.opacity = '0';
    
    setTimeout(() => {
        createHeartConfetti();
        nextScene(2);
    }, 500);
}

function revealMemory(element, text) {
    if (element.classList.contains('revealed')) return;
    
    element.classList.add('revealed');
    element.querySelector('.polaroid-text').textContent = text;
    element.style.background = '#ffd700';
    element.style.transform = 'rotate(0deg) scale(1.1)';
    
    revealedPhotos++;
    createHeartConfetti(element);
    
    if (revealedPhotos >= 3) {
        document.getElementById('btn2').style.display = 'block';
    }
}

function completeQuest(element, num) {
    if (element.classList.contains('quest-completed')) return;
    
    element.classList.add('quest-completed');
    completedQuests++;
    
    for(let i=0; i<5; i++) {
        setTimeout(() => createHeartConfetti(element), i*100);
    }
    
    if (completedQuests >= 2) {
        document.getElementById('btn3').style.display = 'block';
    }
}

function openTreasure() {
    const box = document.getElementById('treasure');
    box.classList.add('treasure-open');
    
    setTimeout(() => {
        document.getElementById('finalMsg').style.display = 'block';
        box.style.display = 'none';
        
        for(let i=0; i<10; i++) {
            setTimeout(() => {
                createHeartConfetti();
                createFloatingText();
            }, i*200);
        }
    }, 1000);
}

function createHeartConfetti(origin) {
    const container = document.createElement('div');
    container.className = 'heart-container';
    document.body.appendChild(container);
    
    const rect = origin ? origin.getBoundingClientRect() : {left: window.innerWidth/2, top: window.innerHeight/2};
    const centerX = rect.left + (rect.width || 0)/2;
    const centerY = rect.top + (rect.height || 0)/2;
    
    for(let i=0; i<8; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = ['💖','💝','💗','💓'][Math.floor(Math.random()*4)];
        heart.style.left = (centerX + Math.random()*100 - 50) + 'px';
        heart.style.top = (centerY + Math.random()*50 - 25) + 'px';
        heart.style.animationDelay = (Math.random()*0.5) + 's';
        container.appendChild(heart);
    }
    
    setTimeout(() => container.remove(), 3000);
}

function createFloatingText() {
    const texts = ['Jessica Habiby!','HBD!','🎂','BESTIE!','YAY!'];
    const el = document.createElement('div');
    el.textContent = texts[Math.floor(Math.random()*texts.length)];
    el.style.position = 'fixed';
    el.style.left = Math.random()*80 + 10 + '%';
    el.style.top = '50%';
    el.style.fontSize = '2em';
    el.style.fontWeight = 'bold';
    el.style.color = '#ffd700';
    el.style.textShadow = '0 0 20px rgba(255,215,0,0.8)';
    el.style.animation = 'flyUp 2s ease-out forwards';
    el.style.zIndex = '9999';
    el.style.pointerEvents = 'none';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2000);
}

// Easter egg: Click background for surprise
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('scene') || e.target === document.body) {
        createHeartConfetti();
    }
});

// Auto-start hint
setTimeout(() => {
    if (currentScene === 1) {
        document.querySelector('.click-hint').style.animation = 'bounce 0.5s 3';
    }
}, 3000);