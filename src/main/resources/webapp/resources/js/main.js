docReady(function () {


});


function postData(event) {
    event.preventDefault();
    const form = document.getElementById('form');
    let rawData = new FormData(form);

    let data = {};
    for(let pair of rawData.entries()) {
        data[pair[0]] = pair[1];
    }
    let targetList = data.targets.split(",");
    data.targets = targetList
    let contactData = JSON.stringify(data);

    let promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/destinations');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = (response) => resolve(response.currentTarget.responseText);
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send(contactData);
    });
    promise
        .then(responseText => {
            let json = JSON.parse(responseText);
            getDestinations();
        })
        .catch(function(error) {
            console.log(error);
        });

}


async function openUpdatePopup(destinationId) {
    sessionStorage.destinationId = Number(destinationId);
    let response = await fetch(`/api/destinations/${destinationId}`)
        .then(res => res.json())
        .then(json => {
            return json;
        })
        .catch(function (error) {
            console.log(error);
        });

    const answer = await modal({
        popupId: "updatePopup",
        title: "Update destination",
        cancel: false,
        data: response
    });

    if (answer){
        updateDestination(destinationId, JSON.parse(answer));
        console.log(answer);
    }
}
function updateDestination(id, data) {


    let targetList = data.targets.split(",");
    data.targets = targetList;
    let jsonData = JSON.stringify(data);

    new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', '/api/destinations/' + id);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send(jsonData);
    });


}

function getDestinations(){
    let destinationDiv = document.getElementById("destinationList");
    let items;
    let url = '/api/destinations?index=' +  sessionStorage.getItem("startIndex")

    fetch(url)
        .then(res => res.json())
        .then(json => {
            items = json
            destinationDiv.innerHTML = createDestinationsList(items);
        })
        .catch(function(error) {
            console.log(error);
        });

}

function next() {
    if (sessionStorage.startIndex == -1)
        sessionStorage.startIndex = 0;
    else
        sessionStorage.startIndex =  Number(sessionStorage.startIndex) + 4;
    getDestinations();

}

function previous() {
    sessionStorage.startIndex =  Number (sessionStorage.startIndex) - 4;
    getDestinations();

}

function createDestinationsList(items) {
    const rows = items.map(dest => {
        return `<li>
         <div class="myDiv">
             <span class="city"><strong>City: </strong>  ${dest.city} ,</span>
             <span class="country"><strong>Country: </strong>  ${dest.country}  </span>
             <span><button class='btn-primary' onclick='openUpdatePopup(${dest.id})'>Update</button></span>
             <span><button class='btn-primary' onclick='openDeletePopup(${dest.id})'>Delete</button></span>
         </div> 
      </li>`;
    });
    return `<ul id="list">${rows.join('')}</ul>`;
}


function generateData(menu) {
/*    if (menu.value === 'germany') {
        getDestinations('Germany')
    } else if (menu.value === 'italy') {
        getDestinations('Italy')
    } else if (menu.value === 'spain') {
        getDestinations('Spain')
    } else if (menu.value === 'france') {
        getDestinations('France')
    } else if (menu.value === 'romania') {
        getDestinations('Romania')
    }*/
    Utils.filterList('list', 'countries', 'cities', 'country', 'city')
}



async function openDeletePopup(id) {
/*    sessionStorage.deleteID = id;
    openPopup("#delete-modal", null, false);
    document.getElementById("status-confirm-ok").onclick = function () {
        deleteDestination(sessionStorage.deleteID);
        $.magnificPopup.close();
    };

    document.getElementById('status-confirm-cancel').onclick = function () {
        $.magnificPopup.close();

    };*/

    const answer = await modal({
        popupId: "delete-modal",
        title: "Delete ?",
        cancel: true
    });

    if (answer === 'confirm'){
        deleteDestination(id);
        console.log(answer);
    }


}

function deleteDestination(id) {
/*    return fetch(`/api/destinations/${id}`, {method: 'DELETE'} )
        .then(response => response.json())
        .then(json => {
            getDestinations();
        })
        .catch(function(error) {
            console.log(error);
        });*/
}


