var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var tableContent= document.getElementById("tableContent");
var submitBtn= document.getElementById("submitBtn");
var updateBtn= document.getElementById("updateBtn");
var nameError= document.getElementById("nameError");
var emptyError= document.getElementById("emptyError");
var urlError= document.getElementById("urlError");
var emptyUrlError= document.getElementById("emptyUrlError");
var siteList ; 
var globalIndex; 


if(localStorage.getItem("siteList")){
    siteList = JSON.parse(localStorage.getItem("siteList"))
    displayInfo(siteList)
}
else{
    siteList= [];
}

function submitWebSite(){
    if(emptyFeild() && emptyUrlFeild()){
        if(siteNameValidation()===true && urlValidation()){
            var isDuplicate = siteList.some(site => site.name.toLowerCase() === siteName.value.toLowerCase());   
            if (isDuplicate) {
                alert("This site name already exists. Please choose another name.");
                return;
            }
            var site= {
                name: siteName.value,
                url: siteUrl.value
            }
            siteList.push(site);
            displayInfo(siteList);
            saveToLocalStorage();
            clearInput();
        }
        else{
            console.log("validation error");
        }
    }

}
    

// function to display elements
function displayInfo(sList){
    var cartona="";
    for(var i=0; i<sList.length; i++){
        cartona+=  ` <tr>
                <td>${i}</td>
                <td>${sList[i].name}</td>
                <td> 
                    <button class="btn" onclick="window.open('${sList[i].url}', '_blank')">
                        <i class="fa-solid fa-eye"></i>
                        Visite
                    </button>
                </td>
                <td>
                    <button onclick="deleteElement(${i})" class="btn">
                        <i class="fa-solid fa-trash-can"></i>
                        Delete
                    </button>
                </td>
                 <td> 
                    <button class="btn" id="searchItem" onclick="searchItems()">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        Search
                    </button>
                </td>
                 <td> 
                    <button class="btn" id="updateBtn" onclick="setFormToUpdate(${i})">
                        <i class="fa-solid fa-cloud-arrow-up"></i>
                        Update
                    </button>
                </td>
               
            </tr>`
    }
    tableContent.innerHTML = cartona;
}


// function to delete elements
function deleteElement(index){
    siteList.splice(index, 1)   
    console.log(siteList);
    displayInfo(siteList);
    saveToLocalStorage();

}


//function to save in local storage
function saveToLocalStorage(){
    localStorage.setItem("siteList", JSON.stringify(siteList))
}


// function to update
function setFormToUpdate(index){
    globalIndex= index;
    siteName.value= siteList[index].name;
    siteUrl.value= siteList[index].url;
    submitBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");   
}
function updateElement(){
    console.log(globalIndex);
    var isDuplicate = siteList.some(site => site.name.toLowerCase() === siteName.value.toLowerCase());   
    if (isDuplicate) {
        alert("This site name already exists. Please choose another name.");
        return;
    }
    siteList[globalIndex].name= siteName.value;
    siteList[globalIndex].url= siteUrl.value;
    console.log(siteList);
    displayInfo(siteList);
    saveToLocalStorage();
    submitBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");  

}

 // function for check validation
function siteNameValidation(){
    var regex= /^([A-Z]|[a-z]){3,}$/;
    if(regex.test(siteName.value)){
        nameError.classList.replace("d-block", "d-none");
        emptyError.classList.replace("d-block", "d-none");
        siteName.classList.add("is-valid");
        siteName.classList.remove("is-invalid");
        return true;
    }
    else{
        nameError.classList.replace("d-none", "d-block");
        emptyError.classList.replace("d-block", "d-none");
        siteName.classList.add("is-invalid");
        siteName.classList.remove("is-valid");
        return false;
    }
}

 // function for check empty 
function emptyFeild(){
    if(siteName.value== ""){
        emptyError.classList.replace("d-none", "d-block");
        nameError.classList.replace("d-block", "d-none");
        return false;
    }
    else{
        emptyError.classList.replace("d-block", "d-none");
        nameError.classList.replace("d-block", "d-none");
        return true;
    }
}


function urlValidation(){
    var urlregex= /^https?:\/\/[a-zA-Z0-9-]+(.[a-zA-Z0-9-]+)+(:\d+)?(\/.*)?$/;
        if(urlregex.test(siteUrl.value)){
            siteUrl.classList.add("is-valid");
            siteUrl.classList.remove("is-invalid");
            urlError.classList.replace("d-block", "d-none");
            emptyUrlError.classList.replace("d-block", "d-none");
            return true;
        }
        else{
            urlError.classList.replace("d-none","d-block");
            emptyUrlError.classList.replace("d-block", "d-none");
            siteUrl.classList.add("is-invalid");
            siteUrl.classList.remove("is-valid");
            return false;
        }
}


function emptyUrlFeild(){
    if(siteUrl.value== ""){
        emptyUrlError.classList.replace("d-none", "d-block");
        return false;
    }
    else{
        emptyUrlError.classList.replace("d-block", "d-none");
        return true;
    }
}


// function to clear inputs
function clearInput(){
    siteName.value= null;
    siteUrl.value= null;
}


// // function for search 
// function searchItems() {
//     var item= searchItem.value ;
//     var searchList= [];
//     for(var i=0 ; i < siteList.length ; i++){
//         if(siteList[i].name.toLowerCase().includes(item.toLowerCase())){
//             console.log("match", siteList[i], i);
//             searchList.push(siteList[i]);
//         }
//         else{
//             console.log("not match");
//         }
//         displayInfo(searchList, item);
//     }
// }