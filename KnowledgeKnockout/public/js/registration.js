const name = document.getElementById('name');
const password = document.getElementById('password');
const email = document.getElementById('email');
const submitBtn = document.getElementById('submit');

submitBtn.onclick = async e => {
    e.preventDefault();

    let errorString = '';

    let data = {
        name: name.value,
        password: password.value,
        email: email.value
    };

    // validate input

    if (data.name === '') {
        errorString += 'Bitte Name eingeben\n';
    }

    if (data.password === '') {
        errorString += 'Bitte Password eingeben\n';
    }

    if (data.email === '') {
        errorString += 'Bitte Email eingeben';
    }

    if (errorString.length !== 0) {
        return alert(errorString);
    }
    try {
        const res = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const loggedin = await res.json();

        if (loggedin) location = '/mainpage';

    } catch (error) {
        alert(`Ein Fehler ist aufgetreten: ${error}`);
    }
};