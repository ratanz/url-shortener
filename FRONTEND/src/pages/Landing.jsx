"use client"

import { useState } from "react"
import { Copy, Link, Loader2 } from "lucide-react"
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "motion/react"

const Landing = () => {
  const [url, setUrl] = useState("")
  const [shortUrl, setShortUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setShortUrl("")
    try {
      const response = await fetch("http://localhost:3000/api/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to shorten URL")
      }
      const data = await response.text()
      setShortUrl(data)
    } catch (err) {
      setError(err.message)
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.3,
      },
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  }

  const formVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.4,
      },
    },
  }

  const buttonVariants = {
    idle: { scale: 1 },
    hover: {
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1,
      },
    },
    loading: {
      scale: [1, 1.02, 1],
      transition: {
        duration: 1,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  const inputVariants = {
    focus: {
      scale: 1.02,
      transition: {
        duration: 0.2,
      },
    },
    blur: {
      scale: 1,
      transition: {
        duration: 0.2,
      },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black p-4"
    >
      {/* Enhanced background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-zinc-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </div>

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
            initial={{ opacity: 0, y: 20 }}
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
            <div className="space-y-4">
              <motion.div className="relative" variants={inputVariants} whileFocus="focus" initial="blur">
                <motion.input
                  type="url"
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl px-6 py-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                  placeholder="Enter your URL here..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                  whileFocus={{
                    borderColor: "rgba(113, 113, 122, 0.5)",
                    boxShadow: "0 0 0 3px rgba(113, 113, 122, 0.1)",
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
                  className="ml-4 p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-200"
                  title="Copy to clipboard"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={copied ? { scale: [1, 1.2, 1], rotate: [0, 10, 0] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <Copy
                      className={`w-5 h-5 ${copied ? "text-green-400" : "text-white"} transition-colors duration-200`}
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
    </motion.div>
  )
}

export default Landing
