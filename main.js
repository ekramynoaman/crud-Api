let postsData;

fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then(res => {
        postsData = res;
        var temp = '';
        for (var i = 0; i < postsData.length; i++) {

            temp += '<div class=" col-lg-4 col-md-6 col-sm-12"> <div class="api p-3 mt-3"><h4>' + postsData[i].title + '</h4><p> ' + postsData[i].body + ' </p></div></div></div>';

        }
        console.log(postsData);

        document.getElementById("posts").innerHTML = temp;
    })
    