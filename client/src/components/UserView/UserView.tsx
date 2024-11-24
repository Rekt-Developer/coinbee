import { CSSProperties, FC } from 'react';
import { TUser } from '../../api/users';
import styles from './UserView.module.scss';
import { TEdit, TNameState } from '../../hooks/useEditing'
import { InputEditor } from '../../ui/InputEditor'

type TUserViewProps = {
  data: TUser;
  size?: 'lg'
  nameState?: TNameState;
  edit?: TEdit;
  handleBlur?: () => void;
  style?: CSSProperties;
};

export const UserView: FC<TUserViewProps> = ({
  data,
  nameState,
  edit,
  handleBlur,
  style,
  size
}) => {
  return (
    <div className={`${styles.user} ${size === 'lg' ? styles.lg : ''}`} style={style}>
      <img className={styles.userImg} src={data.avatar} alt={data.name} />
      {edit?.isEditing && nameState && handleBlur ? (
        <InputEditor
          inputRef={nameState.nameRef}
          value={nameState.inputName}
          onChange={e => nameState?.setInputName(e.currentTarget.value)}
          onBlur={() => handleBlur()}
          autoFocus
        />
      ) : (
        <p className={styles.userName}>
          {!edit && data.name}
          {nameState?.inputName}
          {data.role && <span className={styles.userRole}>{data.role}</span>}
        </p>
      )}
    </div>
  );
};
