'use strict';
(()=>{
 const audio=document.querySelector('#sceneAudio'),button=document.querySelector('#sound');
 let wanted=true,started=false,busy=false;
 try{wanted=localStorage.getItem('repair-sound')!=='off'}catch{}
 audio.volume=.35;
 function ui(){const on=!audio.paused&&!audio.muted;button.classList.toggle('is-playing',on);button.setAttribute('aria-pressed',String(on));button.setAttribute('aria-label',on?'Вимкнути звук':'Увімкнути звук');button.title=on?'Вимкнути звук':'Увімкнути звук'}
 function save(){try{localStorage.setItem('repair-sound',wanted?'on':'off')}catch{}}
 async function play(){if(busy||!wanted||document.hidden)return;busy=true;try{await audio.play();started=true}catch{}finally{busy=false;ui()}}
 button.addEventListener('click',()=>{if(!audio.paused){wanted=false;audio.pause();save();ui()}else{wanted=true;save();play()}});
 function gesture(e){if(e.target.closest?.('#sound')||!wanted||!audio.paused)return;if(e.type==='keydown'&&(e.ctrlKey||e.metaKey||e.altKey))return;play()}
 document.addEventListener('pointerdown',gesture);document.addEventListener('keydown',gesture);
 document.addEventListener('visibilitychange',()=>{if(document.hidden){audio.pause();ui()}else if(started&&wanted)play()});
 audio.addEventListener('play',ui);audio.addEventListener('pause',ui);audio.addEventListener('error',ui);ui();
})();
