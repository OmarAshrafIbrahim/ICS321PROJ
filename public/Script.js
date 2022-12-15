async function postpackage() {
    let url = 'http://localhost:8000/Addpackage'
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            PNUMBER, Reciver_name, Type, Status, destination, location
        }),

    });
    return await res.json();
};

const btn = document.getElementById("addbtn")
btn.addEventListener('click', postpackage);
