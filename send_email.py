import sys
import smtplib
from email.message import EmailMessage
import traceback
import socket

if len(sys.argv) != 3:
    print('Usage: send_email.py <email> <username>')
    sys.exit(1)

recipient = sys.argv[1]
username = sys.argv[2]

# --- SMTP CONFIGURATION ---
SMTP_SERVER = 'smtp.mail.yahoo.com'
SMTP_PORT = 587
SMTP_USER = 'your_yahoo@yahoo.com'
SMTP_PASS = 'your_app_password'
# --------------------------

print(f"Preparing to send email...")
print(f"SMTP server: {SMTP_SERVER}:{SMTP_PORT}")
print(f"Sender: {SMTP_USER}")
print(f"Recipient: {recipient}")

msg = EmailMessage()
msg['Subject'] = 'Registration Successful'
msg['From'] = SMTP_USER
msg['To'] = recipient
msg.set_content(f'Hello {username},\n\nThank you for registering! Your account has been created.\n')

try:
    print("Connecting to SMTP server...")
    with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
        print("Starting TLS...")
        server.starttls()
        print("Logging in...")
        server.login(SMTP_USER, SMTP_PASS)
        print("Sending email...")
        server.send_message(msg)
        print("Email sent successfully!")
except Exception as e:
    print(f'Failed to send email: {e}')
    traceback.print_exc()
    sys.exit(1) 