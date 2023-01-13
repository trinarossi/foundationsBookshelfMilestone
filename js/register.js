const userField = document.querySelector('.user');
const passField = document.querySelector('.pass');
const submitBtn = document.querySelector('.submit');

submitBtn.addEventListener('click', () => {
    const username = userField.value;
    const password = passField.value;
    if (!username || !password) {
        return console.log("no input");
    } else location.href = "../index.html";
});
