console.log('client side js file is loaded');

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('.p1')
const msg2 = document.querySelector('.p2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    msg1.textContent = 'Loading...'
    msg2.textContent = ''
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msg1.textContent = data.error
            } else {
                msg1.textContent = 'Address: ' + data.location
                msg2.textContent = 'Forecast: ' + data.forecast


            }
        })
    })



})