"use client"

import { useState } from "react"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import { User, Loader2, ArrowLeft, Eye, EyeOff, Lock } from "lucide-react"
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "motion/react"
import { 
  containerVariants, 
  itemVariants, 
  iconVariants, 
  formVariants, 
  buttonVariants, 
  inputVariants 
} from "../utils/Animation"
import { loginUser } from "../api/auth.api"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    
    try {
      await loginUser({ email, password })
      // Redirect to home page after successful login
      navigate("/")
    } catch (err) {
      setError(err.message || "Failed to login")
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black p-4"
    >
      {/* Main content */}
      <motion.div className="relative z-10 w-full max-w-md" variants={itemVariants}>
        {/* Header */}
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-lg rounded-2xl mb-4 border border-white/20"
            variants={iconVariants}
            whileHover="hover"
          >
            <User className="w-8 h-8 text-white" />
          </motion.div>

          <motion.h1
            className="text-4xl font-bold mb-2 bg-gradient-to-t from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Login
          </motion.h1>

          <motion.p
            className="text-gray-300 text-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Sign in to access your shortened URLs
          </motion.p>
        </motion.div>

        {/* Form */}
        <motion.form onSubmit={handleSubmit} className="space-y-6" variants={formVariants}>
          <motion.div
            className="backdrop-blur-xl bg-zinc-800/30 p-8 rounded-3xl border border-white/20 shadow-2xl"
            whileHover={{
              scale: 1.01,
              transition: { duration: 0.3 },
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="input-box space-y-4">
              <motion.div className="relative" variants={inputVariants} whileFocus="focus" initial="blur">
                <motion.input
                  type="email"
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  whileFocus={{
                    borderColor: "rgba(113, 113, 122, 0.5)",
                    boxShadow: "0 0 0 3px rgba(113, 113, 122, 0.2)",
                  }}
                />
              </motion.div>

              <motion.div className="relative" variants={inputVariants} whileFocus="focus" initial="blur">
                <motion.input
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  whileFocus={{
                    borderColor: "rgba(113, 113, 122, 0.5)",
                    boxShadow: "0 0 0 3px rgba(113, 113, 122, 0.2)",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-4 text-white/50 hover:text-white transition-colors duration-300"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </motion.div>

              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-zinc-800/90 to-zinc-900/90 text-white px-6 py-4 rounded-2xl font-semibold transition-colors ease-in-out duration-300 hover:from-zinc-800/30 hover:to-zinc-800/50 hover:shadow-sm cursor-pointer flex items-center justify-center gap-2"
                disabled={loading}
                variants={buttonVariants}
                initial="idle"
                whileHover={!loading ? "hover" : "loading"}
                whileTap={!loading ? "tap" : "loading"}
                animate={loading ? "loading" : "idle"}
              >
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      >
                        <Loader2 className="w-5 h-5" />
                      </motion.div>
                      Logging in...
                    </motion.div>
                  ) : (
                    <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      Login
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <div className="text-center mt-4">
                <motion.p
                  className="text-gray-300 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Don't have an account?{" "}
                  <RouterLink
                    to="/register"
                    className="text-white hover:text-gray-200 underline underline-offset-2"
                  >
                    Register
                  </RouterLink>
                </motion.p>
              </div>
            </div>
          </motion.div>
        </motion.form>

        {/* Back to home */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 , duration: 0.6 , ease: "easeOut" }}
        >
          <RouterLink
            to="/"
            className="inline-flex items-center text-gray-300 hover:text-white transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to home
          </RouterLink>
        </motion.div>

        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.div
              className="mt-6 backdrop-blur-xl bg-red-500/10 border border-red-400/30 rounded-3xl p-6"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.9 }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
            >
              <motion.p
                className="text-red-300 text-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {error}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export default Login
