"use client"

import { useState, useEffect } from "react"
import { Link as RouterLink } from "react-router-dom"
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "motion/react"
import { ArrowLeft, Loader2, User, Mail, Lock, Eye, EyeOff, Save } from "lucide-react"
import { 
  containerVariants, 
  itemVariants, 
  formVariants,
  buttonVariants,
  inputVariants
} from "../utils/Animation"
import { getUserProfile, updateUserProfile } from "../api/auth.api"

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  })
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true)
        const response = await getUserProfile()
        console.log('Profile response:', response)
        
        // Handle different response formats
        if (response && response.success && response.data) {
          // Format with success flag and data property
          setUser({
            name: response.data.name,
            email: response.data.email,
            password: ""
          })
        } else if (response && response.data) {
          // Standard format with data property
          setUser({
            name: response.data.name,
            email: response.data.email,
            password: ""
          })
        } else if (response && response.name && response.email) {
          // Direct user object format
          setUser({
            name: response.name,
            email: response.email,
            password: ""
          })
        } else {
          console.warn('Unexpected profile response format:', response)
          // Try to extract from localStorage as fallback
          const storedUser = JSON.parse(localStorage.getItem('user') || '{}')
          if (storedUser && storedUser.name && storedUser.email) {
            setUser({
              name: storedUser.name,
              email: storedUser.email,
              password: ""
            })
          }
        }
        
        setLoading(false)
      } catch (error) {
        console.error('Error fetching profile:', error)
        setError(error.message || "Failed to load your profile. Please try again later.")
        setLoading(false)
      }
    }

    fetchUserProfile()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUpdating(true)
    setError("")
    setSuccess("")

    try {
      console.log('Updating profile with data:', { ...user, password: user.password ? '***' : '' })
      
      // Only send non-empty fields
      const updateData = {}
      if (user.name) updateData.name = user.name
      if (user.email) updateData.email = user.email
      if (user.password) updateData.password = user.password

      const response = await updateUserProfile(updateData)
      console.log('Profile update response:', response)
      
      // Handle different response formats
      if (response && response.success) {
        setSuccess(response.message || "Profile updated successfully!")
        if (response.user) {
          setUser({
            name: response.user.name,
            email: response.user.email,
            password: ""
          })
        }
      } else if (response && response.message) {
        setSuccess(response.message)
        // Try to get updated user data
        if (response.user || response.data) {
          const updatedUser = response.user || response.data
          setUser({
            name: updatedUser.name || user.name,
            email: updatedUser.email || user.email,
            password: ""
          })
        }
      } else {
        setSuccess("Profile updated successfully!")
      }
      
      setUpdating(false)
    } catch (err) {
      console.error('Profile update error:', err)
      setError(err.message || "Failed to update profile. Please try again.")
      setUpdating(false)
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black p-4"
    >
      <motion.div className="relative z-10 w-full max-w-md" variants={itemVariants}>
        {/* Header */}
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <motion.div
            className="inline-flex items-center justify-center p-3 bg-white/5 backdrop-blur-xl rounded-full mb-4"
            variants={itemVariants}
          >
            <User className="w-6 h-6 text-white" />
          </motion.div>
          <motion.h1
            className="text-3xl font-bold text-white mb-2"
            variants={itemVariants}
          >
            Your Profile
          </motion.h1>
          <motion.p
            className="text-white/70 max-w-md mx-auto"
            variants={itemVariants}
          >
            Update your personal information
          </motion.p>
        </motion.div>

        {/* Back to home */}
        <motion.div
          className="absolute -bottom-20 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1, ease: "easeOut" }}
        >
          <RouterLink
            to="/"
            className="inline-flex items-center text-gray-300 hover:text-white transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to home
          </RouterLink>
        </motion.div>

        {/* Profile Form */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-white/50 animate-spin" />
          </div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            variants={formVariants}
          >
            <motion.div variants={inputVariants}>
              <label className="block text-white/70 text-sm mb-2" htmlFor="name">
                Name
              </label>
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={user.name}
                  onChange={handleChange}
                  className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3 pl-10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/20"
                  placeholder="Your name"
                />
                <User className="absolute left-3 top-3.5 w-4 h-4 text-white/50" />
              </div>
            </motion.div>

            <motion.div variants={inputVariants}>
              <label className="block text-white/70 text-sm mb-2" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={user.email}
                  onChange={handleChange}
                  className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3 pl-10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/20"
                  placeholder="Your email"
                />
                <Mail className="absolute left-3 top-3.5 w-4 h-4 text-white/50" />
              </div>
            </motion.div>

            <motion.div variants={inputVariants}>
              <label className="block text-white/70 text-sm mb-2" htmlFor="password">
                New Password (leave empty to keep current)
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={user.password}
                  onChange={handleChange}
                  className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3 pl-10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/20"
                  placeholder="New password"
                />
                <Lock className="absolute left-3 top-3.5 w-4 h-4 text-white/50" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-white/50 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </motion.div>

            <motion.button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-white/10 backdrop-blur-xl py-3 rounded-xl text-white transition-colors duration-300 hover:bg-white/20"
              variants={buttonVariants}
              disabled={updating}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {updating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Update Profile
                </>
              )}
            </motion.button>

            {/* Error message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  className="backdrop-blur-xl bg-red-500/10 border border-red-400/30 rounded-xl p-4"
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
                  <p className="text-red-300 text-sm">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success message */}
            <AnimatePresence>
              {success && (
                <motion.div
                  className="backdrop-blur-xl bg-emerald-500/10 border border-emerald-400/30 rounded-xl p-4"
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
                  <p className="text-emerald-300 text-sm">{success}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        )}
      </motion.div>
    </motion.div>
  )
}

export default Profile
