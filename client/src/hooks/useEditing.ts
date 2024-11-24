import { useMutation } from '@tanstack/react-query';
import { useRef, useState, MutableRefObject } from 'react';
import { queryClient } from '../api/queryClient';
import { editUser, TGetUserProps } from '../api/users';

export type TNameState = {
  inputName: string;
  setInputName: (value: string) => void;
  nameRef: MutableRefObject<null>
}

export type TEdit= {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

export const useEditing = (id: string, name: string, email: string, type: TGetUserProps) => {
  const [inputName, setInputName] = useState(name);
  const [inputEmail, setInputEmail] = useState(email);
  const [isEditing, setIsEditing] = useState(false);
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  const nameUpdateMutation = useMutation(
    {
      mutationFn: editUser,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [type] });
      },
    },
    queryClient
  );

  const handleBlur = () => {
    setTimeout(() => {
      if (
        document.activeElement !== nameRef.current &&
        document.activeElement !== emailRef.current
      ) {
        setIsEditing(false);
        if (inputName !== name || inputEmail !== email) {
          nameUpdateMutation.mutate({ id, name: inputName, email: inputEmail });
        }
      }
    }, 300);
  };

  return {
    nameState: { inputName, setInputName, nameRef },
    emailState: { inputEmail, setInputEmail, emailRef },
    edit: {isEditing, setIsEditing},
    handleBlur,
  };
};
