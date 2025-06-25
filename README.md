# Register_form
application

# Simple Registration Form

This project is a simple registration form using HTML, CSS, JavaScript, Node.js (Express), Python, and SQLite. After registration, a verification email is sent to the user.

## Setup

1. **Install dependencies:**
   - Node.js: `npm install express body-parser sqlite3`
   - Python: No extra packages needed (uses standard library)

2. **Configure SMTP:**
   - Edit `send_email.py` and set your SMTP server, port, email, and password.

3. **Run the server:**
   ```sh
   node server.js
   ```

4. **Open the app:**
   - Go to [http://localhost:3000](http://localhost:3000) in your browser.

## Files
- `public/` - Frontend files (HTML, CSS, JS)
- `server.js` - Express backend
- `send_email.py` - Python script to send verification email
- `users.db` - SQLite database (auto-created)

## Notes
- Passwords are stored in plain text for demo purposes. For production, always hash passwords!
- Use a real SMTP server for email delivery.
