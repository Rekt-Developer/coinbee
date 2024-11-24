import { useConversionRate } from '../../hooks/useConversionRate';
import { usePagination } from '../../hooks/usePagination';
import { ButtonArrow } from '../../ui/ButtonArrow/ButtonArrow';
import { Error } from '../../ui/Error/Error';
import { Loader } from '../../ui/Loader';
import { ConversionRateItem } from './ConversionRateItem';
import styles from './ConversionRateList.module.scss';

export const ConversionRateList = () => {
  const { data, isSuccess, isPending, isError, error } = useConversionRate();
  const pagination = usePagination(data ?? [], 3);

  return (
    <div className={styles.wrapp}>
      <ul
        className={`${styles.list} ${
          isPending || isError ? styles.center : ''
        }`}
      >
        {isPending && <Loader />}
        {isSuccess &&
          pagination.sliceData.map(item => (
            <li key={item.title}>
              <ConversionRateItem data={item} />
            </li>
          ))}
        {isError && (
          <Error title={error.message} color='pomidoro' isBackground='true' />
        )}
      </ul>
      <div className={styles.btnWrapp}>
        <ButtonArrow
          handleClick={pagination.handleClickNext}
          isDisabled={isError || isPending || !pagination.canSelectNext}
        />
        {pagination.canSelectPrev && (
          <ButtonArrow type='left' handleClick={pagination.handleClickPrev} />
        )}
      </div>
    </div>
  );
};
