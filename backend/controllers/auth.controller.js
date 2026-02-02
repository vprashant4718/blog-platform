import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'


export const register = async (req, res) => {
    try {
        
        const { name, email, password, role } = req.body;
        // console.log(name);
        // console.log(email);

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword, role });
        await user.save();
        res.status(201).json({ message: 'User registered' });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Set secure cookie
    res.cookie("token", token, {
      httpOnly: true,         
      secure: process.env.NODE_ENV === "production", // HTTPS only in prod
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",     
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });


    res.status(200).json({
      user,
      message: "Login successful",
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const logout = (req, res) => {
   res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false
  });

  res.status(200).json({ message: "Logged out" });
};
