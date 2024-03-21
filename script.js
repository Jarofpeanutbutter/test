// Vars
let randrush = 0;
let rush = 0;
let clicks = 0;
let cperclick = 1;
let clickers = 0;
let clickercost = 20;
let cperclickcost = 40;
let tentick = 0;
let minutes = 0;
let curupgrade = 1;
let workercost = 500;
let workers = 0;
// Upgrade Vars
let upg_x2clickers = false;
let upg_x2workers = false;
// Keypress
// Functions
function changeClicks(amt){
  clicks += amt;
  changeElementText('clickscounter', 'Clicks: ' + clicks)
}
function resetgame(){
  changeClicks(-clicks)
  randrush = 0;
  rush = 0;
  cperclick = 1;
  clickers = 0;
  clickercost = 20;
  cperclickcost = 40;
  tentick = 0;
  minutes = 0;
  curupgrade = 1;
  workercost = 500;
  workers = 0;
  upg_x2clickers = false;
  upg_x2workers = false;
  window.location.reload();
}
function changeElementText(id,text){
  document.getElementById(id).innerHTML = text
}
function click(amt) {
  changeClicks(amt)
  if(rush == 1){
    changeClicks(amt)
  }
};
function buy(item) {
  if(item == 'clicker'){
    if(clicks >= clickercost){
      changeClicks(-clickercost)
      clickers += 1;
      clickercost = Math.round(clickercost*1.5)
      changeElementText('clickerst','Autoclicker: ' + clickercost + ' Clicks')
    }
  } else if(item == 'cperclick'){
    if(clicks >= cperclickcost) {
      changeClicks(-cperclickcost)
      cperclick += 1;
      cperclickcost = Math.round(cperclickcost*1.5)
      changeElementText('cperclickst','+1 Clicks Per Click: ' + cperclickcost + ' Clicks')
    }
  } else if(item == 'crupgrade'){
    if(curupgrade == 1){
      if(clicks >= 400){
        changeClicks(-400)
        upg_x2clickers = true
        curupgrade = 0
        changeElementText('upgrade','No Upgrades Yet!')
      }
    } else if(curupgrade == 2){
      if(clicks >= 7500){
        changeClicks(-7500)
        upg_x2workers = true
        curupgrade = 0
        changeElementText('upgrade','No Upgrades Yet!')
      }
    }
  }
  if(item == 'worker'){
    if(clicks >= workercost){
      changeClicks(-workercost)
      workers += 1
      workercost = Math.round(workercost*1.5)
      changeElementText('workerst','Worker (makes 1 autoclicker per 10 seconds): '+workercost+' Clicks')
    }
  }
}

function save(){
  let num1 = clicks * 1432
  let reg1 = num1.toString() + '|';
  let num2 = clickers * 1289
  let reg2 = num2.toString() + '|';
  let num3 = cperclick * 1271
  let reg3 = num3.toString();
  let savecode = reg1 + reg2 + reg3;
  changeElementText('savecode',savecode);
}

function load(){
  let code = document.getElementById('inputload').value;
  console.log(code)
  let tablecode = code.split('|');
  let c1 = tablecode[0];
  let c2 = tablecode[1];
  let c3 = tablecode[2];
  clicks = Math.round(parseInt(c1) / 1432);
  clickers = Math.round(parseInt(c2) / 1289);
  cperclick = Math.round(parseInt(c3) / 1271);
}

function ticker() {
  if(tentick == 10){
    tentick = 0;
    clickers += workers
    if(upg_x2workers == true){
      clickers += workers
    }
    if(minutes == 6){
      if(rush == 0){
        randrush = Math.random(1,5)
      } else {
        rush = 0;
        changeElementText('isrush','x2 Rush: None')
      }
      if(randrush == 5){
        rush = 1;
        changeElementText('isrush','x2 Rush: Active')
      }
      minutes = 0;
    } else {
      minutes += 1;
    }
  } else {
    tentick += 1;
  }
  click(clickers)
  if(upg_x2clickers == true){
    click(clickers)
  }
}
function mticker(){
  if(workers >= 1 && curupgrade == 0 && upg_x2workers == false){
    curupgrade = 2
    changeElementText('upgrade','x2 Worker Productivity: 7500 Clicks')
  }
  changeElementText('clickers','Autoclickers: '+clickers)
  changeElementText('cperclick','Clicks Per Click: '+cperclick)
  changeElementText('workers','Workers: '+workers)
}
// Code
setInterval("ticker()", 1000)
setInterval("mticker()",1)
