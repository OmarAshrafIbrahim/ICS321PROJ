async function postpackage() {
    let url = '/Addpackage'
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            PNUMBER, Reciver_name, Type, status, destination, status
        }),
    });
    return await res.json();
};

const btn = document.getElementById("addbtn")
btn.addEventListener('click', postpackage);
