const name = document.getElementById('name');
const password = document.getElementById('password');
const submitBtn = document.getElementById('submit');

submitBtn.onclick = async e => {
    e.preventDefault();

    let errorString = '';

    let data = {
        name: name.value,
        password: password.value
    };

    // validate input

    if (data.name === '') {
        errorString += 'Bitte Name eingeben\n';
    }

    if (data.password === '') {
        errorString += 'Bitte Password eingeben\n';
    }


    if (errorString.length !== 0) {
        return alert(errorString);
    }
    else {
        try {
            const res = await fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const loggedin = await res.json();

            if (loggedin) location = '/mainpage';
        } catch (error) {
            alert(`Ein Fehler ist aufgetreten: ${error}`);
        }
    }
};