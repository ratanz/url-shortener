"use client"

import { useState, useEffect } from "react"
import { Copy, Link, Loader2, Github, Twitter, LogIn, UserPlus, LogOut } from "lucide-react"
import { Link as RouterLink } from "react-router-dom"

// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "motion/react"
import { 
  containerVariants, 
  itemVariants, 
  iconVariants, 
  formVariants, 
  buttonVariants, 
  inputVariants } from "../utils/Animation"
import { createShortUrl } from "../api/shortUrl.api"
import { isAuthenticated, getCurrentUser, logoutUser } from "../api/auth.api"
import Footer from "../components/Footer"
import UserDropdown from "../components/UserDropdown"

const Landing = () => {
  const [url, setUrl] = useState("")
  const [shortUrl, setShortUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  
  // Check authentication status on component mount
  useEffect(() => {
    setIsLoggedIn(isAuthenticated())
    setUser(getCurrentUser())
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setShortUrl("")
    try {
      const shortUrl = await createShortUrl(url)
      setShortUrl(shortUrl)  
    } catch (err) {
      setError(err.response?.data?.error || err.message || "Failed to shorten URL")
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }
  
  const handleLogout = () => {
    logoutUser()
    setIsLoggedIn(false)
    setUser(null)
  }


  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black p-4"
    >
      {/* Auth buttons */}
        <motion.div 
          className="flex absolute top-4 right-4 gap-2 "
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <UserDropdown user={user} />
              <motion.button
                onClick={handleLogout}
                className="flex items-center gap-1 bg-white/10 backdrop-blur-xl px-3 py-1.5 rounded-xl text-sm text-white transition-colors duration-300 cursor-pointer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </motion.button>
            </div>
          ) : (
            <>
              <RouterLink to="/login">
                <motion.button
                  className="flex items-center gap-1 bg-zinc/10 backdrop-blur-xl  px-3 py-1.5 rounded-xl text-sm text-white transition-colors duration-300 cursor-pointer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </motion.button>
              </RouterLink>
              <RouterLink to="/register">
                <motion.button
                  className="flex items-center gap-1 bg-zinc/10 backdrop-blur-xl px-3 py-1.5 rounded-xl text-sm text-white transition-colors duration-300 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <UserPlus className="w-4 h-4" />
                  Register
                </motion.button>
              </RouterLink>
            </>
          )}
        </motion.div>
      
      {/* Main content */}
      <motion.div className="relative z-10 w-full max-w-md" variants={itemVariants}>
        {/* Header */}
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-lg rounded-2xl mb-4 border border-white/20"
            variants={iconVariants}
            whileHover="hover"
          >
            <Link className="w-8 h-8 text-white" />
          </motion.div>

          <motion.h1
            className="text-4xl font-bold mb-2 bg-gradient-to-t from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            URL Shortener
          </motion.h1>

          <motion.p
            className="text-gray-300 text-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Transform your long URLs into short, shareable links
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
                  type="url"
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                  placeholder="Enter your URL here..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                  whileFocus={{
                    borderColor: "rgba(113, 113, 122, 0.5)",
                    boxShadow: "0 0 0 3px rgba(113, 113, 122, 0.2)",
                  }}
                />
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
                      Shortening...
                    </motion.div>
                  ) : (
                    <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      Shorten URL
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </motion.div>
        </motion.form>

        {/* Success result */}
        <AnimatePresence>
          {shortUrl && (
            <motion.div
              className="mt-6 backdrop-blur-xl bg-green-500/10 border border-green-400/30 rounded-3xl p-6"
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
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <motion.p
                    className="text-green-300 text-sm font-medium mb-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Your shortened URL:
                  </motion.p>
                  <motion.a
                    href={shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-green-300 transition-colors duration-200 break-all"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    {shortUrl}
                  </motion.a>
                </div>
             
                <motion.button
                  onClick={copyToClipboard}
                  className="ml-4 p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300"
                  title="Copy to clipboard"
                  transition={{ type: "spring", stiffness: 10 , damping : 10, }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={copied ? { scale: [1, 1.3, 1], rotate: [0, 15, 0] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <Copy
                      className={`w-5 h-5 ${copied ? "text-green-400" : "text-white"} transition-colors duration-300`}
                    />
                  </motion.div>
                </motion.button>
                
              </div>
              <AnimatePresence>
                {copied && (
                  <motion.p
                    className="text-green-400 text-xs mt-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    Copied to clipboard!
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

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
      <Footer />
    </motion.div>
  )
}

export default Landing
