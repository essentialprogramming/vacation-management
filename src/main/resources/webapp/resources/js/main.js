$(document).ready(function () {

    $("#status-confirm-ok").click(function () {
        functionCallback(sessionStorage.deleteID);
        $.magnificPopup.close();
    });

    $('#status-confirm-cancel').click(function () {
        $.magnificPopup.close();

    });
});

var functionCallback;

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

    new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/destinations');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send(contactData);
    });

}


function openUpdatePopup(destinationId) {
    sessionStorage.destinationId = Number(destinationId);
    fetch(`/api/destinations/${destinationId}`)
        .then(res => res.json())
        .then(json => {
            destination = json
            $('#city2').val(destination.city);
            $('#country2').val(destination.country);
            $('#description2').val(destination.description);
            $('#targets2').val(destination.targets);
            $('#cost2').val(destination.cost);
        })
        .catch(function (error) {
            console.log(error);
        });


    openPopup("#updatePopup", null, false)
}
function updateDestination(event) {
    event.preventDefault();

    const form = document.getElementById('updateForm');
    let rawData = new FormData(form);

    let data = {};
    for(let pair of rawData.entries()) {
        data[pair[0]] = pair[1];
    }
    let targetList = data.targets.split(",");
    data.targets = targetList;
    data.id = sessionStorage.destinationId;
    let contactData = JSON.stringify(data);

    new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', '/api/destinations/' + data.id);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send(contactData);
    });

    $.magnificPopup.close();

}

function getDestinations(countryName){
    let ul = document.getElementById("list");
    let index = 4;
    let items;
    let url = '/api/destinations?index=' +  sessionStorage.getItem("startIndex")
    clearChildren()

    fetch(url)
        .then(res => res.json())
        .then(json => {
            items = json
            let result = items.filter(x => x.country === countryName);
            let resultSliced = result.slice(0,index);
            resultSliced.forEach(function(dest){
                let li = document.createElement('li')
                ul.appendChild(li)

                li.innerHTML += "<strong>City: </strong>" + dest.city + ", <strong> Country: </strong>" + dest.country + " " + "<button class='btn-primary' onclick='openUpdatePopup(" + dest.id + ")'>Update</button>" + " " + "<button class='btn-primary' onclick='openDeletePopup(" + dest.id + ")'>Delete</button>";
            })
        })
        .catch(function(error) {
            console.log(error);
        });

}

function next() {
    let ul = document.getElementById("list");
    let items;
    if (sessionStorage.startIndex == -1)
        sessionStorage.startIndex = 0;
    else
        sessionStorage.startIndex =  Number(sessionStorage.startIndex) + 4;
    let url = '/api/destinations?index=' +  sessionStorage.getItem("startIndex");

    clearChildren()

    fetch(url)
        .then(res => res.json())
        .then(json => {
            items = json;
            items.forEach(function(dest){
                let li = document.createElement('li');
                ul.appendChild(li);

                li.innerHTML += "<strong>City: </strong>" + dest.city + ", <strong> Country: </strong>" + dest.country + " " + "<button class='btn-primary' onclick='openUpdatePopup(" + dest.id + ")'>Update</button>" + " " +  "<button class='btn-primary' onclick='openDeletePopup(" + dest.id + ")'>Delete</button>";
            })
        })
        .catch(function(error) {
            console.log(error);
        });

}

function previous() {
    let ul = document.getElementById("list");
    let items;
    sessionStorage.startIndex =  Number (sessionStorage.startIndex) - 4;
    let url = '/api/destinations?index=' +  sessionStorage.getItem("startIndex");
    clearChildren()
    fetch(url)
        .then(res => res.json())
        .then(json => {
            items = json
            items.forEach(function(dest){
                let li = document.createElement('li');
                ul.appendChild(li);

                li.innerHTML += "<strong>City: </strong>" + dest.city + ", <strong> Country: </strong>" + dest.country + " " + "<button class='btn-primary' onclick='openUpdatePopup(" + dest.id + ")'>Update</button>" + " " + "<button class='btn-primary' onclick='openDeletePopup(" + dest.id + ")'>Delete</button>";
            })
        })
        .catch(function(error) {
            console.log(error);
        });

}

function generateData(menu) {
    if (menu.value === 'germany') {
        getDestinations('Germany')
    } else if (menu.value === 'italy') {
        getDestinations('Italy')
    } else if (menu.value === 'spain') {
        getDestinations('Spain')
    } else if (menu.value === 'france') {
        getDestinations('France')
    } else if (menu.value === 'romania') {
        getDestinations('Romania')
    }
}

function clearChildren(){
    let ul = document.getElementById("list");
    while (ul.lastElementChild) {
        ul.removeChild(ul.lastElementChild);
    }
}

function openDeletePopup(id) {
    sessionStorage.deleteID = id;
    openPopup("#delete-modal", null, false);
    functionCallback = deleteDestination;

}

function deleteDestination(id) {
    return fetch(`/api/destinations/${id}`, {
        method: 'DELETE',
    }).then(response => response.json())

}




function openPopup(popupId, popupExtraConfig, isModal) {

    $(popupId).removeAttr('style');
    if ( ! $(popupId).hasClass('zoom-anim-dialog')) {
        $(popupId).addClass('zoom-anim-dialog');
    }
    $(popupId).draggable({
        handle: $(popupId).children().first(),
        disabled: false,
        revert: function() {
            return $(this).offset().top < -40 ;
        }
    });
    $(popupId).children().first().css('cursor', 'move');

    let popupConfig = {
        removalDelay : 70,
        items : {
            src : popupId
        },
        mainClass : 'my-mfp-slide-bottom',
        type : 'inline',
        modal : isModal

    };

    $.extend(popupConfig, popupExtraConfig);
    $.magnificPopup.open(popupConfig);
    $('.mfp-close').addClass('mfp-close-white');

    setTimeout(function(){
            $(popupId).removeClass('zoom-anim-dialog');
        },
        700
    );

}