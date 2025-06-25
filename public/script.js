document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value.trim();
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = '';

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
            document.getElementById('registerForm').reset();
        } else {
            messageDiv.textContent = data.error || 'Registration failed.';
            messageDiv.style.color = 'red';
        }
    } catch (err) {
        messageDiv.textContent = 'An error occurred.';
        messageDiv.style.color = 'red';
    }
}); 