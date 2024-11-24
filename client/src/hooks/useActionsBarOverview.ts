import { useEffect, useMemo, useState } from 'react';
import { Cookies } from 'react-cookie';
import { TActionBarList } from '../components/ActionsBar';

export const useActionsBarOverview = () => {
  const [showItems, setShowItems] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const cookies = useMemo(() => new Cookies(), []); 

  const handleDelete = (id: string) => {
    setShowItems([...showItems, id]);
  };

  const sectionsFromCookies = cookies.get('sections');
  useEffect(() => {
    if (typeof sectionsFromCookies != 'undefined') {
      setShowItems(sectionsFromCookies);
    } else {setIsLoading(false);}
  }, []);

  useEffect(() => {
    const options = {
      path: '/overview',
      expires: new Date(Date.now() + 3 * 86400e3),
    };
    if (showItems.length > 0) {
      setIsLoading(false);
      cookies.set('sections', showItems, options);
    } 
  }, [showItems, cookies]);

  const actionsBarList: TActionBarList[] = [
    { title: 'View', handleFn: handleDelete },
    { title: 'Delete', handleFn: handleDelete },
  ];

  return { showItems, actionsBarList, setShowItems, isLoading };
};
