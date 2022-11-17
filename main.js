// console.log('data :>> ', data);
// console.log('data :>> ', data[0].genre);


fetch("https://cab-cors-anywhere.herokuapp.com/https://www.freetogame.com/api/games").then((response) => {
    // console.log('response :>> ', response);
    return response.json();
})
.then((result) => {
        // console.log('result :>> ', result);
        let myData = result;
        console.log('data :>> ', myData);
        createCard(myData);
        createOptionsVal(myData);
        setFilterEventListeners(myData);   
        searchEvent(myData);  
    })
.catch((error) => console.log(error));


function createCard(data) {

    let container = document.getElementById("cards-container")
    container.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        
        let divCard = document.createElement("div");
        // let dataShortDescription = data[i].short_description;

        // divCard.setAttribute("class", "card")
        divCard.classList.add("card", "col-sm-3");
        divCard.setAttribute("style", "width: 18rem;");
 
        // Creating the img element
        let img = document.createElement("img");
        img.setAttribute("src", data[i].thumbnail)
        img.setAttribute("alt", data[i].title);
        img.classList.add("card-img-top");


        // creating the Car-body
        let divCardBody = document.createElement("div");
        divCardBody.classList.add("card-body");
        divCardBody.setAttribute("style", "height: 180px !important;");
        
        //Creating the h5 tag 
        let h5 = document.createElement("h5");
        h5.classList.add("card-title");
        h5.innerText = data[i].title; 
                

        let pCard = document.createElement("p");
        pCard.classList.add("card-text");
        
         
        const myArray = data[i].short_description.split(" ");
        if(myArray.length > 11) {
            let newVar = data[i].short_description.split(" ")
            .slice(0, 10)
            .join(" ")
            ; 
            
            // Creating the button for showing the whole text
            let buttonCardText = document.createElement("button");
            buttonCardText.classList.add("myBtn", "btn", "btn-warning", "btn-sm");
            buttonCardText.setAttribute("id", i);
            buttonCardText.setAttribute("type", "button");

            buttonCardText.innerHTML = "...";
            
            // Creating the span inside ModalContant
            let spanModal = document.createElement("span");
            spanModal.classList.add("close");
            spanModal.innerHTML = "&times;"

            pCard.innerHTML = newVar;
            pCard.appendChild(buttonCardText);
    
        } else {
            data[i].short_description.split(" ")
            .slice(0, 10)
            .join(" ")
            ;
            pCard.innerHTML = data[i].short_description; 
        }
        


        let ulGroup = document.createElement("ul");
        ulGroup.classList.add("list-group", "list-group-flush");
        
        let liGroup = document.createElement("li");
        liGroup.classList.add("list-group-item");
        liGroup.innerHTML = data[i].genre + "<br>" /*+ data[i].developer + "<br>"*/ + data[i].platform + "<br>" + "release date: " + data[i].release_date;
        

        let divCardBody1 = document.createElement("div");
        divCardBody1.classList.add("card-body");

        let a1 = document.createElement("a");
        a1.classList.add("btn", "btn-primary");
        a1.setAttribute("href", data[i].game_url);
        a1.innerText = "Free";

        let a2 = document.createElement("a");
        a2.classList.add("btn", "btn-primary");
        a2.setAttribute("href", data[i].freetogame_profile_url);
        a2.innerText = "Free2Game website";


        // Appending each tag 
        container.appendChild(divCard);
        divCard.appendChild(img);
        divCard.appendChild(divCardBody);
        divCardBody.appendChild(h5);
        divCardBody.appendChild(pCard);
        divCard.appendChild(ulGroup);
        ulGroup.appendChild(liGroup);
        divCard.appendChild(divCardBody1);
        divCardBody1.appendChild(a1);
        divCardBody1.appendChild(a2);
        
        
    } 
    getEvents(data)
}


function getEvents(data) {
    var buttons = document.querySelectorAll(".myBtn")
    buttons.forEach((button)=> {
        button.addEventListener("click", function(e){
            // console.log("this is button", button.id);
            console.log('e.target.id :>> ', e.target.id);
            showModal(data, e.target.id)
        })
    })
}
   

function showModal(data,buttonId) {
    // console.log('id number :>> ', buttonId);
    // console.log('data :>> ', data);
    
    let modalContainer = document.getElementById("modalContainer")
    // const buttonId = document.querySelector(".myBtn").id
    console.log('buttonId :>> ', buttonId);
    // Creating the div for the modal
    let divModal = document.createElement("div");
    divModal.setAttribute("id", "myModal");
    divModal.classList.add("modal");
    divModal.style.display = "block";

    // Creating the ModalContent
    let divModalContent = document.createElement("div");
    divModalContent.classList.add("modal-content");
    divModalContent.setAttribute("id", "ModalContent");

    // Creating the span inside ModalContant
    let spanModal = document.createElement("span");
    spanModal.classList.add("close");
    spanModal.innerHTML = "&times;"

    // Creating the p tag where to put the content that will be showned
    let pModalContent = document.createElement("p");
    

    pModalContent.innerHTML = data[buttonId].short_description + "<br>" + "<br>" + data[buttonId].developer + "<br>" +data[buttonId].publisher;
    // console.log('pModalContent.innerHTML :>> ', pModalContent.innerHTML);


        // When the user clicks on <span> (x), close the modal
        spanModal.onclick = function() {
            divModal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == divModal) {
            divModal.style.display = "none";
        }
    }
    // console.log('divModal :>> ', divModal);
    modalContainer.appendChild(divModal);
    divModal.appendChild(divModalContent);
    divModalContent.appendChild(spanModal);
    divModalContent.appendChild(pModalContent);
}



