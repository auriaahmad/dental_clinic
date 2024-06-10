import { Navigate, useNavigate } from 'react-router';
import { useGlobalStore } from '../../store/store';
import Loading from './Loading';
import { authenticateUser } from '../../apis/authAPIs';
import { useEffect, useRef, useState } from 'react';

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const userRef = useRef();
  const { user, updateUser } = useGlobalStore(state => state);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    userRef.current = user;
  }, [user]);

  useEffect(() => {
    if (!user?.type !== 'company')
      authenticateUser()
        .then(res => {
          userRef.current = res.user;
          setLoading(true);
          updateUser(res.user);
        })
        .finally(() => {
          setLoading(false);
        });
  }, []);

  if (loading) return <Loading />;

  if (userRef.current && userRef.current.type === 'company') {
    return children;
  } else {
    return navigate('/auth/signin');
  }
};

export default PrivateRoute;
