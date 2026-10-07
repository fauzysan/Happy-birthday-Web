'use strict';
document.documentElement.classList.add('js');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const starCanvas = document.querySelector('#stars');
const starContext = starCanvas.getContext('2d');
const confettiCanvas = document.querySelector('#confetti');
const ctx = confettiCanvas.getContext('2d');
let width, height, stars = [], particles = [], animationId;
function resize() {
  width = window.innerWidth; height = window.innerHeight;
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  for (const canvas of [starCanvas, confettiCanvas]) {
    canvas.width = width * ratio; canvas.height = height * ratio;
    canvas.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0);
  }
  stars = Array.from({length: Math.min(90, Math.floor(width / 12))}, () => ({x:Math.random()*width,y:Math.random()*height,r:Math.random()*.9+.3,phase:Math.random()*6}));
  drawStars(0);
}
function drawStars(time) {
  starContext.clearRect(0, 0, width, height);
  for (const star of stars) {
    starContext.fillStyle = `rgba(244,223,218,${.22+(Math.sin(time*.0006+star.phase)+1)*.23})`;
    starContext.beginPath(); starContext.arc(star.x, star.y, star.r, 0, Math.PI*2); starContext.fill();
  }
}
let lastFrame = 0;
function animate(time) {
  const delta = Math.min((time-lastFrame)/16.67 || 1, 2); lastFrame = time;
  drawStars(time); ctx.clearRect(0, 0, width, height);
  particles = particles.filter(p => p.y < height + 25 && p.life > 0);
  for (const p of particles) {
    p.x += p.vx*delta; p.y += p.vy*delta; p.vy += .035*delta; p.rotation += p.spin*delta; p.life -= delta;
    ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rotation); ctx.globalAlpha=Math.min(1,p.life/35); ctx.fillStyle=p.color;
    ctx.fillRect(-p.size/2,-p.size/2,p.size,p.size*.5); ctx.restore();
  }
  if (!document.hidden && (!reducedMotion.matches || particles.length)) animationId = requestAnimationFrame(animate);
}
function startAnimation(){cancelAnimationFrame(animationId);lastFrame=0;if(!reducedMotion.matches)animationId=requestAnimationFrame(animate);else drawStars(0);}
function celebrate() {
  if (!reducedMotion.matches) {
    const colors = ['#ebbbc2','#e8c981','#f6eee2','#a9abc9','#c38b9e'];
    particles = Array.from({length:160},()=>({x:width/2,y:height*.43,vx:(Math.random()-.5)*13,vy:-Math.random()*10-2,rotation:Math.random()*6,spin:(Math.random()-.5)*.15,size:Math.random()*7+4,life:200,color:colors[Math.floor(Math.random()*colors.length)]}));
  }
  document.querySelector('#celebration-status').textContent = 'Selamat ulang tahun ke-20, Nadya! Semoga semua doa baik menyertaimu. ♡';
}
resize(); startAnimation(); window.addEventListener('resize',resize);
reducedMotion.addEventListener('change',()=>{particles=[];ctx.clearRect(0,0,width,height);startAnimation();});
document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(animationId);if(audioContext?.state==='running')audioContext.suspend();}else{startAnimation();if(playing)audioContext?.resume();}});
const observer = new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const dialog=document.querySelector('#letter-dialog');
document.querySelector('#open-letter').addEventListener('click',()=>{dialog.showModal();document.body.style.overflow='hidden';});
dialog.querySelector('.close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});
dialog.addEventListener('close',()=>{document.body.style.overflow='';});
let candleLit=true;
document.querySelector('#blow').addEventListener('click',()=>{
  candleLit=!candleLit;
  document.querySelector('.cake-scene').classList.toggle('extinguished',!candleLit);
  document.querySelector('.cake-scene').setAttribute('aria-label',`Kue ulang tahun pink dengan satu lilin ${candleLit?'menyala':'padam'}`);
  document.querySelector('#blow').innerHTML=candleLit?'Padamkan lilin <span>✧</span>':'Nyalakan lagi <span>↺</span>';
  document.querySelector('#wish-status').textContent=candleLit?'Satu lilin. Sejuta kemungkinan baik.':'Aamiin. Semoga harapan baikmu menemukan jalannya. ♡';
  if(!candleLit)celebrate();
});
document.querySelector('#celebrate').addEventListener('click',celebrate);
// Original, gently generated music; no media download or autoplay.
let audioContext, playing=false, musicTimer, masterGain;
const melody=[261.63,329.63,392,523.25,440,392,329.63,293.66,261.63,349.23,440,523.25,493.88,392,349.23,293.66];
function scheduleMelody(){
  if (document.hidden || !audioContext) return;
  const start=audioContext.currentTime+.08;
  melody.forEach((frequency,index)=>{
    const oscillator=audioContext.createOscillator(), gain=audioContext.createGain();
    oscillator.type='sine';oscillator.frequency.value=frequency;
    const at=start+index*.6;
    gain.gain.setValueAtTime(0,at);gain.gain.linearRampToValueAtTime(.18,at+.025);gain.gain.exponentialRampToValueAtTime(.001,at+1.9);
    oscillator.connect(gain);gain.connect(masterGain);oscillator.start(at);oscillator.stop(at+2);
  });
}
const soundButton=document.querySelector('#sound');
soundButton.addEventListener('click',async()=>{
  try{
    if(!audioContext){audioContext=new(window.AudioContext||window.webkitAudioContext)();masterGain=audioContext.createGain();masterGain.gain.value=.35;masterGain.connect(audioContext.destination);}
    if(!playing){await audioContext.resume();masterGain.gain.setValueAtTime(.35,audioContext.currentTime);scheduleMelody();musicTimer=setInterval(scheduleMelody,9600);playing=true;}
    else{clearInterval(musicTimer);await audioContext.close();audioContext=null;playing=false;}
    soundButton.setAttribute('aria-pressed',String(playing));soundButton.setAttribute('aria-label',playing?'Matikan musik':'Putar musik lembut');soundButton.querySelector('span').textContent=playing?'Musik on':'Musik off';
  }catch{soundButton.querySelector('span').textContent='Musik tidak tersedia';soundButton.setAttribute('aria-label','Musik tidak tersedia di browser ini');}
});
