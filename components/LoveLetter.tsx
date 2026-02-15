import React from 'react';
import { motion } from 'framer-motion';
import { CONFESSION_TEXT } from '../constants';

interface LoveLetterProps {
  isVisible: boolean;
}

const LoveLetter: React.FC<LoveLetterProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="max-w-xl mx-auto mt-12 px-6 pb-20 space-y-8 text-center sm:text-left">
      {CONFESSION_TEXT.map((paragraph, index) => (
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }} // Only animate once
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 1.5,
            delay: index * 2.5, // 2.5s delay between paragraphs
            ease: "easeOut"
          }}
          className={`
            text-lg sm:text-xl leading-relaxed
            ${index % 2 === 0 ? 'text-emerald-950' : 'text-emerald-800'}
            font-['Inter'] font-normal tracking-wide
          `}
          // Handle line breaks in the text strings
          dangerouslySetInnerHTML={{ __html: paragraph.replace(/\n/g, '<br/>') }}
        />
      ))}
    </div>
  );
};

export default LoveLetter;