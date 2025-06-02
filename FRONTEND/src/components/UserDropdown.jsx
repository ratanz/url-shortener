"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { User, Link, Settings, ChevronDown } from "lucide-react"
import { Link as RouterLink } from "react-router-dom"

const UserDropdown = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.div
        className="flex items-center gap-1 text-white/70 text-sm cursor-pointer px-2 py-1 rounded-lg hover:bg-white/5"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <User className="w-4 h-4" />
        <span>{user?.name || 'User'}</span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 mt-2 w-48 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-lg overflow-hidden z-50"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-3 border-b border-white/10">
              <p className="text-white/90 text-sm font-medium">{user?.name || 'User'}</p>
              <p className="text-white/50 text-xs truncate">{user?.email || 'user@example.com'}</p>
            </div>
            <div className="py-1">
              <RouterLink to="/urls">
                <motion.div
                  className="flex items-center gap-2 px-4 py-2 text-sm text-white/80"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Link className="w-4 h-4" />
                  Your URLs
                </motion.div>
              </RouterLink>
              <RouterLink to="/profile">
                <motion.div
                  className="flex items-center gap-2 px-4 py-2 text-sm text-white/80"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Settings className="w-4 h-4" />
                  Profile
                </motion.div>
              </RouterLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default UserDropdown
