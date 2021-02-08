class Utils {

    constructor() {

    }

    static getRequestParameter(parameterName) {
        if (parameterName = (new RegExp('[?&]' + encodeURIComponent(parameterName) + '=([^&]*)')).exec(location.search))
            return decodeURIComponent(parameterName[1]);
    }


    static clearChildren(id) {
        let element = document.getElementById(id);
        if (element) {
            while (element.hasChildNodes()) {
                element.removeChild(element.lastElementChild);
            }
        }

    }

    static filterTable(tableID, inputID) {

        let input, filter, table, tr, td, txtValue;

        table = document.getElementById(tableID);
        tr = table.getElementsByTagName("tr");

        input = document.getElementById(inputID);
        filter = input.value.toUpperCase();


        // Loop through all table rows, and hide those who don't match the search query
        for (let i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }


    static filterList(listID, ...param) {

        let list, listItems;
        list = document.getElementById(listID);
        listItems = list.getElementsByTagName("li");

        const m = Math.floor(param.length / 2);
        const [inputIds, classNames] = [param.slice(0, m), param.slice(m, param.length)];

        const inputElements = inputIds.map(inputID => document.getElementById(inputID));


        // Loop through all list items, and hide those who don't match the search query
        for (let i = 0; i < listItems.length; i++) {
            let columns = [];
            classNames.forEach((className, index) => {
                let column = listItems[i].querySelectorAll(`.${className}`)[0];
                columns.push(column);
            });

            if (columns.every((column, index) => Utils.matchSearchCriteria(column, index, inputElements))) {
                listItems[i].style.display = "";
            } else {
                listItems[i].style.display = "none";
            }

        }
    }

    static formToJSON(formID) {
        const form = document.getElementById(formID);
        let rawData = new FormData(form);

        let data = {};
        for (let pair of rawData.entries()) {
            data[pair[0]] = pair[1];
        }
        return data;
    }

    static post(url, data) {
        let promise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = (response) => resolve(response.currentTarget.responseText);
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send(data);
        });

        return promise;
    }

    static put(url, data) {
        let promise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('PUT', url);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = (response) => resolve(response.currentTarget.responseText);
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send(data);
        });

        return promise;
    }

    static matchSearchCriteria(column, index, inputElements) {
        let txtValue = column.textContent || column.innerText;
        let filter = inputElements[index].value.toUpperCase();
        return txtValue.toUpperCase().indexOf(filter) > -1;
    }

    static combineStrings(a = [], ...b) {
        return b.length ? a.length ? [a[0], ...Utils.combineStrings(...b, a.slice(1))] : Utils.combineStrings(...b) : a;
    }

    static zip(a, b) {
        let i,
            l = Math.min(a.length, b.length),
            temp = '';

        for (i = 0; i < l; i++) {
            temp += a[i] + b[i];
        }
        return temp + a.slice(i) + b.slice(i);
    }

    static union(a, b) {
        let result = [...new Set([...a, ...b])];
        return result;
    }

    static intersection(a, b) {
        let result = a.filter(x => b.includes(x));
        return result;
    }

    static removeElement(property, value, arrayOfElements) {
        // first find the index of the item in the array
        const index = arrayOfElements.findIndex(element => `element[${property}] === ${value}`);
        // make a new array without that item in it
        return [
            ...arrayOfElements.slice(0, index),
            ...arrayOfElements.slice(index + 1),
        ];
        // return our new array
    }

    static arrayToJson(array) {
        let json = { ...array };
        json = Object.assign({}, array);
        json = array.reduce((json, value, key) => {
            json[key] = value;
            return json;
        }, {});
        return json;
    }

    static collectRadios() {
        let curRadio = document.querySelector('input[name="server"]:checked').value;
        let genderS = Array.from(document.getElementsByName("genderS")).find(r => r.checked).value;
    }

    static findSelection(field) {
        let formInputElements = document.getElementById("yourFormId").getElementsByTagName("input");
        alert(formInputElements);
        for (i = 0; i < formInputElements.length; i++) {
            if ((formInputElements[i].type == "radio") && (formInputElements[i].name == field) && (formInputElements[i].checked)) {
                alert(formInputElements[i].value + ' you got a value');
                return formInputElements[i].value;
            }
        }
    }

    static isEarlier(first, second) {
        let d1 = Date.parse(first);
        let d2 = Date.parse(second);
        return d1 < d2;
    }

    static isLater(first, second) {
        let d1 = Date.parse(first);
        let d2 = Date.parse(second);
        return d1 > d2;
    }

}