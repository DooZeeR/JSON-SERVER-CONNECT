
// GET data -----------------------------------------------------------------

function getData(url) {
    let fetchInit = {
        method: "GET",
        headers: new Headers(),
        mode: "cors",
        cache: "no-cache"
    };

    return fetch(url, fetchInit).then(
        data => data.json(),
        err => console.error(err)
    );
}


document.querySelector("#reloadbutton").innerHTML = '<i class="fa fa-refresh" aria-hidden="true" style="font-size:20px;"></i>';
document.querySelector("#reloadbutton").addEventListener("click", function() {
    getData("http://localhost:3000/users").then(
        users => displayData(users)
    )
    console.log("reload");
})



function displayData(users) {
    let tbody = document.querySelector("tbody");

// A már létező táblát törli, hogy a megjelenítés során ne duplikálódjon  

    while (tbody.hasChildNodes()) {
        tbody.removeChild(tbody.firstChild);
    }
//-----------------------------------------------------------------------


    for (let i=0; i < users.length; i++) {

        let tr = document.createElement("tr");
        tbody.appendChild(tr);

        let td = document.createElement("td");
        td.innerHTML = users[i].id;
        tr.appendChild(td);

        let tdn = document.createElement("td");
        tdn.innerHTML = users[i].name;
        tr.appendChild(tdn);

        let tda = document.createElement("td");
        tda.innerHTML = users[i].age;
        tr.appendChild(tda);

        let tde = document.createElement("td");
        tde.innerHTML = users[i].email;
        tr.appendChild(tde);


// --------- CREATE DELETE BUTTON ---------------------------------        
        let tdDelete = document.createElement("td");
        let deleteButton = document.createElement("button");
        deleteButton.setAttribute("class", "btn btn-danger");
        deleteButton.setAttribute("onclick", "deleteData(this)");
        deleteButton.innerHTML = '<i class="fa fa-trash" style="font-size:20px;"></i>';
        tdDelete.appendChild(deleteButton);
        tr.appendChild(tdDelete);
//-----------------------------------------------------------------        
    }
}

getData("http://localhost:3000/users").then(
    users => displayData(users)
);

//------------------------------------------------------------------------------

// Delet Data

function deleteData(row) {

//---- get ID from row what you want delete  -----------------------------------
    let tr = row.parentElement.parentElement;
    let td = tr.querySelector("td:first-child");
    let id = td.innerHTML;

//------------------------------------------------------------------------------

    let fetchInit = {
    method: "Delete",
    mode: "cors",
    cache: "no-cache"
    };

    return fetch(`http://localhost:3000/users/${id}`, fetchInit).then(
        data => data.json(),
        err => console.error(err)
    );
}