import sys
import smtplib
from email.message import EmailMessage

if len(sys.argv) != 3:
    print('Usage: send_email.py <email> <username>')
    sys.exit(1)

recipient = sys.argv[1]
username = sys.argv[2]

# --- SMTP CONFIGURATION ---
SMTP_SERVER = 'smtp.example.com'  # Replace with your SMTP server
SMTP_PORT = 587
SMTP_USER = 'your_email@gmail.com'  # Replace with your email
SMTP_USER = 'your_email@yahoomail.com'  # Replace with your email
SMTP_PASS = 'your_password'           # Replace with your password
# --------------------------

msg = EmailMessage()
msg['Subject'] = 'Registration Successful'
msg['From'] = SMTP_USER
msg['To'] = recipient
msg.set_content(f'Hello {username},\n\nThank you for registering! Your account has been created.\n')

try:
    with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
        server.starttls()
        server.login(SMTP_USER, SMTP_PASS)
        server.send_message(msg)
except Exception as e:
    print(f'Failed to send email: {e}')
    sys.exit(1) 