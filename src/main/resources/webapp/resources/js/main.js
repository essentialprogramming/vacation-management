let destinations = [];

docReady(function () {


});


function postData(event) {
    event.preventDefault();
    let data = Utils.formToJSON('form');
    let targetList = data.targets.split(",");
    data.targets = targetList
    let destination = JSON.stringify(data);

    let promise = Utils.post('/api/destinations', destination);
    promise
        .then(responseText => {
            let json = JSON.parse(responseText);
            getDestinations();
        })
        .catch(function (error) {
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

    if (answer) {
        updateDestination(destinationId, answer);
        console.log(answer);
    }
}
function updateDestination(id, data) {

    console.log(id, data);
    let targetList = data.targets.split(",");
    data.targets = targetList;
    let jsonData = JSON.stringify(data);
    let promise = Utils.put('/api/destinations/' + id, jsonData);

}

function getDestinations() {
    let destinationDiv = document.getElementById("destinationList");
    let items;

    let filter = {
        index: Number(sessionStorage.getItem("startIndex"))
    }
    let url = '/api/destinations?filter=' + encodeURIComponent(JSON.stringify(filter));

    let sample = {
        city: "Dubai",
        country: "No bine",
        description: "bine de tat"
    }


    fetch(url)
        .then(res => res.json())
        .then(json => {
            items = json
            destinationDiv.innerHTML = createDestinationsList(Utils.union(items, [sample]));
        })
        .catch(function (error) {
            console.log(error);
        });

}

function next() {
    if (sessionStorage.startIndex === -1)
        sessionStorage.startIndex = 0;
    else
        sessionStorage.startIndex = Number(sessionStorage.startIndex) + 4;
    getDestinations();

}

function previous() {
    sessionStorage.startIndex = Number(sessionStorage.startIndex) - 4;
    getDestinations();

}

function createDestinationsList(items) {
    const rows = items.map(dest => {
        let className = [
            "classAlwaysPresent",
            ...Array.from(dest.cost < 100 && ["classIfnotTrue"]),
            ...Array.from(dest.cost > 100 && ["classIfTrue"])]
            .join(" ");

        let disabled = [
            ...Array.from(dest.cost > 1000 && ["disabled"]),
            ...Array.from(dest.cost < 1000 && [""])]
            .join(" ");

        return `<li>
         <div class="${className}">
             <span class="city"><strong>City: </strong>  ${dest.city} ,</span>
             <span class="country"><strong>Country: </strong>  ${dest.country}  </span>
             <span><button class='btn-primary' onclick='openUpdatePopup(${dest.id})' ${disabled}>Update</button></span>
             <span><button class='btn-primary' onclick='openDeletePopup(${dest.id})' ${disabled}>Delete</button></span>
         </div> 
      </li>`;
    });
    return `<ul id="list">${rows.join('')}</ul>`;
}


function generateData(menu) {

    Utils.filterList('list', 'countries', 'cities', 'country', 'city')
}



async function openDeletePopup(id) {

    const answer = await modal({
        popupId: "delete-modal",
        title: "Delete ?",
        cancel: true
    });

    if (answer === 'confirm') {
        deleteDestination(id);
        console.log(answer);
    }


}

function deleteDestination(id) {
    return fetch(`/api/destinations/${id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(json => {
            getDestinations();
        })
        .catch(function (error) {
            console.log(error);
        });
}

async function openAddPopup() {

    const answer = await modal({
        popupId: "updatePopup",
        title: "Add destination",
        cancel: false
    });

    if (answer) {
        answer.targets = answer.targets.split(",");
        destinations.push(answer);
        console.log(answer);
    }
}

async function saveDestinations() {

    let destinationsJSON = JSON.stringify(destinations);
    console.log(destinationsJSON);
    let promise = Utils.post('/api/destinations/batch', destinationsJSON);
    promise
        .then(responseText => {
            let json = JSON.parse(responseText);
            getDestinations();
        })
        .catch(function (error) {
            console.log(error);
        });
}




