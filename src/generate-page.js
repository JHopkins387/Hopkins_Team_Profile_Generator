
//function creates employee cards
const generateEmployeeCards = employees => {

    //function to display unique attributes for each employee type
    let displayExtraInfo = function (employees) {
        if (employees.officeNumber) {
            return `Office Number: ${employees.officeNumber}`
        } else if (employees.github) {
            return `Github Username: <a href="https://github.com/${employees.github}" target="_blank"> ${employees.github} </a>`
        } else {
            return `School Association: ${employees.school}`
        }
    }

    let displayRole = function (employees) {
        if (employees.officeNumber) {
            return `Manager`
        } else if (employees.github) {
            return `Engineer`
        } else {
            return `Intern`
        }
    }

    let htmlCards = `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TeamProfileGenerator</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
        crossorigin="anonymous"></script>
</head>

<body>
<!-- Navagation Bar -->
<nav class="navbar" style="background: linear-gradient(#5c5bd3, #5cc6d3)">
    <header class="h1 p-4 mx-auto text-white"> My Team </header>
</nav>


<div class="d-flex flex-row flex-wrap m-3">`

    //for each employee, add a card to htmlCards
    for (let i = 0; i < employees.length; i++) {
        htmlCards += `
    
    <div class="col p-3">
        <div class="card mb-3 shadow p-3 mb-5 rounded" style="max-width: 18rem; background-color:#dee8ec;">
            <div class="card-header h3 text-white bg-primary" style="background: linear-gradient(#166485, #73a2b5)"> ${employees[i].name} 
            <br> 
            <span class="h5"> ${displayRole(employees[i])} </span>
            </div>
                <div class="card-body">
                <p class="card-text">
                  <div class="border p-1">
                    ID: ${employees[i].id} 
                  </div> 
                  <div class="border p-1">
                    Email: <a href=mailto:${employees[i].email}> ${employees[i].email} </a>
                  </div> 
                  <div class="border p-1">
                    ${displayExtraInfo(employees[i])}
                  </div> 
                </p>
                </div>
            </div>
        </div>`
    }
    return `
    ${htmlCards} 
    </div>
    </body>
    
    </html>`;
}





module.exports = generateEmployeeCards;

