import React, { useState } from 'react';
import Question from '../components/question';
import Answer from '../components/answer';
import { useTranslation } from 'react-i18next';
function Records() {
  const { t } = useTranslation();
  const qAndAData = [
    {
      id: 1,
      question: t('records.q1'),
      answer: t('records.a1'),
    },
    {
      id: 2,
      question: t('records.q2'),
      answer: t('records.a2'),
    },
    {
      id: 3,
      question: t('records.q3'),
      answer: t('records.a3'),
    },
    {
      id: 4,
      question: t('records.q4'),
      answer: t('records.a4'),
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

export default Records;
