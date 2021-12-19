
let container = document.querySelector('#container');

let results = document.querySelector('#results');
let currentResult = document.querySelector('#current-result');
let totalResult = document.querySelector('#total-result');

let coordinates = { 
    coordX: [],
    coordY: [] 
    };
    
let points = []; 
let lines = [];

let lineCounter = 0; 
let totalDistance = 0;

let currentPath = "";
let totalPath = "";


container.addEventListener('click', (e) => {
 
 coordinates.coordX.push(e.x);
 coordinates.coordY.push(e.y);
 
 createPoints(e.x, e.y);
 
 let prevX = coordinates.coordX[coordinates.coordX.length - 2];
 
 let prevY = coordinates.coordY[coordinates.coordY.length - 2];
 
 
 if(coordinates.coordX.length > 1) {
 
   createLines(prevX, prevY, e.x, e.y);
   
 }
 
});



function createPoints(posX, posY) {

 
 for(let i=0; i<coordinates.coordX.length; i++) {
 
  points[i] = document.createElement('div');
  points[i].className = 'points';
  points[i].style.left = `${coordinates.coordX[i]}px`;
  points[i].style.top = `${coordinates.coordY[i]}px`;
  
  container.appendChild(points[i]);
    
 }
 
}

function createLines(x1, y1, x2, y2) {

let distance = Math.sqrt(((x2-x1) * (x2-x1)) + ((y2-y1) * (y2-y1)));

 let midX = (x1+x2)/2;
 let midY = (y1+y2)/2;
   
 let inclinationInRadian = Math.atan2(y1-y2, x1-x2);
 let inclinationInDegree = (inclinationInRadian * 180)/ Math.PI;
 

 for(let i=0; i<coordinates.coordX.length; i++) {
 
 lines[i] = document.createElement('div');
 lines[i].className = 'lines';
 
 lines[i].style.width = `${distance}px`;
 lines[i].style.left = `${(midX - (distance/2))}px`;
 lines[i].style.top = `${midY}px`;
 lines[i].style.transform = 'rotate('+inclinationInDegree +'deg)';
 
 container.appendChild(lines[i]);
  
 }
 
  currentResult.innerHTML = `<strong>Current Result:-</strong> <br>`;
  
  totalResult.innerHTML = `<strong>Total Result:-</strong> <br>`;
    
  getDistance(distance);
  
}


function getDistance(distance) {
  
 let pixelToCm = distance * 0.0264583333;
 pixelToCm = Number(pixelToCm.toFixed(2));
 
 totalDistance += pixelToCm;
 totalDistance = Number(totalDistance.toFixed(2));
 
 currentPath += `Line ${++lineCounter}:- ${pixelToCm}cm<br>`;
 
 totalPath += `${totalDistance}cm<br>`;
  
 currentResult.innerHTML += currentPath;
 
 totalResult.innerHTML += totalPath;
 
 results.scrollTop = results.scrollHeight;
 
}
