var Ayoba = getAyoba()
 
/**
* Determine the mobile operating system and returns the
* proper javascript interface
*/
function getAyoba() {
   var userAgent = navigator.userAgent || navigator.vendor || window.opera;
 
   // Windows Phone must come first because its UA also contains "Android"
   if (/windows phone/i.test(userAgent)) {
       return null;
   }
 
   if (/android/i.test(userAgent)) {
       return Android;
   }
 
   // iOS detection from: http://stackoverflow.com/a/9039885/177710
   if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
       return null; // todo
   }
 
   return "unknown";
}
// Ayoba = new AyobaStub();
console.log(Ayoba);

if( Ayoba == null || Ayoba == 'unknown') {
    document.getElementById('myspan').innerText = "Browser"
}else {
    document.getElementById('myspan').innerText = "Ayoba"
}

// MSISDN
var msisdn = Ayoba.getMsisdn();
if(msisdn) {
    document.getElementById("msisdn").value = msisdn
    document.getElementById("msisdn").classList.add("is-valid")
}else {
    document.getElementById("msisdn").classList.add("is-invalid")
}

// COUNTRY
var countryCode = Ayoba.getCountry();
document.getElementById("country").value = countryCode

// CONTACTS
var contacts = Ayoba.getContacts();
document.getElementById("contacts").value = contacts

// ALL CONTACTS
var allContacts = Ayoba.getAllContacts();
document.getElementById("allContacts").value = allContacts


// LANGUAGE

var lang = Ayoba.getLanguage();
document.getElementById("lang").value = lang

// ============================================================= FUNCTIONS ============================================================================


function onNicknameChanged(nickname) {
    document.getElementById("name").value = nickname
    document.getElementById("name").classList.remove("is-invalid");
    document.getElementById("name").classList.add("is-valid")
}

function onPresenceChanged(presence) {
    document.getElementById("presence").value = presence
    document.getElementById("presence").classList.remove("is-invalid");
    document.getElementById("presence").classList.add("is-valid")
}

function onAvatarChanged(avatar) {
    document.getElementById("myImg").src = avatar;
}

function onLocationChanged(lat, lon) {
    document.getElementById("lat").value = lat
    document.getElementById("lon").value = lon
    document.getElementById("lat").classList.remove("is-invalid");
    document.getElementById("lat").classList.add("is-valid")
    document.getElementById("lon").classList.remove("is-invalid");
    document.getElementById("lon").classList.add("is-valid")
}

function getFile() {
    var responseCode = Ayoba.getFile();
    console.log(responseCode);
    return responseCode;
}

function takephoto() {

    Ayoba.takePicture();
    
}

function onPictureRetrievedResponse(responseCode, picturePath) {
    var responseCode = responseCode
    var picturePath = picturePath

    console.log(picturePath);
}

function sendGenericEvent(event) {
    Ayoba.sendGenericEvent(event);
}

function startConversation() {
    Ayoba.startConversation(document.getElementById("jid").value);
}

function finish() {
    Ayoba.finish()
}

function startPayment() {
    var pm = document.getElementById('pm').value;
    var currency = document.getElementById('currency').value;
    var amount = parseInt(document.getElementById('amount').value);
    var description = document.getElementById('description').value;

    console.log(pm,amount,currency,description);

    Ayoba.startPayment(pm, amount , currency , description);
}


function submit() {

    let photo = document.getElementById("files").files[0];
    let formData = new FormData();
    
    formData.append("files", photo);   

    fetch('https://devstrapi.thedigitalacademy.co.za/api/upload', {method: "POST", body: formData}).then((res) => {
        console.log(res);
    }).catch( (err) => {
        console.log(err);
    });

}






