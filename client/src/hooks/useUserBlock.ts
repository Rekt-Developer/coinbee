import { useMutation } from '@tanstack/react-query'
import { blockUser } from '../api/users'
import { queryClient } from '../api/queryClient'

type TuseUserBlockProps = {
  handleOnSuccess?: () => void
  key: string[];
}

export const useUserBlock = ({handleOnSuccess, key}:TuseUserBlockProps) =>{
  const userBlockMutation = useMutation(
    {
      mutationFn: blockUser,
      onSuccess ( ) {
        if (handleOnSuccess) {
          handleOnSuccess()
        }
        queryClient.invalidateQueries({ queryKey: key })
      }
    },
    queryClient
  );

  return userBlockMutation
}