const name = document.getElementById('name');
const password = document.getElementById('password');
const submitBtn = document.getElementById('submit');
const bcrypt = window.dcodeIO.bcrypt;

submitBtn.onclick = async e => {
    e.preventDefault();

    let errorString = '';

    let data = {
        name: name.value,
        password: bcrypt.hashSync(password.value)
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
    try {
        const res = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const hash = await res.json();
        const success = await bcrypt.compare(password.value, hash.value);

        if (success == true) {
            data.action = 'confirm';
            const confirmationResponse = await fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const confirmation = await confirmationResponse.json();

            if (confirmation == true) {
                alert('Login successful.');
            }

        } else {
            alert('Login failed.');
        }
            

    } catch (error) {
        alert(`Ein Fehler ist aufgetreten: ${error}`);
    }
};