// populating the dropdown with values from the array
function createOptionsVal(games) {
    // select the element 
    let selectVal = document.getElementById("idSelectGenre");
    // make a foreach for accesing the property
    
    // map over the array and extract each and every element respetively, the property that I'm looking for => genre
    let genres = games.map((game) => {
        return game.genre;
    });

    // eliminating the duplicates and sorting the values
    const uniqueGenres = [...new Set(genres)].sort();
    // console.log('uniqueGenre :>> ', uniqueGenres);
    
    uniqueGenres.forEach((genre) => {
        // console.log('uniqueGenre :>> ', uniqueGenre);
        // create the element options
        let optionsGenerate = document.createElement("option");
        // write the genre into HTML
        optionsGenerate.innerHTML = genre;
        optionsGenerate.value = genre;
        // append the option to the parent
        selectVal.appendChild(optionsGenerate); 
    })
}

// Add event listeners for the dropdown & checkboxes

function setFilterEventListeners(data) {
    document.querySelector("#idSelectGenre").addEventListener("change", (e) => {
        // console.log('event :>> ', e.target.value);
        filterDropDown(data);
    });
    // document.querySelector(".pcCheckbox").addEventListener("change", (e) => {
    //     console.log('e :>> ', e);
    // });
    // document.querySelector(".webCheckbox").addEventListener("change", (e) => {
    //     console.log('e :>> ', e);
    // });
    /////////// instead of doing this logic from above, I select all by their input and loop them ///////////
    const checkBoxes = document.querySelectorAll("input[type= 'checkbox']");
    // console.log(' checked :>> ',  checkBoxes);
    checkBoxes.forEach((checkbox) => {
        checkbox.addEventListener("click", (e) => {
            // console.log('checked :>> ', e.target.value);
            filterCheckBoxes(data);
        })
    })
    document.querySelector("#SubmitBut").addEventListener("click", (e) => {
        // console.log('e :>> ', e);
    });
}


  

// Filter for Genre - Dropdown - 
const filterDropDown = (games) => {
    // console.log('data :>> ', data);
    const dropDownValue = document.querySelector("#idSelectGenre").value;
    // console.log('dropDownValue :>> ', dropDownValue);
    // filter over the array of data .
   
    let filteredGenres = games.filter((gameGenre) => { 
        return gameGenre.genre === dropDownValue || dropDownValue === "Genre";
    })       
    // call the function createCard to populate with filtered elements
    createCard(filteredGenres);
};

const filterCheckBoxes = (games) => {
    // target all checkBoxes
    // const checkBoxes = document.querySelectorAll("input[type= 'checkbox']");
    // // create array with the values of the checked checkboxes
    // let checkedCheckboxes = [];
    // const checkBoxValue = checkBoxes.forEach((checkBox) => {
    //     // console.log('checkBox :>> ', checkBox);
    //     if(checkBox.checked === true) {
    //         checkedCheckboxes.push(checkBox.value);
    //         console.log('checkedCheckboxes :>> ', checkedCheckboxes);
    //     }
    // })
    const checkBoxes = document.querySelectorAll("input[type= 'checkbox']:checked");
    // checkBox is nodeList and not an array. An node list behave almost like an Array but I can't map over it. I can do a foreach, a for loop but not map over it
    let valuesArray = Array.from(checkBoxes).map((checkBox) => {
        // console.log('checkBox.value :>> ', typeof checkBox.value);
        return checkBox.value;
    })
    // let loopedValuesArray = "";
    // for (let i in valuesArray) {
    //     loopedValuesArray += valuesArray[i];
    //     console.log('typeof :>> ', valuesArray[i]);
    // }
    const valuesCheckedBoxes = games.filter((game) => {
        // console.log('valuesArray :>> ',typeof valuesArray.toString());
        // console.log('typeof filteredCheckedBox.platform:>> ', typeof filteredCheckedBox.platform);
        // console.log('typeof valuesArray:>> ', loopedValuesArray);
        //  return valuesArray.includes(filteredCheckedBox.platform);  
        return (valuesArray.includes(game.platform) || valuesArray.length  === 0);
    })
    // console.log('valuesCheckedBoxes :>> ', valuesCheckedBoxes);
    createCard(valuesCheckedBoxes);
}




    

function searchEvent (data) {
    let search = document.getElementById("search");
    // console.log('search :>> ', search);
    let searchInput = "";
   
    search.addEventListener("input", (e) => {
        searchInput = e.target.value.toLocaleLowerCase();
        // console.log('e :>> ', searchInput);
        filterByInput(data,searchInput)  
    })


    search.addEventListener("keyup", (e) => {
        // console.log('event :>> ', e);
        if( e.key === "Enter") {
        // console.log('e :>> ', e.target.value);
        // console.log('event :>> ', e);
        // console.log('searchInput2Lower :>> ', searchInput);
        filterByInput(data,searchInput)  
        }
    })

}

function filterByInput(games,searchInput) {
    // console.log('data, searchInput :>> ', data, searchInput);
   
    let filteredGameTitel = games.filter((gameTitel) => {
    // console.log('dataProp :>> ', dataProperty);
        let gameTitelToLower = gameTitel.title.toLocaleLowerCase();
            return gameTitelToLower.includes(searchInput);
        })
    // console.log('filteredData :>> ', filteredData);
    createCard(filteredGameTitel);
}


/// dynamic date for the footer
function footerDate() {
    // let footer = document.querySelector("footer");
    // let divFooter = document.querySelector("text-center");
    let pDate = document.getElementById("dateInsert");
    let date = new Date();
    let year = date.getFullYear();
    if(year > 2022) {
        pDate.innerHTML = "-" + year;
    }

    // footer.appendChild(divFooter);
    // divFooter.appendChild(pDate);
}
footerDate();