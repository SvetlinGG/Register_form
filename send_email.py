import sys
import smtplib
from email.message import EmailMessage
import traceback

if len(sys.argv) != 6:
    print('Usage: send_email.py <provider: gmail|yahoo> <sender_email> <sender_app_password> <recipient_email> <username>')
    sys.exit(1)

provider = sys.argv[1].lower()
sender_email = sys.argv[2]
sender_pass = sys.argv[3]
recipient = sys.argv[4]
username = sys.argv[5]

if provider == 'gmail':
    SMTP_SERVER = 'smtp.gmail.com'
    SMTP_PORT = 587
elif provider == 'yahoo':
    SMTP_SERVER = 'smtp.mail.yahoo.com'
    SMTP_PORT = 587
else:
    print('Unsupported provider. Use "gmail" or "yahoo".')
    sys.exit(1)

print(f"Preparing to send email...")
print(f"Provider: {provider}")
print(f"SMTP server: {SMTP_SERVER}:{SMTP_PORT}")
print(f"Sender: {sender_email}")
print(f"Recipient: {recipient}")

msg = EmailMessage()
msg['Subject'] = 'Registration Successful'
msg['From'] = sender_email
msg['To'] = recipient
msg.set_content(f'Hello {username},\n\nThank you for registering! Your account has been created.\n')

try:
    print("Connecting to SMTP server...")
    with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
        print("Starting TLS...")
        server.starttls()
        print("Logging in...")
        server.login(sender_email, sender_pass)
        print("Sending email...")
        server.send_message(msg)
        print("Email sent successfully!")
except Exception as e:
    print(f'Failed to send email: {e}')
    traceback.print_exc()
    sys.exit(1) 