import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { queryClient } from '../../../api/queryClient';
import { loginUser, logoutUser, registerUser } from '../../../api/user';
import { Button } from '../../../ui/Button/Button';
import { Error } from '../../../ui/Error/Error';
import { Input } from '../../../ui/Input';
import styles from './AuthForm.module.scss'

const AuthPostSchema = z.object({
  email: z
    .string({
      required_error: 'Поле должно быть заполнено',
      invalid_type_error: 'Поле должно быть строкой',
    })
    .min(5, 'Длина email должна быть не менее 5 символов')
    .email('Некорректный email!'),
  password: z
    .string({
      required_error: 'Поле должно быть заполнено',
      invalid_type_error: 'Поле должно быть строкой',
    })
    .min(8, 'Длина пароля должна быть не менее 8 символов'),
});

type AuthPostForm = z.infer<typeof AuthPostSchema>;

type  TAuthFormProps = {
  title: 'register' | 'login' | 'logout'
}

export const AuthForm: FC<TAuthFormProps> = ({title}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthPostForm>({
    resolver: zodResolver(AuthPostSchema),
  });

  const authFunction = async (title: string, formData: AuthPostForm): Promise<void> => {
      switch (title) {
        case 'register':
          await registerUser(formData);
          break;
        case 'login':
          await loginUser(formData);
          break;
        case 'logout':
          await logoutUser();
          break;
        default:
      }
  };

  const authPostMutation = useMutation(
    {
      mutationFn: (formData: AuthPostForm) => authFunction(title, formData),
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ['user', 'me'] });
      },
    },

    queryClient
  );

  return (
    <form
      className={styles.wrapp}
      onSubmit={handleSubmit(({ email, password }) => {
        authPostMutation.mutate({ email, password });
      })}
    >
      <div className={styles.inner}>
        <Input label='Email' placeholder='Email' {...register('email')} />
        {errors && <Error title={errors.email?.message || ''} />}
        <Input
          label='Password'
          placeholder='XXXXXXXXXX'
          type='password'
          {...register('password')}
        />
        {errors && <Error title={errors.password?.message || ''} />}
      </div>
      <Button type='submit' isLoading={authPostMutation.isPending}>
        {title === 'register' ? 'Register' : title === 'login' ? 'login' : title === 'logout' ? 'Logout' : ''}
      </Button>
      {authPostMutation.error && (
        <Error title={authPostMutation.error.message} />
      )}
    </form>
  );
};
