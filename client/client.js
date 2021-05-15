const form=document.querySelector('form');
const loadingElement=document.querySelector('.loading')
const API_URL='http://localhost:5000/reps';
const mewsElement=document.querySelector('.mews');
loadingElement.style.display='';
var img;
function loadImageFile() {
    var filesSelected = document.getElementById("inputImageToLoad").files;
    var fileName = document.getElementById("inputImageToLoad").files[0].name;
    var fileExt = fileName.split(".")[1];
    // console.log(fileExt);
    var fileToLoad = filesSelected[0];

    var fileReader = new FileReader();

    fileReader.onload = function(fileLoadedEvent)
    {
        img=fileLoadedEvent.target.result
        //console.log(fileLoadedEvent.target.result);
    };
    fileReader.readAsDataURL(fileToLoad);
}

function listAllMews() {
    mewsElement.innerHTML = '';
    fetch(API_URL).then(response => parse(response))
        .then(response => response.json())
        .then(mews => {
            mews.reverse();
            mews.forEach(mew => {
                const div = document.createElement('div');

                const header = document.createElement('h3');
                header.textContent = mew.name;

                const contents = document.createElement('p');
                contents.textContent = mew.comment;

                const image = document.createElement('img')
                img.src =mew.img.fileLoadedEvent.target.result;
                const date = document.createElement('small');
                date.textContent = mew.date;

                div.appendChild(header);
                div.appendChild(contents);
                document.getElementById('body').appendChild(img);
                div.appendChild(date);

                mewsElement.appendChild(div);
            });
            loadingElement.style.display = 'none';
        });
}
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const content = formData.get('content');
    //var img = formData.get('img');
    const mew = {
        name,
        content,
        img
    };
    console.log(mew);
    form.style.display = 'none';
    loadingElement.style.display = '';
    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(mew),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
        .then(createdMew => {
            console.log(mew);
            form.reset();

        });
    location.reload(true);
    listAllMews();
    location.reload(true);



});

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}


const list = [1, 2, 3, 4]
const doSomething = async () => {
    for (const item of list) {
        await sleep(5000)
        console.log('🦄')
    }
    location.reload(true);
}

listAllMews();
doSomething();

function parse(a1) {
    var a2=a1.length;
    var e=0;
    var u=1;
    for(e=0;e<a2;e++) {
        if (a1[e] === ']')
        {
            e=1
        }
        if(e=1){
            a1[e]='';
        }
    }
    return a1;
}


