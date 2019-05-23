function Parent(value) {
  this.val = value;
}
Parent.prototype.getVal = function() {
  console.log(this.val);
};
function Child(value) {
  Parent.call(this, value);
}
Child.prototype = new Parent();
const child = new Child(1);
child.getVal();
console.log(child.__proto__);

function Child2(value) {
  Parent.call(this, value);
}
Child2.prototype = Object.create(Parent.prototype, {
  constructor: {
    value: Child2,
    enumerable: false,
    writable: true,
    configurable: true
  }
});
const child2 = new Child2(2);
child.getVal();

function mySetInterval(callback, interval) {
  let timer;
  const now = Date.now;
  let startTime = now();
  let endTime = startTime;
  const loop = () => {
    timer = window.requestAnimationFrame(loop);
    endTime = now();
    if (endTime - startTime >= interval) {
      startTime = endTime = now();
      callback(timer);
    }
  };
  timer = window.requestAnimationFrame(loop);
  return timer;
}

Function.prototype.myCall = function(context) {
  if (typeof this !== "function") {
    throw TypeError("error");
  }
  context = context || window;
  context.fn = this;
  const args = [...arguments].slice(1);
  const result = context.fn(...args);
  delete context.fn;
  return result;
};
Function.prototype.myApply = function(context){
  if (typeof this !== "function") {
    throw TypeError("error");
  }
  context =context || window;
  context.fn = this;
  let result;
  if(arguments[1]){
    result = context.fn(...arguments[1])
  }else{
    result = context.fn();
  }
  delete context.fn;
  return result;
}
Function.prototype.myBind = function(context){
  if(typeof this !== context){
    throw TypeError("error");
  }
  const _this = this;
  const args = [...arguments].slice(1);
  return function F(){
    if(this instanceof F){
      return new _this(...args,...arguments);
    }
    return _this.apply(context,args.concat(...arguments));
  }
}

function create(){
  let obj = {};
  let Con = [].shift.call(arguments);
  obj.__proto__ = Con.prototype;
  let result = Con.apply(obj,arguments);
  return result instanceof Object ? result : obj
}

const debounce = (func,wait=1000)=>{
  let timer = 0;
  return function(...args){
    if(timer) clearTimeout(timer);
    timer = setTimeout(() => {
        func.apply(this,args)
    }, wait);
  }
}
const throttle = (func,wait=1000)=>{
  let lastTime = 0;
  return function(...args){
    let now= +new Date();
    if(now - lastTime > wait){
      lastTime =now;
      func.apply(this,args)
    }
  }
}

function checkArray(array){
  return Array.isArray(array)
}
function swap(array,left,rigth){
  let rightVal = array[rigth];
  array[rigth] = array[left];
  array[left] =  rightVal;
}

function bubble(array){
  if(!checkArray(array))return;
  for(let i = array.length-1;i>0;i--){
    for(let k = 0;k<i;k++){
      if(array[k]>array[k+1]){
        swap(array,k,k+1)
      }
    }
  }
  return array;
}
function selection(array){
  if(!checkArray(array))return;
  for(let i =0;i<array.length-1;i++){
    let minIndex = i;
    for(let j = i+1;j<array.length;j++){
      minIndex = array[j]<array[minIndex]?j:minIndex;
    }
    swap(array,i,minIndex)
  }
}