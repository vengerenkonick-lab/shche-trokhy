(function(root){
'use strict';
const episodes=[
 {id:'tea',person:0,title:'Чай з Олею',height:380,lines:[
  [['guest','Принесла чай. Ти сьогодні взагалі сідав?'],['worker','Сідав. Коли розетку ставив.'],['guest','То тепер сядь просто так. Хоч на хвилинку.'],['worker','Домовились. Чай — і назад до шпалер.']],
  [['guest','Чай ще гарячий. А вечеря вже чекає.'],['worker','Зараз закінчу цю смугу й прийду.'],['guest','Одну смугу. Я запам’ятала.'],['worker','Одну. Цього разу точно.']],
  [['guest','Знаєш, уже схоже на кімнату.'],['worker','А вчора було схоже на склад шпалер.'],['guest','Дороби — і тут нарешті відпочинемо.'],['worker','Заради цього й стараюсь.']]
 ]},
 {id:'plan',person:1,title:'Артем · план кімнати',height:290,lines:[
  [['guest','Тату, я намалював, де буде полиця для LEGO.'],['worker','Оце креслення! А стіл ти залишив?'],['guest','Залишив. Але полиця має бути більша.'],['worker','Бачу, в нас з’явився головний архітектор.']],
  [['guest','Я можу допомогти? Хоч щось потримати.'],['worker','Потримай свій план. Я звірюся з ним.'],['guest','Тоді ось тут має бути місце для книжок.'],['worker','Прийнято. Внесемо в проєкт.']],
  [['guest','А коли можна буде запросити друзів?'],['worker','Коли закінчимо й приберемо весь пил.'],['guest','Я тоді поки придумаю, що їм покажу.'],['worker','Почни з нашої легендарної полиці.']]
 ]},
 {id:'car',person:2,title:'Міша · загублена машинка',height:230,lines:[
  [['guest','Тату, дивись! Знайшов червону машинку!'],['worker','І де ж вона ховалась?'],['guest','Біля дверей. Там у неї гараж.'],['worker','Новий гараж відкриємо вже без пилу.']],
  [['guest','А в новій кімнаті можна зробити дорогу?'],['worker','Можна. Тільки не через мої капці.'],['guest','Добре. Через капці буде міст.'],['worker','Оце я необережно погодився.']],
  [['guest','Машинка каже, що ти довго ремонтуєш.'],['worker','Передай їй: майстер уже на фінішній прямій.'],['guest','Вона питає, чи можна обігнати.'],['worker','Тільки біля дверей. Тут поки піт-стоп.']]
 ]},
 {id:'bear',person:3,title:'Лев · ведмедик',height:165,lines:[
  [['guest','Тату! Мисько!'],['worker','І ти прийшов. І ведмедик теж?'],['guest','Дім! Миську дім!'],['worker','Зробимо вам обом затишний дім.']],
  [['guest','Тату, тук-тук!'],['worker','Тук-тук. Хто до мене завітав?'],['guest','Я! І Мисько!'],['worker','Найменша бригада вже на місці.']],
  [['guest','Тату! Па-па!'],['worker','Вже йдеш? А обійми передаси?'],['guest','На!'],['worker','Спіймав. Тепер точно дороблю.']]
 ]}
];
const ENTER=4.5,EXIT=4,LINE=3.7;
function createDirector(){let active=null,next=0,rounds=[0,0,0,0],remaining=14,lastLine=-1;
 return {
  get active(){return active},get remaining(){return remaining},get next(){return next},
  start(index=next){if(active)return false;const ep=episodes[index];if(!ep)return false;active={episode:ep,lines:ep.lines[rounds[index]++%ep.lines.length],time:0,index,phase:'enter',progress:0,line:null};next=(index+1)%episodes.length;lastLine=-1;return true},
  reset(){active=null;next=0;rounds=[0,0,0,0];remaining=14;lastLine=-1},
  advance(dt){if(!Number.isFinite(dt)||dt<=0)return null;dt=Math.min(dt,.1);if(!active){remaining-=dt;if(remaining<=0)this.start();return null}const a=active;a.time+=dt;const talkEnd=ENTER+a.lines.length*LINE;
   if(a.time<ENTER){a.phase='enter';a.progress=a.time/ENTER;a.line=null;return null}
   if(a.time<talkEnd){a.phase='talk';a.progress=1;const i=Math.floor((a.time-ENTER)/LINE);a.line=a.lines[i];if(i!==lastLine){lastLine=i;return {speaker:a.line[0],text:a.line[1],episode:a.episode.id}}return null}
   a.phase='exit';a.line=null;a.progress=Math.max(0,1-(a.time-talkEnd)/EXIT);if(a.time>=talkEnd+EXIT){active=null;remaining=36+next*3;return {ended:true}}return null;
  }
 };
}
const api={episodes,createDirector,timing:{ENTER,EXIT,LINE}};if(typeof module==='object'&&module.exports)module.exports=api;else root.RepairStory=api;
})(typeof globalThis==='object'?globalThis:this);
