
import User from "../../User.js";
import bcrypt from "bcryptjs";

const otpStore = {}; //otp store krne ke liye
const verifiedEmails = new Set();

// send otp
export const sendOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
        return res.status(404).json({ message: "Email not registered" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    otpStore[normalizedEmail] = otp;

    console.log("OTP :", otp, "for", normalizedEmail);

    res.json({message: "OTP sent successfully"});
};

// Verify Otp
export const verifyOtp = (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ success: false, message: "Email and OTP are required" });
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (otpStore[normalizedEmail] == otp) {
        delete otpStore[normalizedEmail];
        verifiedEmails.add(normalizedEmail);
        return res.json({success: true, message: "OTP verified"})
    }

    res.status(400).json({success: false, message: "Invalid OTP"})
};

export const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        if (!email || !newPassword) {
            return res.status(400).json({ message: "Email and new password are required" });
        }

        const normalizedEmail = email.trim().toLowerCase();

        if (!verifiedEmails.has(normalizedEmail)) {
            return res.status(403).json({ message: "OTP verification required" });
        }

        if (newPassword.length < 12) {
            return res.status(400).json({ message: "Password must be at least 12 characters long" });
        }

        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            return res.status(404).json({ message: "Email not registered" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        verifiedEmails.delete(normalizedEmail);

        return res.json({ success: true, message: "Password updated successfully" });
    } catch (error) {
        console.error("Reset password error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
