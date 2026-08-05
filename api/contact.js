const LIMITS = {
  name: 120,
  company: 160,
  phone: 40,
  email: 254,
  service: 120,
  message: 4000
};

const SMTP_USER = process.env.SMTP_USER || 'helpdesk.i2it@gmail.com';

function clean(value, limit) {
  return String(value ?? '').trim().slice(0, limit);
}

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[character]));
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function buildMessage(contact, smtpMode) {
  const safe = Object.fromEntries(Object.entries(contact).map(([key, value]) => [key, escapeHtml(value || '-')])) ;
  return {
    from: smtpMode
      ? (process.env.SMTP_FROM || 'POWPACKER Website <' + SMTP_USER + '>')
      : (process.env.RESEND_FROM || 'POWPACKER Website <noreply@powpacker.com>'),
    to: 'info@powpacker.com',
    replyTo: contact.email,
    subject: 'New enquiry from ' + contact.name,
    html: [
      '<h2>New Website Enquiry</h2>',
      '<p><strong>Name:</strong> ' + safe.name + '</p>',
      '<p><strong>Company:</strong> ' + safe.company + '</p>',
      '<p><strong>Phone:</strong> ' + safe.phone + '</p>',
      '<p><strong>Email:</strong> ' + safe.email + '</p>',
      '<p><strong>Service:</strong> ' + safe.service + '</p>',
      '<p><strong>Message:</strong></p>',
      '<p>' + safe.message.replace(/\n/g, '<br>') + '</p>'
    ].join(''),
    text: 'Name: ' + contact.name + '\nCompany: ' + (contact.company || '-') + '\nPhone: ' + (contact.phone || '-') + '\nEmail: ' + contact.email + '\nService: ' + (contact.service || '-') + '\nMessage:\n' + contact.message
  };
}

async function sendWithSmtp(message) {
  const nodemailerModule = await import('nodemailer');
  const nodemailer = nodemailerModule.default || nodemailerModule;
  const port = Number(process.env.SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465,
    auth: { user: SMTP_USER, pass: process.env.SMTP_PASS }
  });
  return transporter.sendMail({ ...message, replyTo: message.replyTo });
}

async function sendWithResend(message) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + process.env.RESEND_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: message.from,
      to: [message.to],
      reply_to: message.replyTo,
      subject: message.subject,
      html: message.html,
      text: message.text
    })
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error('Resend rejected the request');
  return { id: result.id, provider: 'resend' };
}

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  } catch {
    return res.status(400).json({ error: 'ข้อมูลไม่ถูกต้อง' });
  }

  const contact = {
    name: clean(body.name, LIMITS.name),
    company: clean(body.company, LIMITS.company),
    phone: clean(body.phone, LIMITS.phone),
    email: clean(body.email, LIMITS.email).toLowerCase(),
    service: clean(body.service, LIMITS.service),
    message: clean(body.message, LIMITS.message)
  };

  if (clean(body.website, 120)) {
    return res.status(400).json({ error: 'ไม่สามารถส่งข้อมูลได้' });
  }

  if (!contact.name || !contact.email || !contact.message) {
    return res.status(400).json({ error: 'กรุณากรอกชื่อ อีเมล และรายละเอียดโครงการ' });
  }

  if (!isEmail(contact.email)) {
    return res.status(400).json({ error: 'กรุณากรอกอีเมลให้ถูกต้อง' });
  }

  const smtpConfigured = Boolean(process.env.SMTP_USER || process.env.SMTP_PASS || process.env.SMTP_HOST);
  if ((smtpConfigured && !process.env.SMTP_PASS) || (!smtpConfigured && !process.env.RESEND_API_KEY)) {
    return res.status(503).json({ error: 'ระบบอีเมลยังไม่ได้ตั้งค่า' });
  }

  try {
    const message = buildMessage(contact, smtpConfigured);
    const result = smtpConfigured
      ? await sendWithSmtp(message)
      : await sendWithResend(message);
    return res.status(200).json({ ok: true, id: result.messageId || result.id || null, provider: result.provider });
  } catch {
    return res.status(502).json({ error: 'ส่งอีเมลไม่สำเร็จ' });
  }
}
