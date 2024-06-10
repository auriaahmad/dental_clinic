import React, { useState } from 'react';
import Question from '../components/question';
import Answer from '../components/answer';
import { useTranslation } from 'react-i18next';
function PlanningHome() {
  const { t } = useTranslation();
  const qAndAData = [
    {
      id: 1,
      question: t('planningHome.q1'),
      answer: t('planningHome.a1'),
    },
    {
      id: 2,
      question: t('planningHome.q2'),
      answer: t('planningHome.a2'),
    },
    {
      id: 3,
      question: t('planningHome.q3'),
      answer: t('planningHome.a3'),
    },
    {
      id: 4,
      question: t('planningHome.q4'),
      answer: t('planningHome.a4'),
    },
    {
      id: 5,
      question: t('planningHome.q5'),
      answer: t('planningHome.a5'),
    },
    {
      id: 6,
      question: t('planningHome.q6'),
      answer: t('planningHome.a6'),
    },
    {
      id: 7,
      question: t('planningHome.q7'),
      answer: t('planningHome.a7'),
    },
    {
      id: 8,
      question: t('planningHome.q8'),
      answer: t('planningHome.a8'),
    },
    {
      id: 9,
      question: t('planningHome.q9'),
      answer: t('planningHome.a9'),
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

export default PlanningHome;
