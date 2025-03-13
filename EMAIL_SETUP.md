# Email Setup for Hivemind Contact Form

This document provides instructions on how to set up the email functionality for the Hivemind contact form.

## Prerequisites

- A custom email domain (info@hivemind.ae)
- SMTP server credentials for your email provider

## Configuration

1. Update the `.env.local` file with your email provider's SMTP settings:

```
# Email Configuration
EMAIL_HOST=your-smtp-server.example.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-username
EMAIL_PASSWORD=your-password
EMAIL_FROM=info@hivemind.ae
SEND_CONFIRMATION=false
```

### Configuration Options

- `EMAIL_HOST`: Your SMTP server hostname (e.g., smtp.gmail.com, smtp.office365.com)
- `EMAIL_PORT`: SMTP port (typically 587 for TLS or 465 for SSL)
- `EMAIL_SECURE`: Set to 'true' if using port 465 (SSL), 'false' for port 587 (TLS)
- `EMAIL_USER`: Your email username/address
- `EMAIL_PASSWORD`: Your email password or app password
- `EMAIL_FROM`: The sender email address (typically info@hivemind.ae)
- `SEND_CONFIRMATION`: Set to 'true' to send confirmation emails to users who submit the form

## Common SMTP Settings

### Gmail

```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
```

Note: For Gmail, you'll need to use an "App Password" if you have 2-factor authentication enabled.

### Office 365

```
EMAIL_HOST=smtp.office365.com
EMAIL_PORT=587
EMAIL_SECURE=false
```

### GoDaddy

```
EMAIL_HOST=smtpout.secureserver.net
EMAIL_PORT=587
EMAIL_SECURE=false
```

### cPanel

```
EMAIL_HOST=mail.yourdomain.com
EMAIL_PORT=587
EMAIL_SECURE=false
```

## Testing

After configuring your email settings, you can test the contact form by:

1. Starting the development server: `npm run dev`
2. Navigating to the contact form
3. Submitting a test message

You should receive the email at info@hivemind.ae.

## Troubleshooting

If emails are not being sent:

1. Check your SMTP credentials in the `.env.local` file
2. Verify that your email provider allows SMTP access
3. Some email providers require specific security settings or app passwords
4. Check the server logs for any error messages

## Security Considerations

- Never commit your `.env.local` file to version control
- Consider using environment variables in your hosting platform instead of `.env.local` in production
- Regularly rotate your email passwords
- Use the minimum permissions necessary for your email account 