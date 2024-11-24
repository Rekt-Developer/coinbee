import { FC } from 'react';
import { ActionsBar, TActionBarList } from '../../../components/ActionsBar/ActionsBar';
import './OverviewSection.scss';

interface IOverviewSectionProps {
  id: string;
  title: string;
  actionsBarList: TActionBarList[];
  widthActionBar: string;
  children: React.ReactNode;
  mb?: string;
}

export const OverviewSection: FC<IOverviewSectionProps> = ({
  id,
  title,
  actionsBarList,
  widthActionBar,
  children,
  mb
}) => {


  return (
    <section className='section'>
      <div className='section-title-wrapp'>
        <h2 className='section-title' style={{marginBottom: mb}}>{title}</h2>
        <ActionsBar
          id={id}
          style={{ right: '0', top: '50%', transform: 'translateY(-50%)' }}
          width={widthActionBar}
          list={actionsBarList}
        />
      </div>
      {children}
    </section>
  );
};
