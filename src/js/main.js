document.documentElement.classList.add('js');
(function(){
  // mobile menu
  var m=document.getElementById('mnav'),b=document.getElementById('burger'),c=document.getElementById('mclose');
  function set(o){m.classList.toggle('open',o);b.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':''}
  b.addEventListener('click',function(){set(true)});c.addEventListener('click',function(){set(false)});
  m.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){set(false)})});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')set(false)});
  // dropdown click (touch / keyboard)
  document.querySelectorAll('.dd>button').forEach(function(btn){btn.addEventListener('click',function(){var d=btn.parentNode,o=!d.classList.contains('open');d.classList.toggle('open',o);btn.setAttribute('aria-expanded',o)})});
  document.addEventListener('click',function(e){document.querySelectorAll('.dd.open').forEach(function(d){if(!d.contains(e.target)){d.classList.remove('open');d.firstElementChild.setAttribute('aria-expanded',false)}})});
  document.querySelectorAll('.dd-menu a').forEach(function(a){a.addEventListener('click',function(){a.closest('.dd').classList.remove('open')})});
  // reveal (only below-the-fold elements, never hides first frame)
  if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.remove('pre');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});
    document.querySelectorAll('.rv').forEach(function(el){if(el.getBoundingClientRect().top>innerHeight){el.classList.add('pre');io.observe(el)}});
  }
  // copy
  document.querySelectorAll('.copy').forEach(function(btn){btn.addEventListener('click',function(){
    var t=btn.dataset.copy,done=function(){btn.textContent='Skopiowano';setTimeout(function(){btn.textContent='Kopiuj'},1600)};
    try{navigator.clipboard.writeText(t).then(done,function(){sel(btn)})}catch(e){sel(btn)}
  })});
  function sel(btn){var dd=btn.previousElementSibling,r=document.createRange();r.selectNodeContents(dd);var s=getSelection();s.removeAllRanges();s.addRange(r)}
  // VHS tracking-noise tile
  var cv=document.getElementById('vhs');if(!cv)return;var x=cv.getContext('2d'),W=cv.width,H=cv.height,t=0,still=matchMedia('(prefers-reduced-motion: reduce)').matches;
  function draw(){
    t++;var g=x.createLinearGradient(0,0,W,H);g.addColorStop(0,'#1d1b22');g.addColorStop(1,'#121114');x.fillStyle=g;x.fillRect(0,0,W,H);
    for(var i=0;i<120;i++){x.fillStyle='rgba(255,255,255,'+(Math.random()*.05)+')';x.fillRect(0,Math.random()*H,W,1+Math.random()*2)}
    var y=(t*2)%(H+60)-30;x.fillStyle='rgba(255,255,255,.07)';x.fillRect(0,y,W,22);
    x.fillStyle='#efebe4';x.font='500 30px "JetBrains Mono", monospace';x.fillText('PLAY ▶',34,58);
    x.font='500 22px "JetBrains Mono", monospace';x.fillStyle='#d2a75a';x.fillText('VHS → MP4',34,H-36);
    x.fillStyle='#efebe4';x.textAlign='right';var s=Math.floor(t/30);x.fillText('SP  0:'+String(Math.floor(s/60)%60).padStart(2,'0')+':'+String(s%60).padStart(2,'0'),W-34,58);x.textAlign='left';
    if(!still)requestAnimationFrame(draw);
  }
  if(document.fonts&&document.fonts.ready){document.fonts.ready.then(draw)}else draw();
})();
