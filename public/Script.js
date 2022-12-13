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
    console.log(res);
    return await res.json();
};
const btn = document.getElementsByName("btn1");
console.log(btn.innerHTML)
btn.addEventListener("click", postpackage);