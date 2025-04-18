

import { motion } from 'framer-motion';

const titleHeader = (title: string) => {

    return(
        <>
        <div className="font-optima font-bold text-primary text-center text-4xl py-10">
                <motion.h2
                    initial={{ y: -20, scale:1.5 }}
                    animate={{ y: 0, scale: 1 }}   
                    transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 15,
                    duration: 2,
                    }}
                >
                    {title}
                </motion.h2>

                <motion.div
                    className="border-b-2 border-primary mx-20 mt-5"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                    style={{ originX: 0.5 }}  // This sets the animation to grow from the center
                ></motion.div>
        </div>
        </>
    );
}

export default titleHeader;