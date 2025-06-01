"use client"

import { useState, useEffect } from "react"
import { Link as RouterLink } from "react-router-dom"
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "motion/react"
import { ArrowLeft, Loader2, Copy, ExternalLink, Calendar, Link } from "lucide-react"
import { 
  containerVariants, 
  itemVariants, 
  formVariants
} from "../utils/Animation"
import { getUserUrls } from "../api/auth.api"
import { formatDistanceToNow, isValid } from "date-fns"

// Helper function to safely format dates
const safeFormatDate = (dateString) => {
  try {
    if (!dateString) return 'Recently created';
    
    const date = new Date(dateString);
    if (!isValid(date)) return 'Recently created';
    
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (error) {
    console.error('Date formatting error:', error);
    return 'Recently created';
  }
}

const UserUrls = () => {
  const [urls, setUrls] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [copiedId, setCopiedId] = useState(null)

  useEffect(() => {
    const fetchUserUrls = async () => {
      try {
        setLoading(true)
        const response = await getUserUrls()
        console.log('UserUrls response:', response)
        
        // Handle different response formats
        if (response.data) {
          setUrls(response.data)
        } else if (Array.isArray(response)) {
          setUrls(response)
        } else if (response.success && Array.isArray(response.data)) {
          setUrls(response.data)
        } else {
          console.warn('Unexpected response format:', response)
          setUrls([])
        }
        
        setLoading(false)
      } catch (error) {
        console.error('Error fetching URLs:', error)
        setError(error.message || "Failed to load your URLs. Please try again later.")
        setLoading(false)
      }
    }

    fetchUserUrls()
  }, [])

  const handleCopy = (shortUrl, id) => {
    navigator.clipboard.writeText(`http://localhost:3000/${shortUrl}`)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black p-4"
    >
      <motion.div className="relative z-10 w-full max-w-3xl" variants={itemVariants}>
        {/* Header */}
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <motion.div
            className="inline-flex items-center justify-center p-3 bg-white/5 backdrop-blur-xl rounded-full mb-4"
            variants={itemVariants}
          >
            <Link className="w-6 h-6 text-white" />
          </motion.div>
          <motion.h1
            className="text-3xl font-bold text-white mb-2"
            variants={itemVariants}
          >
            Your URLs
          </motion.h1>
          <motion.p
            className="text-white/70 max-w-md mx-auto"
            variants={itemVariants}
          >
            Manage all your shortened URLs in one place
          </motion.p>
        </motion.div>

        {/* Back to home */}
        <motion.div
          className="absolute top-4 left-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <RouterLink
            to="/"
            className="inline-flex items-center text-gray-300 hover:text-white transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to home
          </RouterLink>
        </motion.div>

        {/* URLs List */}
        <motion.div
          className="w-full"
          variants={formVariants}
        >
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 text-white/50 animate-spin" />
            </div>
          ) : error ? (
            <motion.div
              className="backdrop-blur-xl bg-red-500/10 border border-red-400/30 rounded-3xl p-6 text-center"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
            >
              <p className="text-red-300">{error}</p>
            </motion.div>
          ) : urls.length === 0 ? (
            <motion.div
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 text-center"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
            >
              <p className="text-white/70 mb-4">You haven't created any shortened URLs yet.</p>
              <RouterLink to="/">
                <motion.button
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-xl text-sm text-white transition-colors duration-300 cursor-pointer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Create your first URL
                </motion.button>
              </RouterLink>
            </motion.div>
          ) : (
            <AnimatePresence>
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.1 }}
              >
                {urls.map((url, index) => (
                  <motion.div
                    key={url._id}
                    className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-white/50 text-xs mb-1 flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {safeFormatDate(url.createdAt)}
                        </p>
                        <p className="text-white font-medium truncate">{url.full_url}</p>
                        <div className="flex items-center mt-1">
                          <span className="text-emerald-400/90 text-sm truncate">
                            {`http://localhost:3000/${url.short_url}`}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 self-end md:self-center">
                        <motion.button
                          onClick={() => handleCopy(url.short_url, url._id)}
                          className="flex items-center gap-1 bg-white/10 backdrop-blur-xl p-2 rounded-xl text-white/80 transition-colors duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          title="Copy shortened URL"
                        >
                          {copiedId === url._id ? (
                            <span className="text-xs text-emerald-400">Copied!</span>
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </motion.button>
                        <motion.a
                          href={`http://localhost:3000/${url.short_url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 bg-white/10 backdrop-blur-xl p-2 rounded-xl text-white/80 transition-colors duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          title="Open shortened URL"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default UserUrls
