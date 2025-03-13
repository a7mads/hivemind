import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  console.log('API route handler called');
  
  try {
    // Parse the request body
    const body = await request.json();
    console.log('Request body:', body);
    
    const { name, email, phone, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.log('Missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('Creating email transporter with settings:', {
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: process.env.EMAIL_SECURE === 'true',
    });

    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Prepare email content
    const subjectOptions = {
      'home-automation': 'Home Automation Inquiry',
      'smart-lighting': 'Smart Lighting Inquiry',
      'networking': 'Wi-Fi & Networking Inquiry',
      'security': 'Security Systems Inquiry',
      'other': 'General Inquiry',
    };

    const subjectText = subjectOptions[subject as keyof typeof subjectOptions] || 'Website Contact Form';
    
    // Email to send to you
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'website@hivemind.ae',
      to: 'info@hivemind.ae',
      replyTo: email,
      subject: `[Hivemind Contact] ${subjectText}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${subjectText}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        Subject: ${subjectText}
        
        Message:
        ${message}
      `,
    };

    console.log('Sending email with options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    });

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);

    // Optional: Send confirmation email to the user
    if (process.env.SEND_CONFIRMATION === 'true') {
      console.log('Sending confirmation email to user');
      const confirmationMail = {
        from: process.env.EMAIL_FROM || 'info@hivemind.ae',
        to: email,
        subject: 'Thank you for contacting Hivemind',
        html: `
          <h2>Thank you for contacting Hivemind</h2>
          <p>Dear ${name},</p>
          <p>We have received your inquiry and will get back to you as soon as possible.</p>
          <p>Here's a summary of your message:</p>
          <p><strong>Subject:</strong> ${subjectText}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <br>
          <p>Best regards,</p>
          <p>The Hivemind Team</p>
        `,
        text: `
          Thank you for contacting Hivemind
          
          Dear ${name},
          
          We have received your inquiry and will get back to you as soon as possible.
          
          Here's a summary of your message:
          Subject: ${subjectText}
          
          Message:
          ${message}
          
          Best regards,
          The Hivemind Team
        `,
      };
      
      await transporter.sendMail(confirmationMail);
      console.log('Confirmation email sent to user');
    }

    console.log('API route completed successfully');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 