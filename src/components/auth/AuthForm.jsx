import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function AuthForm({ type, onSubmit }) {
  const isLogin = type === "login";
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm bg-gray-900/70 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-gray-800"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-white font-sora">
        {isLogin ? "Welcome Back 👋" : "Create Account 🚀"}
      </h2>

      {!isLogin && (
        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Ishrat Jahan"
            required
            className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500"
          />
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-300 mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
          className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500"
        />
      </div>

      <div className="mb-6 relative">
        <label className="block text-gray-300 mb-1">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="••••••••"
          required
          className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-10 text-gray-400 hover:text-white"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition"
      >
        {isLogin ? "Login" : "Sign Up"}
      </button>

      <p className="text-center text-gray-400 text-sm mt-4">
        {isLogin ? (
          <>
            Don’t have an account?{" "}
            <a href="/signup" className="text-purple-400 hover:underline">
              Sign Up
            </a>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <a href="/login" className="text-purple-400 hover:underline">
              Login
            </a>
          </>
        )}
      </p>
    </form>
  );
}
