const form = document.getElementById('registerForm');
const messageDiv = document.getElementById('message');

form.addEventListener('submit', async function(e) {
    e.preventDefault();
    messageDiv.textContent = '';
    messageDiv.style.display = 'block';

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value.trim();

    if (!username || !password || !email) {
        messageDiv.textContent = 'All fields are required!';
        messageDiv.style.color = 'red';
        return;
    }

    try {
        const res = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, email })
        });
        const data = await res.json();
        if (res.ok) {
            messageDiv.textContent = data.message;
            messageDiv.style.color = 'green';
            form.reset();
        } else {
            messageDiv.textContent = data.error || 'Registration failed.';
            messageDiv.style.color = 'red';
        }
    } catch (err) {
        messageDiv.textContent = 'An error occurred.';
        messageDiv.style.color = 'red';
    }
}); 