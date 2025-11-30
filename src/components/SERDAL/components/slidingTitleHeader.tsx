import { motion } from 'framer-motion';


const SlidingTitleHeader = (title: string) =>{

    return(
        <>
        <div className="bg-primary text-left py-8">
          <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
                  <h1 className="text-2xl font-bold text-left text-white px-3 lg:px-40">{title}</h1>
        </motion.div>
      </div>
        </>
    )
}

export default SlidingTitleHeader