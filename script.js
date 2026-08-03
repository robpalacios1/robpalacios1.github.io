// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', ()=>{
  navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  navLinks.style.position='absolute';
  navLinks.style.top='64px';
  navLinks.style.left='0';
  navLinks.style.right='0';
  navLinks.style.background='rgba(6,10,18,0.97)';
  navLinks.style.flexDirection='column';
  navLinks.style.padding='24px';
  navLinks.style.gap='18px';
  navLinks.style.borderBottom='1px solid rgba(255,255,255,0.08)';
});
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  if(window.innerWidth<=920) navLinks.style.display='none';
}));

// Typed role rotation
const roles = ["DevOps Engineer", "Cloud Architect", "Kubernetes Specialist", "Terraform Automator", "CI/CD Engineer"];
const typedEl = document.getElementById('typedRole');
let ri=0, ci=0, deleting=false;
function typeLoop(){
  const current = roles[ri];
  if(!deleting){
    ci++;
    typedEl.textContent = current.slice(0,ci);
    if(ci===current.length){ deleting=true; setTimeout(typeLoop, 1400); return; }
  } else {
    ci--;
    typedEl.textContent = current.slice(0,ci);
    if(ci===0){ deleting=false; ri=(ri+1)%roles.length; }
  }
  setTimeout(typeLoop, deleting?40:70);
}
setTimeout(typeLoop, 600);

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('show'); io.unobserve(e.target); } });
}, {threshold:0.12});
revealEls.forEach(el=>io.observe(el));

// Header background on scroll
const header = document.querySelector('header');
window.addEventListener('scroll', ()=>{
  header.style.background = window.scrollY>10 ? 'rgba(6,10,18,0.9)' : 'rgba(6,10,18,0.65)';
});

// Particle background
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
function resize(){ canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.addEventListener('resize', resize);
resize();
const colors = ['rgba(0,229,255,', 'rgba(124,92,255,', 'rgba(255,92,173,'];
function initParticles(){
  particles = [];
  const count = Math.min(60, Math.floor(window.innerWidth/22));
  for(let i=0;i<count;i++){
    particles.push({
      x:Math.random()*canvas.width,
      y:Math.random()*canvas.height,
      r:Math.random()*1.8+0.6,
      vx:(Math.random()-0.5)*0.25,
      vy:(Math.random()-0.5)*0.25,
      c:colors[Math.floor(Math.random()*colors.length)],
      a:Math.random()*0.5+0.15
    });
  }
}
initParticles();
window.addEventListener('resize', initParticles);
function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    p.x+=p.vx; p.y+=p.vy;
    if(p.x<0) p.x=canvas.width; if(p.x>canvas.width) p.x=0;
    if(p.y<0) p.y=canvas.height; if(p.y>canvas.height) p.y=0;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle = p.c+p.a+')';
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();
