import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../../api/queryClient';
import { fetchMe } from '../../api/user';
import { Loader} from '../../ui/Loader'
import { Auth } from './Auth/Auth';
import { Header } from '../../layout/Header'
import { Dashboard } from '../../layout/Dashboard'
import { Main } from '../../layout/Main'


export const Account = () => {
  const meQuery = useQuery({
    queryFn: fetchMe,
    queryKey: ['user', 'me'],
    retry: 0
  },queryClient)


  switch (meQuery.status) {
    case 'pending':
      return <Loader/>
    case 'error':
      return <Auth/>
    case 'success':
      return (
        <>
        <Header />
        <Dashboard />
        <Main />
        </>
      )
    default:
      break;
  }
}