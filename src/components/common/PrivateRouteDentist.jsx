import { Navigate, useNavigate } from 'react-router';
import { useGlobalStore } from '../../store/store';
import { useEffect, useState } from 'react';
import { authenticateUser } from '../../apis/authAPIs';
import Loading from './Loading';

const PrivateRouteDentist = ({ children }) => {
  const { user, updateUser } = useGlobalStore(state => state);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    authenticateUser()
      .then(res => {
        updateUser(res.user);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

    if (loading) return <Loading />;

    if (user && user.type === 'dentist') {
      return children;
    } else {
      return navigate('/auth/signin');
    }
};

export default PrivateRouteDentist;
