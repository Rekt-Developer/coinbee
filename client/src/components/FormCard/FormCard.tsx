import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { v4 as uuid } from 'uuid'
import { z } from 'zod'
import { useAddCard } from '../../hooks/useAddCard'
import { Error } from '../../ui/Error/Error'
import { Input } from '../../ui/Input'
import { PhotoUpload } from '../../ui/PhotoUpload'
import styles from './FormCard.module.scss'
import { Button } from '../../ui/Button/Button'
import { CustomSelect } from '../../ui/CustomSelect'
import { cardCurrencyOptions, cardTypeOptions, countryOptions } from '../../const/select'
import { ModalSuccess } from '../Modal/ModalSuccess'

const CardPostSchema = z.object({
  photo: z.unknown(),
  name: z.string(),
  country: z.string(),
  type: z.string(),
  currency: z.string(),
});

type CardPostForm = z.infer<typeof CardPostSchema>;

export const FormCard = () => {
  const {register,handleSubmit,setError, clearErrors, reset, formState: { errors },} = useForm<CardPostForm>();
  const cardMutation = useAddCard();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const [currentCountry, setCurrentCountry] = useState('')
  const [currentType, setCurrentType] = useState('')
  const [currentCurrency, setCurrentCurrency] = useState('')
  const [isActiveModal, setIsActiveModal] = useState(false)


  const onSubmit = async () => {
    if (!uploadedFile) {
      setError('photo', { type: 'error', message: 'Фотография не загружена' });
      return;
    } 
    if (currentCountry === '') {
      setError('country', { type: 'manual', message: 'Страна не выбрана' });
      return;
    } 
    if (currentType == '') {
      setError('type', { type: 'manual', message: 'Тип не выбран' });
      return;
    } 
    if (currentCurrency == '') {
      setError('currency', { type: 'manual', message: 'Валюта не выбрана' });
      return;
    }
    }

    useEffect(() => {
      if (uploadedFile || currentCountry !== '' || currentType !== '' || currentCurrency !== '' || uploadedFile !== '') {
        clearErrors()
      }
    }, [currentCountry, currentType, currentCurrency,uploadedFile])

    useEffect(() => {
      if(cardMutation.isSuccess) {
        setIsActiveModal(true);
        setCurrentCountry('')
        setCurrentType('')
        setCurrentCurrency('')
        reset()
      }
    },[cardMutation.isSuccess])

  return (
    <form
      id='cardForm'
      className={styles.form}
      onSubmit={handleSubmit(({ name }) => {
        onSubmit();
        const data = {
          id: uuid(),
          currency: currentCurrency,
          type: currentType,
          country: currentCountry,
          name: name,
          image: uploadedFile as File
        };
        cardMutation.mutate(data);
      })}
    >
      {errors && <Error title={errors.photo?.message || ''} />}
      <PhotoUpload
        className={styles.upload}
        title='Upload card image here'
        setUploadedFile={setUploadedFile}
      />
      <div className={styles.inner}>
        <Input placeholder= 'Google Play E-code card' label='Card Name' size='lg'  {...register('name', {required: true})}/>
        {errors && <Error title={errors.name?.message || ''} />}
        <CustomSelect options={countryOptions} currentValue={currentCountry} setCurrentValue={setCurrentCountry} placeholder='United States' label='Country'/>
        {errors && <Error title={errors.country?.message || ''} />}
        <CustomSelect options={cardTypeOptions} currentValue={currentType} setCurrentValue={setCurrentType} placeholder='iTunes Card' label='Card Type'/>
        {errors && <Error title={errors.type?.message || ''} />}
        <CustomSelect options={cardCurrencyOptions} currentValue={currentCurrency} setCurrentValue={setCurrentCurrency} placeholder='Dollars' label='Card Currency'/>
        {errors && <Error title={errors.currency?.message || ''} />}
      </div>
      <Button isLoading={cardMutation.isPending} type='submit'>Add Card</Button>
      {cardMutation.error && <Error title={cardMutation.error.message}/>}
      <ModalSuccess isActive={isActiveModal} setIsActive={setIsActiveModal} type='card'/>
    </form>
  );
};
