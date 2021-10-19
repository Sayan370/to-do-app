//render items 
const render=()=>{

  var arr = localStorage.getItem('taskObject');

  arr=JSON.parse(arr);

  const myEle = document.getElementById("divRender");
  myEle.innerHTML = '';

  let divContent='';

  if(arr==null){

    arr=0;

    document.getElementById("txtTaskCount").innerHTML=0;
  }else{

    document.getElementById("txtTaskCount").innerHTML=arr.length;
  }
 
  
  if(arr.length>0){
  arr.reverse().map(function(val, index){
    divContent=divContent+`<div class="card-body item-shadow ${val.status=='1' ? `bg-light text-dark` : ``}"><div class="row"><div class="col-md-1 col-1"><input type="checkbox" class="checkboxes form-control" onclick="checkTask(this)" ${val.status=='1' ? `checked` : ``} value="${index}" id="txtCheck${index}"></div><div class="col-md-8 col-10">  <span class="font-bold ${val.status=='1' ? `checkboxTxts` : ``}" id="txtTaskname${index}">${val.name}</span></div><div class="col-md-3"><button class="btn btn-danger float-right" onClick="deleteItem(${index})"><i class="fa fa-trash"></i></button><button class="btn btn-success float-right" id="btnx${index}" onClick="editData(${index})"><i class="fa fa-edit"></i></button></div></div></div>`;
          
        });

      }else{

        console.log(1);

        divContent=`<div class="card-body"><div class="row"><div class="col-md-12"><h4 class="text-center">No Task Found</h4></div></div></div>`;
    
      }

      
        myEle.innerHTML=divContent;
  
}


//add list items
const addToDo=()=>{

  var txttodo=document.getElementById('txttodo').value;

  if(txttodo!=null && txttodo!=''){

  document.getElementById('txttodo').value='';


 

var retrievedObject = localStorage.getItem('taskObject');

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

localStorage.setItem('taskObject', JSON.stringify(retrievedObject));


render();

return true;

}else{

  alert("Please Enter A Value To Continue");
  return false;
}

}

//check box task

const checkTask=(el)=>{

  var arr = localStorage.getItem('taskObject');
  var elIndex=el.value;

arr=JSON.parse(arr);


const updatedItems = arr.reverse().map(function(val, index){ 

  if(index==elIndex){

    
   
    val.status=(val.status==1 ? 0 : 1);
    



  }
  return val;
  
});



localStorage.setItem('taskObject', JSON.stringify(updatedItems.reverse()));
render();
}

//delete items

const deleteItem=(elIndex)=>{

  

  var arr = localStorage.getItem('taskObject');
 

arr=JSON.parse(arr);



console.log(elIndex);

updatedItems=arr.reverse().splice(elIndex,1);



localStorage.setItem('taskObject', JSON.stringify(arr.reverse()));
render();
}


//edit items

const editData=(elIndex)=>{

  const myData = document.getElementById(`txtTaskname${elIndex}`).innerText;
  document.getElementById(`txtTaskname${elIndex}`).innerHTML='';
  document.getElementById(`txtTaskname${elIndex}`).innerHTML=`<form onSubmit="return updateValue(${elIndex});"><input type="text" class="form-control w-100" placeholder="Enter Todo Task" required id="txtEditInp${elIndex}" value="${myData}"></form>`
document.getElementById(`btnx${elIndex}`).innerHTML='Update';

document.getElementById(`btnx${elIndex}`).setAttribute("onclick", `updateValue(${elIndex})`);
document.getElementById("txtTaskname"+elIndex).classList.add("cancelstrikethrough");
}

//update value of current edited task
const updateValue=(elIndex)=>{

  

  var eleVal=document.getElementById("txtEditInp"+elIndex).value;

  if(eleVal!=null && eleVal!=''){
  var arr = localStorage.getItem('taskObject');
 

arr=JSON.parse(arr);



updatedItems=arr.reverse();

updatedItems[elIndex].name=eleVal;

localStorage.setItem('taskObject', JSON.stringify(updatedItems.reverse()));
document.getElementById("txtTaskname"+elIndex).classList.remove("cancelstrikethrough");

document.getElementById('txtTaskname'+elIndex).innerHTML=eleVal;
document.getElementById(`btnx${elIndex}`).innerHTML='<i class="fa fa-edit"></i>';

document.getElementById(`btnx${elIndex}`).setAttribute("onclick", `editData(${elIndex})`);

return true;
}else{

  alert("Please Enter A Value");
  return false;
}

}

//call render function

render();

