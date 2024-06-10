import React, { useState } from 'react';
import Question from '../components/question';
import Answer from '../components/answer';
import { useTranslation } from 'react-i18next';

function Biomodels() {
  const { t } = useTranslation();
  const qAndAData = [
    {
      id: 1,
      question: t('biomodels.q1'),
      answer: t('biomodels.a1'),
    },
    {
      id: 2,
      question: t('biomodels.q2'),
      answer: t('biomodels.a2'),
    },
    {
      id: 3,
      question: t('biomodels.q3'),
      answer: t('biomodels.a3'),
    },
    {
      id: 4,
      question: t('biomodels.q4'),
      answer: t('biomodels.a4'),
    },
    {
      id: 5,
      question: t('biomodels.q5'),
      answer: t('biomodels.a5'),
    },
    {
      id: 6,
      question: t('biomodels.q6'),
      answer: t('biomodels.a6'),
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
              question={pair.question}
              answer={pair.answer}
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
              question={pair.question}
              answer={pair.answer}
              active={activeTabs.includes(pair.id)}
              onClick={() => togglePair(pair.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Biomodels;
