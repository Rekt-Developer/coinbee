import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { queryClient } from '../../api/queryClient'
import { getUser } from '../../api/users'
import { ModalBlock } from '../../components/Modal/ModalBlock'
import { TotalCards } from '../../components/TotalCards'
import { UserView } from '../../components/UserView'
import { useTotalList } from '../../hooks/useTotalList'
import { useUserBlock } from '../../hooks/useUserBlock'
import { Button } from '../../ui/Button/Button'
import { Error } from '../../ui/Error/Error'
import { Loader } from '../../ui/Loader'
import { colorStatus } from '../../utils/statusColor'
import './User.scss'
import { Status } from '../../ui/Status'
import { getPaymentUser } from '../../api/paymentUser'
import { PaymentsUserList } from '../../components/PaymentsUserList'

export const User = () => {
  const { id } = useParams();
  const [isActiveBlockModal, setIsActiveBlockModal] = useState(false);
  const userBlockMutation = useUserBlock({handleOnSuccess: handleOnSuccess, key: ['user']});
  function handleOnSuccess () {
    setIsActiveBlockModal(false)
  }
  const userQuery = useQuery(
    {
      queryKey: ['user', id],
      queryFn: () => getUser(id || ''),
      retry: 0,
    },
    queryClient
  );

  const paymentsQuery = useQuery({
    queryKey: ['payments-user'],
    queryFn: getPaymentUser,
    retry: 0,
  }, queryClient)

  const totalListQuery = useTotalList('/total-user', 'totalListUser');

  return (
    <div>
      <div className='main-title-wrapp overview-title-wrapp'>
        <h1 className='main-title'>Users</h1>
      </div>
      <div className='user-inner' style={{opacity: userQuery.data?.block ? '0.6' : '1'}}>
        {userQuery.isLoading && <Loader />}
        {userQuery.error && <Error title={userQuery.error.message} />}
        {userQuery.isSuccess && (
          <div className='user-wrapp'>
            <UserView size='lg' data={userQuery.data} />
            <p className='user-email'>{userQuery.data.email}</p>
            <div className='btn-wrapp'>
              {userQuery.data.block ? (
                <Status
                style={{ width: '91px', height: '27px' }}
                title='Blocked'
                color='red'
              />
              ) : (
                <Status
                style={{ width: '91px', height: '27px' }}
                title={userQuery.data.status}
                color={colorStatus(userQuery.data.status)}
              />
              )}
              <Button size='sm' onClick={() => {setIsActiveBlockModal(true)}} isDisabled={userQuery.data.block}>
                Block User
              </Button>
            </div>
            <div className='payments-user-total'>
            {totalListQuery.error && (
              <Error title={totalListQuery.error.message} />
            )}
            {totalListQuery.isLoading && <Loader />}
            {totalListQuery.isSuccess && (
              <TotalCards gap='20px' data={totalListQuery.data} size='sm'/>
            )}
            </div>
          </div>
        )}
        <div className='section-inner payments-inner'>
        {paymentsQuery.isLoading && <Loader />}
        {paymentsQuery.error && (
          <Error title={paymentsQuery.error.message} />
        )}
        {paymentsQuery.isSuccess && (
          <div className='payments-wrapp'><PaymentsUserList data={paymentsQuery.data} /></div>
        )}
      </div>
        
      </div>
      {id && <ModalBlock
        isActive={isActiveBlockModal}
        setIsActive={setIsActiveBlockModal}
        isLoading={userBlockMutation.isPending}
        handleBlock={() => {
          userBlockMutation.mutate({id, isBlocked: true})
        }}
      />}
    </div>
  );
};
