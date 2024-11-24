import { ChangeEvent, FC, useContext, useRef, useState } from 'react';
import UploadSVG from '../../assets/img/upload.svg?react';
import { ThemeContext } from '../../Providers/ThemeProvider';
import styles from './PhotoUpload.module.scss';
type TPhotoUploadProps = {
  className?:string
  title: string;
  setUploadedFile: (file: File) => void;
}

export const PhotoUpload: FC<TPhotoUploadProps> = ({ title, setUploadedFile, className }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [result, setResult] = useState<string | ArrayBuffer | null>(null);
  const [theme] = useContext(ThemeContext);
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };


  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onload = function(e) {
        if (e.target && e.target.result) {
          setResult(e.target.result);
        }
    };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className={className}>
      <div className={styles.upload} onClick={handleClick}>
      <input
        ref={fileInputRef}
        type='file'
        className={styles.photoUpload}
        accept='image/png,image/svg, image/jpg, image/jpeg, image/webp '
        onChange={onFileChange}
      />
      <UploadSVG className={theme === 'dark' ? styles.svg : ''} />
      <p>{title}</p>
      {result && <img className={styles.result} src={result as string} alt="Preview"/>}
    </div>
    </div>
  );
};
