import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../../ui/Button/Button';
import { Error } from '../../ui/Error/Error';
import { Input } from '../../ui/Input';
import { PhotoUpload } from '../../ui/PhotoUpload';
import { ModalSuccess } from '../Modal/ModalSuccess';
import styles from './FormCoin.module.scss';
import { zodResolver } from '@hookform/resolvers/zod'
import {v4 as uuid} from 'uuid'
import { useAddCoin } from '../../hooks/useAddCoin'

const CoinPostSchema = z.object({
  name: z.string({required_error: 'Введите name'}).min(5, 'Длина name должна быть не менее 5 символов'),
  code: z.string({required_error: 'Введите code'}).min(8, 'Длина code должна быть не менее 8').max(20, 'Длина code должна быть не более 20'),
  
});

type CoinPostForm = z.infer<typeof CoinPostSchema>;

export const FormCoin = () => {
  const {register, handleSubmit,reset, setValue, formState: {errors}} = useForm<CoinPostForm>({
    resolver: zodResolver(CoinPostSchema)
  })
  const coinMutation = useAddCoin();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [errorPhoto, setErrorPhoto] = useState('')

  const [isActiveModal, setIsActiveModal] = useState(false)

  const onSubmit = async () => {
    if (!uploadedFile) {
      setErrorPhoto('Фотография не загружена')
      return;
    }
  };

  useEffect(() => {
    if (errorPhoto !== '' && uploadedFile) {
      setErrorPhoto('')
    }
  }, [errorPhoto,uploadedFile])

  useEffect(() => {
    if(coinMutation.isSuccess) {
      setIsActiveModal(true);
    }
  },[coinMutation.isSuccess])

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value
    if (!/^\d*$/.test(inputValue)) {
      setValue('code', '');
    }
  };


  return (
    <form
      id='coinForm'
      className={styles.form}
      onSubmit={handleSubmit(({name,code}) => {
        onSubmit();
        coinMutation.mutate({id: uuid(), name: name, code: code, image: uploadedFile as File});
        reset()
      })}
    >
      {errorPhoto === '' ? null :  <Error title={errorPhoto} />}
      <PhotoUpload
        className={styles.upload}
        title='Upload card image here'
        setUploadedFile={setUploadedFile}
      />
      <div className={styles.inner}>
        <Input
          placeholder='Bitcoin'
          label='Coin Name'
          size='lg'
          {...register('name', { required: true })}
        />
        {errors && <Error title={errors.name?.message || ''} />}
        <Input
          onInput={handleKeyPress}
          placeholder='xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
          label='Generated Code'
          size='lg'
          {...register('code',{pattern: {
            value: /^\d+$/,
            message: 'Пожалуйста, введите только цифры'
          }})}
        />
        {errors && <Error title={errors.code?.message || ''} />}
      </div>
      <Button isLoading={coinMutation.isPending} type='submit'>
        Add Coin
      </Button>
      {coinMutation.error && uploadedFile && <Error title={coinMutation.error.message} />}
      <ModalSuccess
        isActive={isActiveModal}
        setIsActive={setIsActiveModal}
        type='coin'
      />
    </form>
  );
};
