import nodemailer, { Transporter } from "nodemailer";
import { IUser } from "../types/user.js";

interface EmailOptions {
    to: string;
    subject: string;
    html: string;
}

export const createTransporter = (): Transporter => {
    return nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
};

const sendWelcomeEmail = async (user: IUser): Promise<void> => {
    const transporter = createTransporter();

    // Email content
    const emailContent = `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <h2>Hi ${user.fullName},</h2>
            <p>Welcome to <strong>Acrilc</strong>! We’re thrilled to have you join our vibrant community of artists, creators, and art lovers. Whether you’re an aspiring artist, a seasoned professional, or an art enthusiast, Acrilc is here to help you showcase your talent, connect with like-minded creators, and grow your artistic journey.</p>

            <h3>Acrilc is more than just a platform—it’s a thriving ecosystem designed to empower artists like you. Here’s what you can do to get started:</h3>
            <ul>
                <li><strong>Create Your Artist Profile:</strong> Add your bio, profile picture, and social links to let the world know who you are.</li>
                <li><strong>Showcase Your Art:</strong> Upload your artwork to your gallery, organize it into collections, and share it with our community.</li>
                <li><strong>Connect & Collaborate:</strong> Follow other artists, join discussions in our forums, and explore collaboration opportunities.</li>
                <li><strong>Monetize Your Talent:</strong> Set up your shop to sell your artwork, offer digital downloads, or take on commissioned projects.</li>
                <li><strong>Discover & Get Inspired:</strong> Explore trending artworks, participate in art challenges, and find inspiration through our AI-powered recommendations.</li>
            </ul>

        <p><strong>Ready to dive in? Let’s get started!</strong></p>
            <a href="${process.env.BASE_URL}/auth/username" style="background-color: #FF6200; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Complete Your Profile Now</a>

            <p>Explore our platform, upload your first piece of art, and connect with the Acrilc community. We can’t wait to see what you create!</p>

            <h4>Stay Updated:</h4>
            <p>Keep an eye on your inbox for updates on art challenges, events, and exclusive opportunities.</p>
            <h4>Need Help?</h4>
            <p>Check out our <a href="${process.env.BASE_URL}/help">Help Center</a> or reach out to our support team at <a href="mailto:support@Acrilc.com">support@Acrilc.com</a>.</p>

            <p>We’re so excited to see your creativity come to life on Acrilc. Let’s build something amazing together!</p>
            <p><strong>Happy Creating,</strong><br>The Acrilc Team</p>
            <p>
                <a href="${process.env.BASE_URL}">Website</a> | 
                <a href="https://www.instagram.com/theacrilc?igsh=NjRndzAydDdqcnF0">Instagram</a> | 
                <a href="https://www.linkedin.com/company/acrilc/">Linkedin</a> | 
                <a href="https://pin.it/2LBlIjfr6">Pinterest</a>
            </p>

            <hr>
            <p style="font-size: 12px; color: #777;">© 2025 Acrilc. All rights reserved.<br><a href="${process.env.BASE_URL}/unsubscribe">Unsubscribe</a></p>
        </div>
    `;

    // Email options
    const mailOptions: EmailOptions = {
        to: user.email,
        subject: "🎨 Welcome to Acrilc – Unleash Your Creativity!",
        html: emailContent,
    };

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            ...mailOptions,
        });
        console.log(`Welcome email sent to ${user.email}`);
    } catch (error) {
        console.error("Error sending welcome email:", error);
        throw new Error("Failed to send welcome email");
    }
};

const sendPasswordResetEmail = async (user: IUser, resetToken: string): Promise<void> => {
    const transporter = createTransporter();

    const resetUrl = `${process.env.BASE_URL}/reset-password/${resetToken}`;

    const emailContent = `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <h2>Hi ${user.fullName},</h2>
            <p>We received a request to reset your password for your Acrilc account.</p>
            <p>Click the button below to reset your password:</p>
            <a href="${resetUrl}" style="display:inline-block; background-color: #FF6200; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px;">Reset Your Password</a>
            <p>If you didn’t request this, you can safely ignore this email. Your password won’t be changed.</p>
            <br>
            <p>For security, this link will expire in 15 minutes.</p>
            <p>Need help? Contact us at <a href="mailto:support@Acrilc.com">support@Acrilc.com</a>.</p>

            <hr>
            <p style="font-size: 12px; color: #777;">© 2025 Acrilc. All rights reserved.<br><a href="${process.env.BASE_URL}/unsubscribe">Unsubscribe</a></p>
        </div>
    `;

    const mailOptions: EmailOptions = {
        to: user.email,
        subject: "🔐 Reset Your Acrilc Password",
        html: emailContent,
    };

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            ...mailOptions,
        });
        console.log(`Password reset email sent to ${user.email}`);
    } catch (error) {
        console.error("Error sending password reset email:", error);
        throw new Error("Failed to send password reset email");
    }
};

export { sendWelcomeEmail, sendPasswordResetEmail };
