import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Add CORS headers helper function
function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function POST(request: NextRequest) {
  console.log('API route handler called');
  
  try {
    // Parse the request body based on content type
    let body;
    const contentType = request.headers.get('content-type') || '';
    
    if (contentType.includes('application/json')) {
      body = await request.json();
      console.log('Parsed JSON request body:', body);
    } else {
      // Handle form data
      const formData = await request.formData();
      body = Object.fromEntries(formData.entries());
      console.log('Parsed form data request body:', body);
    }
    
    const { name, email, phone, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.log('Missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400, headers: corsHeaders() }
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
    
    // Format the from field with a display name
    const fromEmail = process.env.EMAIL_FROM || 'info@hivemind.ae';
    const formattedFrom = `Hivemind <${fromEmail}>`;
    
    // Email to send to you (admin notification)
    const mailOptions = {
      from: formattedFrom,
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
        <p>${message.toString().replace(/\n/g, '<br>')}</p>
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

    console.log('Sending admin notification email with options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    });

    // Send the email to admin
    const info = await transporter.sendMail(mailOptions);
    console.log('Admin notification email sent successfully:', info.messageId);

    // Always send confirmation email to the user (unless explicitly disabled)
    const sendConfirmation = process.env.SEND_CONFIRMATION !== 'false';
    
    if (sendConfirmation) {
      console.log('Sending confirmation email to user:', email);
      const confirmationMail = {
        from: formattedFrom,
        to: email,
        subject: 'Thank you for contacting Hivemind',
        html: `
          <h2>Thank you for contacting Hivemind</h2>
          <p>Dear ${name},</p>
          <p>We have received your inquiry and will get back to you as soon as possible.</p>
          <p>Here's a summary of your message:</p>
          <p><strong>Subject:</strong> ${subjectText}</p>
          <p><strong>Message:</strong></p>
          <p>${message.toString().replace(/\n/g, '<br>')}</p>
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
      console.log('Confirmation email sent to user successfully');
    }

    // Determine if this is a form submission or API call
    const isFormSubmission = !contentType.includes('application/json');
    
    if (isFormSubmission) {
      // For traditional form submissions, redirect back to the homepage with a success parameter
      return NextResponse.redirect(new URL('/?success=true', request.url), { 
        headers: corsHeaders() 
      });
    }

    console.log('API route completed successfully');
    return NextResponse.json({ success: true }, { headers: corsHeaders() });
  } catch (error) {
    console.error('Error sending email:', error);
    
    // Check if this was a form submission
    const contentType = request.headers.get('content-type') || '';
    const isFormSubmission = !contentType.includes('application/json');
    
    if (isFormSubmission) {
      // For traditional form submissions, redirect back with an error parameter
      return NextResponse.redirect(new URL('/?error=true', request.url), { 
        headers: corsHeaders() 
      });
    }
    
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500, headers: corsHeaders() }
    );
  }
} 