import React, { useEffect } from 'react';
import minus from '../../../../assets/minus.svg';
import plus from '../../../../assets/plus.svg';
import { useInView } from 'react-intersection-observer';
import { useAnimation, motion } from 'framer-motion';

const AnswerMobile = ({ onClick, active, question, answer }) => {
  const actionControl = useAnimation();
  const [actionRef, actionInView] = useInView();

  const actionVariants = {
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
    hidden: { opacity: 0, x: -20 },
  };

  useEffect(() => {
    if (actionInView) actionControl.start('visible');
    else actionControl.start('hidden');
  }, [actionControl, actionInView]);

  return (
    <motion.div
      className='answerMob'
      onClick={onClick}
      style={
        active
          ? {
              background: 'linear-gradient(to top left, #7330bf, #2a79bf 75%)',
            }
          : {
              background: 'radial-gradient(at right, #ffffff 1%, #ffffff00)',
            }
      }
      ref={actionRef}
      variants={actionVariants}
      initial='hidden'
      animate={actionControl}
    >
      <div className='answerMob__inner'>
        <div
          className='answerMob__inner__inner'
          style={{ gap: active ? '12px' : '0' }}
        >
          <div className='answerMob__inner__inner__container'>
            <div
              style={
                active
                  ? { fontSize: '16px', fontWeight: '600' }
                  : {
                      fontSize: '14px',
                      fontWeight: '400',
                    }
              }
              className='answerMob__inner__inner__container--question'
            >
              {question}
            </div>
            <img
              src={!active ? plus : minus}
              alt='minus'
              className='w-[16px]'
            />
          </div>
          <div
            className='answerMob__inner__inner__ans'
            style={
              active
                ? {
                    opacity: 1,
                    visibility: 'visible',
                    height: 'auto',
                    fontSize: '14px',
                    lineHeight: '24px',
                    fontWeight: '400',
                  }
                : { opacity: 0, visibility: 'hidden', height: '0' }
            }
          >
            {answer}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnswerMobile;
