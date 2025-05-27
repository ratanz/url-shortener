// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { Copy, Link, Loader2, Github, Twitter } from "lucide-react"
import { socialIconVariants } from "../utils/Animation";

export default function Footer() {
    return (

      <div className="">
      <motion.div 
        className="absolute bottom-8 left-0 w-full flex justify-center"
        initial="hidden"
        animate="visible"
        variants={socialIconVariants}
        transition={{ delay: 1.5 }}
      >
        <motion.div 
          className="flex items-center space-x-6 backdrop-blur-xl bg-white/5 px-6 py-3 rounded-full border border-white/10"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <motion.a 
            href="https://github.com/ratanz" 
            target="_blank" 
            rel="noopener noreferrer"
            variants={socialIconVariants}
            whileHover="hover"
            whileTap="tap"
            className="text-white/70 hover:text-white transition-colors duration-300"
          >
            <Github size={20} />
          </motion.a>
          <motion.div className="h-4 w-px bg-white/20" />
          <motion.a 
            href="https://twitter.com/ratan_codes" 
            target="_blank" 
            rel="noopener noreferrer"
            variants={socialIconVariants}
            whileHover="hover"
            whileTap="tap"
            className="text-white/70 hover:text-white transition-colors duration-300"
          >
            <Twitter size={20} />
          </motion.a>
        </motion.div>
      </motion.div>
        </div>
    );
}