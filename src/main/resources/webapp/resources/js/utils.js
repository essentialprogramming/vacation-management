class Utils {

    constructor() {

    }

    static clearChildren(id){
        let element = document.getElementById(id);
        if (element){
            while (element.hasChildNodes()) {
                element.removeChild(element.lastElementChild);
            }
        }

    }

    static filterTable(tableID, inputID ) {

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

        const m = Math.floor(param.length/2);
        const [inputIds,classNames] = [param.slice(0,m), param.slice(m, param.length)];

        const inputElements = inputIds.map(inputID => document.getElementById(inputID));


        // Loop through all list items, and hide those who don't match the search query
        for (let i = 0; i < listItems.length; i++) {
            let columns = [];
            classNames.forEach(className => {
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

    static matchSearchCriteria(column, index, inputElements  ) {
        let txtValue = column.textContent || column.innerText;
        let filter = inputElements[index].value.toUpperCase();
        return txtValue.toUpperCase().indexOf(filter) > -1;
    }

    static combineStrings(a = [], ...b){
        return b.length ? a.length ? [a[0], ...Utils.combineStrings(...b, a.slice(1))] : Utils.combineStrings(...b) : a;
    }

    static zip(a, b) {
        let i,
            l = Math.min(a.length, b.length),
            temp = '';

        for( i = 0; i < l; i++) {
            temp += a[i] + b[i];
        }
        return temp + a.slice(i) + b.slice(i);
    }

    static removeElement(property, value, arrayOfElements) {
        // first find the index of the item in the array
        const index = arrayOfElements.findIndex(`element => element.${property} === ${value}`);
        // make a new array without that item in it
        return [
            ...arrayOfElements.slice(0, index),
            ...arrayOfElements.slice(index + 1),
        ];
        // return our new array
    }

}