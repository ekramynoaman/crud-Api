
$(window).on('load', function(){ 

let postman = document.getElementById('postMan');
let donHave = document.getElementById('donSignUp');
let titInput = document.getElementById('title');
let contInput = document.getElementById('cont');
let saveEdit = document.getElementById('save');


// variables for sign up
let userName = document.getElementById('userName');
let userEmail = document.getElementById('userEmail');
let userPass = document.getElementById('userPass');
let userPhone = document.getElementById('userPhone');
let userImg = document.getElementById('userImg');
let userAge = document.getElementById('userAge');
let userCountry = document.getElementById('userCountry');
let signUpForm = document.getElementById('signUpForm');



donHave.addEventListener('click', ()=>{
    $('#exampleModalLong').modal('hide');
})

// variable to store sign up object
let signUpData = {};

signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    signUpData.name = userName.value;
    signUpData.email = userEmail.value;
    signUpData.password = userPass.value;
    signUpData.img = userImg.value;
    signUpData.phone = userPhone.value;
    signUpData.country = userCountry.value;
    signUpData.Age = userAge.value;

    console.log(signUpData);
    

    fetch('http://localhost:3000/xlarge/user/signup', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(signUpData),
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
});
    
    
})


// sign up requst function











// Array for store return data
let postManage =[];
console.log(postManage);

fetch('http://localhost:3000/xlarge/post/list',{ method: 'GET',
})
    .then((response) => response.json())
    .then(res => {

        postManage = res;

        displayPosts()})
postman.addEventListener('click', editbtnsAndDell);


function editbtnsAndDell (e) {
    

    let postId;
    let postIndex;
    console.log(postManage);

            postId = e.target.getAttribute('data_id');
            postIndex = e.target.getAttribute('data_index');
            if (e.target.classList.contains('delbtn')) {
               
                let confirmDelete = document.getElementById('confirm');
                $('#exampleModalCenter').modal('show');

                confirmDelete.addEventListener('click', function (){
console.log(postId);
console.log(postIndex);


                    postManage.splice(postIndex,1);
                    console.log(postManage);

                    $('#exampleModalCenter').modal('hide');

                      fetch('https://jsonplaceholder.typicode.com/posts/' + postId, {
                        method: 'DELETE',
                        })
                        .then(res => {
                            postManage = res;
                            displayPosts();
                        })
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

// display posts function
function displayPosts() {
    let temp = '';
    for (let i = 1; i< postManage.length; i++) {

        temp += `

        <div class="media col-sm-8 m-auto d-flex">
          <a class="mediaImg" href="">
            <i class="fas fa-user-alt"></i>
            <a href="">
              <h5>${postManage[i].createdby}</h5>
            </a>
          </a>
          <div class="media-body">
           
          </div>
        </div>
        
        
        
        
                <div class="api p-3 mt-3"><h4>${postManage[i].title}</h4>
                <img class="img-fluid" src="${postManage[i].img}">
                <p>${postManage[i].content}</p>
                </div>
                <div class=" d-flex mt-2 justify-content-center align-items-end">
                <a  data_index="${i}" data_id="${postManage[i].id}" class="editbtn btn text-danger mr-3 btn-warning " >Edit</a>
                <a data_index="${i}" data_id="${postManage[i].id}"  class=" delbtn btn btn-danger text-warning data-toggle="modal" data-target="#exampleModalCenter" >Delete</a>
                </div>
                </div>`
                postman.innerHTML = temp;
    } 
}

      
    });
