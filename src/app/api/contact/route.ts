// /src/app/api/contact/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // --- 1. Create a Nodemailer "transporter" ---
    // This object is what actually connects to Gmail and sends the email.
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_APP_PASSWORD,
      },
    });

    // --- 2. Define the email options ---
    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL, // The email you are sending from
      to: process.env.NODEMAILER_EMAIL,   // The email you want to receive the message at
      subject: `New Message from ${name} via your Website`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <h2>New Contact Form Submission</h2>
          <p>You have received a new message from your website contact form.</p>
          <hr>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Reply-To Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <h3>Message:</h3>
          <p>${message}</p>
        </div>
      `,
    };

    // --- 3. Send the email ---
    const info = await transporter.sendMail(mailOptions);
    
    // --- 4. Log confirmation to the server terminal ---
    console.log('✅ Message sent successfully! Message ID:', info.messageId);

    return NextResponse.json({ message: 'Message sent successfully!' }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
