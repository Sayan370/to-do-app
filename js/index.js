

const addToDo=()=>{

  var txttodo=document.getElementById('txttodo').value;

  document.getElementById('txttodo').value='';


 

var retrievedObject = localStorage.getItem('testObject');

var obj = {};

obj['name'] = txttodo;
obj['status'] = "0";




if(retrievedObject!=null){
  

   retrievedObject=JSON.parse(retrievedObject);
   retrievedObject.push(obj);


}else{
retrievedObject=[
  obj
];
}

localStorage.setItem('testObject', JSON.stringify(retrievedObject));


render();


}

const render=()=>{

  var arr = localStorage.getItem('testObject');

  arr=JSON.parse(arr);

  const myEle = document.getElementById("divRender");
  myEle.innerHTML = '';

  let divContent='';
  document.getElementById("txtTaskCount").innerHTML=arr.length;
  
  if(arr.length>0){
  arr.reverse().map(function(val, index){
    divContent=divContent+`<div class="card-body ${val.status=='1' ? `bg-light text-dark` : ``}"><div class="row"><div class="col-md-1"><input type="checkbox" class="checkboxes form-control" onclick="checkTask(this)" ${val.status=='1' ? `checked` : ``} value="${index}" id="txtCheck${index}"></div><div class="col-md-8">  <span id="txtTaskname${index}">${val.name}</span></div><div class="col-md-3 "><button class="btn btn-danger float-right" onClick="deleteItem(${index})"><i class="fa fa-trash"></i></button><button class="btn btn-success float-right" id="btnx${index}" onClick="editData(${index})"><i class="fa fa-edit"></i></button></div></div></div>`;
          
        });

      }else{

        divContent=`<div class="card-body"><div class="row"><div class="col-md-12"><h4 class="text-center">No Task Found</h4></div></div></div>`;
    
      }

      
        myEle.innerHTML=divContent;
  
}

const checkTask=(el)=>{

  var arr = localStorage.getItem('testObject');
  var elIndex=el.value;

arr=JSON.parse(arr);


const updatedItems = arr.reverse().map(function(val, index){ 

  if(index==elIndex){

    
   
    val.status=(val.status==1 ? 0 : 1);
    



  }
  return val;
  
});



localStorage.setItem('testObject', JSON.stringify(updatedItems.reverse()));
render();
}

const deleteItem=(elIndex)=>{

  

  var arr = localStorage.getItem('testObject');
 

arr=JSON.parse(arr);



console.log(elIndex);

updatedItems=arr.reverse().splice(elIndex,1);



localStorage.setItem('testObject', JSON.stringify(arr.reverse()));
render();
}

const editData=(elIndex)=>{

  const myData = document.getElementById(`txtTaskname${elIndex}`).innerText;
  document.getElementById(`txtTaskname${elIndex}`).innerHTML='';
  document.getElementById(`txtTaskname${elIndex}`).innerHTML=`<input type="text" class="form-control" placeholder="Enter Todo Task" id="txtEditInp${elIndex}" value="${myData}">`
document.getElementById(`btnx${elIndex}`).innerHTML='Update';

document.getElementById(`btnx${elIndex}`).setAttribute("onclick", `updateValue(${elIndex})`);
}

render();

