import React, { useState } from 'react';
import Answer from '../components/answer';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';
function AlignerManufacturing() {
  const { t, i18n } = useTranslation();

  const palniLinkQ11 = (active, mobVersion) => (
    <span
      className={twMerge(
        `text-white text-[${
          mobVersion ? '14px' : '16px'
        }] font-normal leading-6 transition-all duration-200`,
        active && `text-[${mobVersion ? '16px' : '20px'}] font-semibold`
      )}
    >
      {i18n.language === 'en' ? 'Does ' : ''}
      <span className='text-white font-normal   font-serif'>Plani</span>
      <span className='text-red-500  font-normal  font-serif'>Link </span>
      {t('alignerManufacturer.q11')}
    </span>
  );
  const palniLinkQ1 = (active, mobVersion) => (
    <span
      className={twMerge(
        `text-white text-[${
          mobVersion ? '14px' : '16px'
        }] font-normal leading-6 transition-all duration-200`,
        active && `text-[${mobVersion ? '16px' : '20px'}] font-semibold`
      )}
    >
      {i18n.language === 'en'
        ? 'Is making aligners as simple as you show on the '
        : i18n.language === 'es'
        ? `¿Fabricar alineadores es tan sencillo como mostráis en la web de${' '}`
        : 'Ist das Herstellen von Alignern so einfach, wie es auf der '}
      <span className='text-white font-normal  font-serif'>Plani</span>
      <span className='text-red-500 font-normal  font-serif'>Link </span>
      {i18n.language !== 'es' && (
        <>{i18n.language === 'en' ? 'website?' : '-Website gezeigt wird?'}</>
      )}
    </span>
  );
  const palniLinkA11 = (active, mobVersion) => (
    <span
      className={twMerge(
        `text-white text-[${
          mobVersion ? '14px' : '16px'
        }] font-normal leading-6 transition-all duration-200`,
        active && `text-[${mobVersion ? '14px' : '20px'}]`
      )}
    >
      No, <span className='text-white font-normal font-serif'>Plani</span>
      <span className='text-red-500 font-normal font-serif'>Link </span>
      {t('alignerManufacturer.a11')}
    </span>
  );
  const qAndAData = [
    {
      id: 1,
      question: palniLinkQ1,
      answer: t('alignerManufacturer.a1'),
    },
    {
      id: 2,
      question: t('alignerManufacturer.q2'),
      answer: t('alignerManufacturer.a2'),
    },
    {
      id: 3,
      question: t('alignerManufacturer.q3'),
      answer: t('alignerManufacturer.a3'),
    },
    {
      id: 4,
      question: t('alignerManufacturer.q4'),
      answer: t('alignerManufacturer.a4'),
    },
    {
      id: 5,
      question: t('alignerManufacturer.q5'),
      answer: t('alignerManufacturer.a5'),
    },
    {
      id: 6,
      question: t('alignerManufacturer.q6'),
      answer: t('alignerManufacturer.a6'),
    },
    {
      id: 7,
      question: t('alignerManufacturer.q7'),
      answer: t('alignerManufacturer.a7'),
    },
    {
      id: 8,
      question: t('alignerManufacturer.q8'),
      answer: t('alignerManufacturer.a8'),
    },
    {
      id: 9,
      question: t('alignerManufacturer.q9'),
      answer: t('alignerManufacturer.a9'),
    },
    {
      id: 10,
      question: t('alignerManufacturer.q10'),
      answer: t('alignerManufacturer.a10'),
    },
    {
      id: 11,
      question: palniLinkQ11,
      answer: palniLinkA11,
    },
    {
      id: 12,
      question: t('alignerManufacturer.q12'),
      answer: t('alignerManufacturer.a12'),
    },
  ];

  const [activeTabs, setActiveTabs] = useState([]);

  const togglePair = id => {
    const index = activeTabs.findIndex(tab => tab === id);
    if (index !== -1) activeTabs.splice(index, 1);
    else activeTabs.push(id);
    setActiveTabs([...activeTabs]);
  };

  return (
    <div>
      <div className='web'>
        {qAndAData.map(pair => (
          <div className='web__query' key={pair.id}>
            <Answer
              question={
                typeof pair.question === 'string'
                  ? pair.question
                  : pair.question(activeTabs.includes(pair.id))
              }
              answer={
                typeof pair.answer === 'string'
                  ? pair.answer
                  : pair.answer(activeTabs.includes(pair.id))
              }
              active={activeTabs.includes(pair.id)}
              onClick={() => togglePair(pair.id)}
            />
          </div>
        ))}
      </div>
      <div className='webMob'>
        {qAndAData.map(pair => (
          <div key={pair.id}>
            <Answer
              question={
                typeof pair.question === 'string'
                  ? pair.question
                  : pair.question(activeTabs.includes(pair.id), true)
              }
              answer={
                typeof pair.answer === 'string'
                  ? pair.answer
                  : pair.answer(activeTabs.includes(pair.id), true)
              }
              active={activeTabs.includes(pair.id)}
              onClick={() => togglePair(pair.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlignerManufacturing;
