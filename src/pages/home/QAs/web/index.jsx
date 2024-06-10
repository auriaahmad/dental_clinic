import React, { useState } from 'react';
import Answer from '../components/answer';
import { useTranslation } from 'react-i18next';
function Web() {
  const { t } = useTranslation();
  const qAndAData = [
    {
      id: 1,
      question: t('web.q1'),
      answer: t('web.a1'),
    },
    {
      id: 2,
      question: t('web.q2'),
      answer: t('web.a2'),
    },
    {
      id: 3,
      question: t('web.q3'),
      answer: t('web.a3'),
    },
    {
      id: 4,
      question: t('web.q4'),
      answer: t('web.a4'),
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
    <>
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
    </>
  );
}

export default Web;
