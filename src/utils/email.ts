import nodemailer, { Transporter } from "nodemailer";
import { IUser } from "./interfaces.js";

interface EmailOptions {
    to: string;
    subject: string;
    html: string
}

const createTransporter = (): Transporter => {
    return nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })
}

const sendWelcomeEmail = async (user: IUser): Promise<void> => {
    const transporter = createTransporter();

    // Email content
    const emailContent = `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <h2>Hi ${user.fullName},</h2>
            <p>Welcome to <strong>Acrilic</strong>! We’re thrilled to have you join our vibrant community of artists, creators, and art lovers. Whether you’re an aspiring artist, a seasoned professional, or an art enthusiast, Acrilic is here to help you showcase your talent, connect with like-minded creators, and grow your artistic journey.</p>

            <h3>Acrilic is more than just a platform—it’s a thriving ecosystem designed to empower artists like you. Here’s what you can do to get started:</h3>
            <ul>
                <li><strong>Create Your Artist Profile:</strong> Add your bio, profile picture, and social links to let the world know who you are.</li>
                <li><strong>Showcase Your Art:</strong> Upload your artwork to your gallery, organize it into collections, and share it with our community.</li>
                <li><strong>Connect & Collaborate:</strong> Follow other artists, join discussions in our forums, and explore collaboration opportunities.</li>
                <li><strong>Monetize Your Talent:</strong> Set up your shop to sell your artwork, offer digital downloads, or take on commissioned projects.</li>
                <li><strong>Discover & Get Inspired:</strong> Explore trending artworks, participate in art challenges, and find inspiration through our AI-powered recommendations.</li>
            </ul>

        <p><strong>Ready to dive in? Let’s get started!</strong></p>
            <a href="${process.env.BASE_URL}/profile/edit" style="background-color: #FF6200; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Complete Your Profile Now</a>

            <p>Explore our platform, upload your first piece of art, and connect with the Acrilic community. We can’t wait to see what you create!</p>

            <h4>Stay Updated:</h4>
            <p>Keep an eye on your inbox for updates on art challenges, events, and exclusive opportunities.</p>
            <h4>Need Help?</h4>
            <p>Check out our <a href="${process.env.BASE_URL}/help">Help Center</a> or reach out to our support team at <a href="mailto:support@acrilic.com">support@acrilic.com</a>.</p>

            <p>We’re so excited to see your creativity come to life on Acrilic. Let’s build something amazing together!</p>
            <p><strong>Happy Creating,</strong><br>The Acrilic Team</p>
            <p><a href="${process.env.BASE_URL}">Website</a> | <a href="https://instagram.com/acrilic">Instagram</a> | <a href="https://twitter.com/acrilic">Twitter</a></p>

            <hr>
            <p style="font-size: 12px; color: #777;">© 2025 Acrilic. All rights reserved.<br><a href="${process.env.BASE_URL}/unsubscribe">Unsubscribe</a></p>
        </div>
    `;

    // Email options
    const mailOptions: EmailOptions = {
        to: user.email,
        subject: '🎨 Welcome to Acrilic – Unleash Your Creativity!',
        html: emailContent,
    };

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            ...mailOptions,
        });
        console.log(`Welcome email sent to ${user.email}`);
    } catch (error) {
        console.error('Error sending welcome email:', error);
        throw new Error('Failed to send welcome email');
    }
};

export default sendWelcomeEmail;