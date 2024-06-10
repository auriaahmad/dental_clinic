import { useEffect, useMemo, useState } from 'react';
import SmButton from '../../../../components/form/SmButton';
import { useTranslation } from 'react-i18next';
import { getQueryByIDForCompanyAPI } from '../../../../apis/queryAPIs';
import { useLocation } from 'react-router';
import moment from 'moment';
import { useGlobalStore } from '../../../../store/store';
import socketIOClient from 'socket.io-client';

const socket = socketIOClient(process.env.REACT_APP_SERVER_URL);
const QueryChat = () => {
  const { t } = useTranslation();

  const location = useLocation();
  const [query, setQuery] = useState();
  const [message, setMessage] = useState('');

  const { user, setLoading } = useGlobalStore(state => state);

  const _query = useMemo(() => {
    const splittedLoc = location.pathname.split('/');
    return splittedLoc[splittedLoc.length - 1];
  }, [location.pathname]);

  useEffect(() => {
    // CHAT
    socket.emit('online', { _user: user?._id });
    socket.on('message', message => {
      setQuery(pS => {
        if (!pS.messages.some(mess => mess._id === message.newMessage._id))
          pS.messages.push(message.newMessage);
        return { ...pS };
      });
    });

    const getQueryByID = async () => {
      setLoading(true);
      const response = await getQueryByIDForCompanyAPI(_query);
      if (response) {
        setQuery(response.query);
      }
      setLoading(false);
    };
    getQueryByID();

    return () => {
      socket.emit('offline', { _user: user?._id });
    };
  }, []);

  useEffect(() => {
    const messages_list_container = document.getElementById('queryChat');

    if (messages_list_container)
      messages_list_container.scrollTop = messages_list_container.scrollHeight;
  }, [query]);

  const sendMessage = async event => {
    event.preventDefault();
    if (!message) return;

    socket.emit('message', {
      _user: user._id,
      _query,
      message,
      type: 'company',
    });
    setMessage('');
  };

  return (
    <div className='queryChat shadow-container' id='queryChat'>
      <div className='queryChat__header'>
        <h2 className='heading-3'>
          <span>{t('queryChat.Sub')} :</span>
          {query?.subject}
        </h2>
      </div>
      <div className='queryChat__chat'>
        <div className='queryChat__chat__messages'>
          {query?.messages.map((message, index) => (
            <div
              className={`queryChat__chat__messages__message ${
                message.type === 'company' &&
                'queryChat__chat__messages__message__my'
              }`}
              key={index}
            >
              <div className='queryChat__chat__messages__message__message'>
                {message.message}
              </div>
              <span className='queryChat__chat__messages__message--time'>
                {moment(message.createdAt).format('MM/DD/YY, h:mm a')}
              </span>
            </div>
          ))}
        </div>
        <form className='queryChat__chat__messageInput' onSubmit={sendMessage}>
          <input
            type='text'
            placeholder={t('queryChat.YM')}
            required
            onChange={event => setMessage(event.target.value)}
            value={message}
          />
          <div className='queryChat__chat__messageInput__buttons'>
            <SmButton
              titleComplete={t('queryChat.S')}
              variant='small2'
              theme='primary'
            />
            <SmButton
              titleComplete={t('queryChat.C')}
              variant='small2'
              theme='secodary'
              type='button'
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default QueryChat;
