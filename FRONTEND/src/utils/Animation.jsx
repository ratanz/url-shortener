
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.7,
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
}

export const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
}

export const iconVariants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 45,
      delay: 0.1,
    },
  },
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.2,
    },
  },
}

export const formVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.5 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay: 0.4,
      damping: 50,
      stiffness: 10,
      bounce: 0.5,
    },
  },
}

export const buttonVariants = {
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

export const inputVariants = {
  focus: {
    scale: 1.02,
    transition: {
      duration: 0.3,
    },
  },
  blur: {
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
}

export const socialIconVariants = {
  hidden: { opacity: 0, y: 40, scale : 0 },
  visible: {
    opacity: 1,
    y: 0,
    scale : 1,
    transition: {
      type: "spring",
      stiffness: 180,
      damping: 30,
      delay : 0.8,
    },
  },
  hover: {
    scale: 1.2,
    rotate: [0, -10, 10, -5, 5, 0],
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  tap: {
    scale: 0.9,
    transition: {
      duration: 0.1,
    },
  },
}