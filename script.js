const music=document.getElementById('music');
const musicBtn=document.getElementById('musicBtn');
let musicPlaying=false;

function setMusicUI(playing){
  musicPlaying=playing;
  musicBtn.textContent=playing?'❚❚':'♪';
  musicBtn.classList.toggle('playing',playing);
}

function startExperience(){
  music.src='music.mp3';
  music.volume=.42;
  music.play().then(()=>setMusicUI(true)).catch(()=>{});
  document.querySelector('.birthday').scrollIntoView({behavior:'smooth'});
  startParticles();
}

musicBtn.addEventListener('click',()=>{
  if(music.paused){
    if(!music.src) music.src='music.mp3';
    music.volume=.42;
    music.play().then(()=>setMusicUI(true)).catch(()=>{});
  }else{
    music.pause();
    setMusicUI(false);
  }
});

function createParticle(symbol='♡'){
  const p=document.createElement('div');
  p.className='particle';
  p.textContent=symbol;
  p.style.left=Math.random()*100+'%';
  p.style.fontSize=(12+Math.random()*18)+'px';
  p.style.animationDuration=(5+Math.random()*5)+'s';
  document.querySelector('.particles').appendChild(p);
  setTimeout(()=>p.remove(),11000);
}

function startParticles(){
  if(window.particlesStarted)return;
  window.particlesStarted=true;
  setInterval(()=>createParticle(Math.random()>.45?'♡':'♥'),1200);
}

function openLetter(){
  document.getElementById('letterModal').classList.add('show');
  document.querySelector('.envelope').classList.add('opened');
}
function closeLetter(){document.getElementById('letterModal').classList.remove('show')}
function showQuestion(){
  document.getElementById('question').classList.add('show');
  setTimeout(()=>document.getElementById('question').scrollIntoView({behavior:'smooth',block:'center'}),150);
}
function thinkAnswer(){document.getElementById('thinkMessage').style.display='block'}
function yesAnswer(){
  document.getElementById('proposal').style.display='none';
  const f=document.getElementById('final');
  f.classList.add('show');
  f.scrollIntoView({behavior:'smooth'});
  for(let i=0;i<55;i++)setTimeout(()=>createParticle('♥'),i*80);
}

const obs=new IntersectionObserver(entries=>entries.forEach(e=>{
  if(e.isIntersecting){
    e.target.classList.add('active');
    e.target.classList.add('revealed');
  }
}),{threshold:.12});

document.querySelectorAll('.reveal,.reveal-image').forEach(el=>obs.observe(el));

for(let i=0;i<100;i++){
  const s=document.createElement('i');
  s.className='star';
  s.style.left=Math.random()*100+'%';
  s.style.top=Math.random()*100+'%';
  s.style.animationDelay=Math.random()*4+'s';
  s.style.animationDuration=(2+Math.random()*4)+'s';
  document.querySelector('.stars').appendChild(s);
}

document.getElementById('letterModal').addEventListener('click',e=>{if(e.target.id==='letterModal')closeLetter()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLetter()});
