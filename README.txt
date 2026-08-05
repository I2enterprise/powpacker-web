POWPACKER Website - Vercel deployment

1. Import this folder (or the ZIP contents) into Vercel.
2. In Vercel Project Settings > Environment Variables, add:
   SMTP_USER=helpdesk.i2it@gmail.com
   SMTP_PASS=<new Gmail App Password>
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_SECURE=true
   SMTP_FROM=POWPACKER Website <helpdesk.i2it@gmail.com>
3. Redeploy after saving the variables.

The contact form posts to /api/contact. Gmail SMTP sends messages to info@powpacker.com and uses the visitor email as Reply-To.
RESEND_API_KEY remains supported as a fallback when SMTP variables are not configured.
Never place SMTP_PASS or an API key in source code or this ZIP.
