
$(window).on('load', function(){ 

let postman = document.getElementById('postMan');
let donHave = document.getElementById('donSignUp');
let titInput = document.getElementById('title');
let contInput = document.getElementById('cont');
let saveEdit = document.getElementById('save')

donHave.addEventListener('click', ()=>{
    $('#exampleModalLong').modal('hide');
})



let postManage = [];
fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then(res => {
        postManage = res;
        let temp = '';
    for (let i = 1; i< postManage.length; i++) {

        temp += `<div class=" col-sm-8 m-auto">
                <div class="api p-3 mt-3"><h4>${postManage[i].title}</h4>
                <p>${postManage[i].body}</p>
                </div>
                <div class=" d-flex mt-2 justify-content-center align-items-end">
                <a  data_index="${i}" data_id="${postManage[i].id}" class="editbtn btn text-danger mr-3 btn-warning " >Edit</a>
                <a data_index="${i}" data_id="${postManage[i].id}"  class=" delbtn btn btn-danger text-warning data-toggle="modal" data-target="#exampleModalCenter" >Delete</a>
                </div>
                </div>`
                postman.innerHTML = temp;
    }   
    })
postman.addEventListener('click', editbtnsAndDell);


function editbtnsAndDell (e) {

    let postId;
    let postIndex;
            postId = e.target.getAttribute('data_id');
            postIndex = e.target.getAttribute('data_index');
            if (e.target.classList.contains('delbtn')) {
               
                let confirmDelete = document.getElementById('confirm');
                $('#exampleModalCenter').modal('show');

                confirmDelete.addEventListener('click', function (){

                    postManage.splice(postIndex,0);

                    $('#exampleModalCenter').modal('hide');

                      fetch('https://jsonplaceholder.typicode.com/posts/' + postId, {
                        method: 'DELETE',
                        })
                        .then(res => console.log(res))
                        .catch(error => console.log(error))   
                });
            }

             if (+e.target.classList.contains('editbtn')) {
                $('#staticBackdrop').modal('show');
               
                titInput.value = postManage[postIndex].title
                contInput.value = postManage[postIndex].body

            }
            
            saveEdit.addEventListener('click', ()=>{

                

                postId = e.target.getAttribute('data_id');
                postIndex = e.target.getAttribute('data_index');

                postManage[postIndex].title= titInput.value
                postManage[postIndex].body= contInput.value 
                
                

                fetch('https://jsonplaceholder.typicode.com/posts/' + postId, {
                    method: 'PUT',
                    })
                    .then(res => console.log(res+ "Sucess"))
                    .catch(error => console.log(error)) 

                $('#staticBackdrop').modal('hide');
                
            })
    

        }

        

      
    });
