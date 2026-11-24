const list=document.getElementById('list');
const message=document.getElementById('message');
let tasks=[];
try{
  const saved=JSON.parse(localStorage.getItem('practice-tasks')||'[]');
  if(Array.isArray(saved))tasks=saved.filter(x=>typeof x==='string');
}catch{}

function save(){
  localStorage.setItem('practice-tasks',JSON.stringify(tasks));
}

function render(){
  list.replaceChildren();
  tasks.forEach((text,index)=>{
    const row=document.createElement('li');
    row.textContent=text;
    const button=document.createElement('button');
    button.type='button';
    button.textContent='Delete';
    button.setAttribute('aria-label','Delete task: '+text);
    button.onclick=()=>{
      tasks.splice(index,1);
      save();
      render();
      message.textContent='Task deleted.';
    };
    row.append(button);
    list.append(row);
  });
}

document.getElementById('form').onsubmit=e=>{
  e.preventDefault();
  const input=document.getElementById('text'),text=input.value.trim();
  if(!text){
    message.textContent='Enter a task before adding.';
    input.focus();
    return;
  }
  tasks.push(text);
  save();
  render();
  input.value='';
  input.focus();
  message.textContent='Task added.';
};

render();
