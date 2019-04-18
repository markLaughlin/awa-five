apiKey = "L0vOL3Z0UJvDs2zvPqhvfmWIsS5vBH3nffLJr9Kk"
const searchURL = 'https://developer.nps.gov/api/v1/parks';

function watchForm(){
    console.log("page loaded; watchForm function ran");
    $("#formOne").submit(function (event){
        event.preventDefault();
        console.log("the form was submitted");
        let state = $("#inputOne").val();
        console.log(state);
        let max = $("#inputTwo").val();
        max = max-1;
        console.log(max);
        getParks(state, max);
    });
}

function getParks(s, m=10){
    console.log("getParks function ran");
    console.log(s, m);

    let params = {
        stateCode: s,
        limit: m,
        api_key: apiKey
    };

    const queryString = formatQueryParams(params);

    const url = searchURL + '?' + queryString;

    console.log(queryString);

    console.log(url);
    
    fetch(url)
    .then(function(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    })
    .then(response => response.json())
    .then(responseJson => display(responseJson))
    .catch(error => alert("Something went wrong. Try again!"));   
}

function formatQueryParams(params) {
    const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }

function display(rJ){
    console.log("display function ran");
    console.log(rJ);
    length = rJ.data.length;
    console.log(length);

    if(length == 0){
        $("#displayArea").append(`No park names came back. Did you enter the correct abbreviation for the state? Click the reset button to try again.`);
    }

    for(i=0; i<length; i=i+1){
    p = rJ.data[i].name
    console.log(p);
    $("#displayArea").append(`${p} <br>`);
    }

    offerReset();
}

function offerReset(){
    console.log("offerReset function ran");
    let resetOffer = `
    <p></p>
    <label for="resetButton">
        <button id="resetButton">Reset</>
    </label>
    `
    $("#displayArea").append(resetOffer);
    reset()
}

function reset(){
    console.log("reset function ran");
    $("#resetButton").click(function (event){
        console.log("reset button clicked");
        $("#displayArea").empty();
        $("#formOne").trigger("reset");
    });
}
$(watchForm)