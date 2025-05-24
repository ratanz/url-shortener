"use client"

import { useState } from "react"
import { Copy, Link, Loader2 } from "lucide-react"

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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-lg rounded-2xl mb-4 border border-white/20">
            <Link className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            URL Shortener
          </h1>
          <p className="text-gray-300 text-sm">Transform your long URLs into short, shareable links</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="backdrop-blur-xl bg-white/10 p-8 rounded-3xl border border-white/20 shadow-2xl transition-all duration-300 hover:bg-gray-300/15">
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="url"
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl px-6 py-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                  placeholder="Enter your URL here..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-4 rounded-2xl font-semibold transition-colors ease-in-out duration-300  hover:from-purple-600 hover:to-blue-700 hover:shadow-lg disabled:opacity-50 cursor-pointer  flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Shortening...
                  </>
                ) : (
                  "Shorten URL"
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Success result */}
        {shortUrl && (
          <div className="mt-6 backdrop-blur-xl bg-green-500/10 border border-green-400/30 rounded-3xl p-6 animate-slide-up">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-green-300 text-sm font-medium mb-2">Your shortened URL:</p>
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-green-300 transition-colors duration-200 break-all"
                >
                  {shortUrl}
                </a>
              </div>
              <button
                onClick={copyToClipboard}
                className="ml-4 p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-200 hover:scale-110"
                title="Copy to clipboard"
              >
                <Copy
                  className={`w-5 h-5 ${copied ? "text-green-400" : "text-white"} transition-colors duration-200`}
                />
              </button>
            </div>
            {copied && <p className="text-green-400 text-xs mt-2 animate-fade-in">Copied to clipboard!</p>}
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="mt-6 backdrop-blur-xl bg-red-500/10 border border-red-400/30 rounded-3xl p-6 animate-slide-up">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.4s ease-out;
        }
      `}</style>
    </div>
  )
}

export default Landing
