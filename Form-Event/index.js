const submitAction = document.getElementById('formDataDiri');

submitAction.addEventListener('submit', function (event) {
    const inputNama = document.getElementById('inputNama');
    const inputDomisili = document.getElementById('inputDomisili');
    const hiddenMessage = `Hello ${inputNama}! Bagaimana cuaca di ${inputDomisili}`;

    document.getElementById('messageAfterSubmit').innerText = hiddenMessage;
    // Berfungsi untuk mencegah event refresh pada web browser
    event.preventDefault();
})