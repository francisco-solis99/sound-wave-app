import React from 'react';
import { motion } from 'framer-motion';

const animations = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 }
};

// Add animation to pages and components with this component
export default function AnimatedComponent({ children }) {
    return (
        <motion.div
            variants={animations}
            initial='initial'
            animate='animate'
            exit='exit'
            transition={{ duration: 0.8 }}
        >
            {children}
        </motion.div>
    );
}
