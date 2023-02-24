
window.onload = () => {

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

    if (Ayoba == null || Ayoba == 'unknown') {
        console.log('Environment:', 'Browser');
        displayAlert('Environment: Browser', 'success');
        Ayoba = new AyobaStub();
    } else {
        console.log('Environment:', 'Ayoba');
    }

    // MSISDN
    try {
        var msisdn = Ayoba.getMsisdn();
        const msisdnInputs = document.querySelectorAll('[data-ayoba-api="msisdn"]');
        for (let i = 0; i < msisdnInputs.length; i++) {
            const inputEle = msisdnInputs[i];
            inputEle.value = msisdn
        }
    } catch (err) {
        console.error(err)
        displayAlert(err, 'danger')
    }


    // COUNTRY
    try {
        var countryCode = Ayoba.getCountry();
        const countryInputs = document.querySelectorAll('[data-ayoba-api="country"]');
        for (let i = 0; i < countryInputs.length; i++) {
            const inputEle = countryInputs[i];
            inputEle.value = countryCode
        }
    } catch (err) {
        console.error(err)
        displayAlert(err, 'danger')
    }

    // CONTACTS
    try {
        var contacts = Ayoba.getContacts();
        const contactsInputs = document.querySelectorAll('[data-ayoba-api="contacts"]');
        for (let i = 0; i < contactsInputs.length; i++) {
            const inputEle = contactsInputs[i];
            const contactsArr = JSON.parse(contacts);
            let list = ''
            contactsArr.forEach((item, index) => {
                list+= `\n${item.name}: ${item.phoneNumber}`
            });
            inputEle.innerHTML = list
        }
    } catch (err) {
        console.error(err)
        displayAlert(err, 'danger')
    }

    // ALL CONTACTS
    try {
        var allContacts = Ayoba.getAllContacts();
        const AllContactsInputs = document.querySelectorAll('[data-ayoba-api="allContacts"]');
        for (let i = 0; i < AllContactsInputs.length; i++) {
            const inputEle = AllContactsInputs[i];
            const contactsArr = JSON.parse(allContacts);
            let list = ''
            contactsArr.forEach((item, index) => {
                list+= `\n${item.name}: ${item.phoneNumber}`
            });
            inputEle.innerHTML = list
        }
    } catch (err) {
        console.error(err)
        displayAlert(err, 'danger')
    }

    // LANGUAGE
    try {
        var lang = Ayoba.getLanguage();
        const languageInputs = document.querySelectorAll('[data-ayoba-api="language"]');
        for (let i = 0; i < languageInputs.length; i++) {
            const inputEle = languageInputs[i];
            inputEle.value = lang;
        }
    } catch (err) {
        console.log(err);
        displayAlert(err, 'danger')
    }

    // FINISH
    try {
        const finishInputs = document.querySelectorAll('[data-ayoba-api="finish"]');
        for (let i = 0; i < finishInputs.length; i++) {
            const inputEle = finishInputs[i];
            inputEle.onclick = () => {
                Ayoba.finish()
            };
        }
    } catch (err) {
        console.log('err', err);
        displayAlert(err, "danger")
    }

    // GET FILE
    try {
        const getFileInputs = document.querySelectorAll('[data-ayoba-api="getFile"]');
        for (let i = 0; i < getFileInputs.length; i++) {
            const inputEle = getFileInputs[i];
            inputEle.onclick = () => {
                responseCode = Ayoba.getFile();
                return responseCode;
            };
        }
    } catch (err) {
        console.log('err', err)
        displayAlert(err, 'danger')
    }

    // TAKE PHOTO
    try {
        const takePictureInputs = document.querySelectorAll('[data-ayoba-api="takePicture"]');
        for (let i = 0; i < takePictureInputs.length; i++) {
            const inputEle = takePictureInputs[i];
            inputEle.onclick = () => {
                Ayoba.takePicture();
            };
        }
    } catch (err) {
        console.log('err', err);
        displayAlert(err, 'danger')
    }

    // START CONVERSATION
    try {
        const startConversationInputs = document.querySelectorAll('[data-ayoba-api="startConversation"]');
        for (let i = 0; i < startConversationInputs.length; i++) {
            const inputEle = startConversationInputs[i];
            inputEle.onclick = () => {
                Ayoba.startConversation(inputEle.value);
            };
        }
    } catch (err) {
        console.log('err', err);
        displayAlert(err, 'danger')
    }

    // START PAYMENT
    try {
        const startPaymentInputs = document.querySelectorAll('[data-ayoba-api="startPayment"]');
        for (let i = 0; i < startPaymentInputs.length; i++) {
            const inputEle = startPaymentInputs[i];
            inputEle.onclick = () => {
                startPayment()
            };
        }
    } catch (err) {
        console.log('err', err);
        displayAlert(err, 'danger')
    }

    try {
        const submitInputs = document.querySelector('[data-ayoba-api="submit"]');
        submitInputs.onclick = () => {
            submit()
        }
    } catch (err) {
        console.log('err', err);
        displayAlert(err, 'danger')
    }


    // ============================================================= FUNCTIONS ============================================================================

    function onNicknameChanged(nickname) {
        const nameInputs = document.querySelectorAll('[data-ayoba-api="name"]');
        for (let i = 0; i < nameInputs.length; i++) {
            const inputEle = nameInputs[i];
            inputEle.value = nickname;
            inputEle.classList.remove("is-invalid");
            inputEle.classList.add("is-valid")
        }
    }

    function onPresenceChanged(presence) {
        const presenceInputs = document.querySelectorAll('[data-ayoba-api="presence"]');
        for (let i = 0; i < presenceInputs.length; i++) {
            const inputEle = presenceInputs[i];
            inputEle.value = presence;
            inputEle.classList.remove("is-invalid");
            inputEle.classList.add("is-valid")
        }
    }

    function onAvatarChanged(avatar) {
        const avatarInputs = document.querySelectorAll('[data-ayoba-api="presence"]');
        for (let i = 0; i < avatarInputs.length; i++) {
            const avatarImg = avatarInputs[i];
            avatarImg.src = avatarImg.tagName.toLowerCase() == 'img' ? avatar : '';
        }
    }

    function onLocationChanged(lat, lon) {
        displayAlert(lat, lon)
        const locationInputs = document.querySelectorAll('[data-ayoba-api="location"]');
        for (let i = 0; i < locationInputs.length; i++) {
            const inputEle = locationInputs[i];
            inputEle.value = `lat: ${lat}, lon: ${lon}`;
            inputEle.classList.remove("is-invalid");
            inputEle.classList.add("is-valid")
        }
    }

    function startPayment() {
        var pm = document.querySelector('[data-ayoba-payment="method"]').value;
        var currency = document.querySelector('[data-ayoba-payment="currency"]').value
        var amount = document.querySelector('[data-ayoba-payment="amount"]').value
        var description = document.querySelector('[data-ayoba-payment="description"]').value

        displayAlert(`payment info: ${pm},${amount},${currency},${description}`, 'success');
        console.log(pm, amount, currency, description);

        Ayoba.startPayment(pm, amount, currency, description);
        displayAlert('start payment done', 'warning')
    }


    function onPictureRetrievedResponse(responseCode, picturePath) {
        var responseCode = responseCode
        var picturePath = picturePath

        console.log('picture path:', picturePath);
        // displayAlert(`picture path: ${picturePath}`, 'success');
    }

    function sendGenericEvent(event) {
        Ayoba.sendGenericEvent(event);
    }







    function onPaymentStatusChanged(transactionId, status, error) {
        let res = `Transaction ID:  ${transactionId}  Status:  ${status} Error: ${error} `;
        var paymentStatusElement = document.querySelector('[data-ayoba-api="paymentStatus"]')
        paymentStatusElement.innerText = res;
        txtPaymentStatusChanged.text = res;
    }

    function submit() {
        var photo = document.querySelector('[data-ayoba-api="files"]').files[0]
        let formData = new FormData();

        formData.append("files", photo);
        displayAlert(JSON.stringify(photo), 'success')

        fetch('https://devstrapi.thedigitalacademy.co.za/api/upload', { method: "POST", body: formData }).then((res) => {
            console.log(res);
            displayAlert(res, 'success')
        }).catch((err) => {
            console.log(err);
            displayAlert(res, 'danger')
        });

    }

    function displayAlert(message, color) {
        const alertBox = document.createElement('div');
        alertBox.className = `alert alert-${color} p-1 m-1 small`;
        alertBox.style.position = 'fixed'
        alertBox.style.top = '0'
        alertBox.role = 'alert';
        alertBox.innerText = message;
        document.body.prepend(alertBox)

        setTimeout(() => {
            alertBox.remove()
        }, 4000)
    }
}
