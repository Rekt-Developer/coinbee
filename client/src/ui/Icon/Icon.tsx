import Overview from '../../assets/img/overview.svg?react'
import Users from '../../assets/img/users.svg?react'
import Agents from '../../assets/img/agents.svg?react'
import Cards from '../../assets/img/cards.svg?react'
import Bitcoin from '../../assets/img/bitcoin.svg?react'
import Payments from '../../assets/img/payments.svg?react'
import Transactions from '../../assets/img/transactions.svg?react'
import Statistics from '../../assets/img/statistics.svg?react'
import Logout from '../../assets/img/logout.svg?react'
import Calendar from '../../assets/img/calendar.svg?react'
import { FC } from 'react'

type TPropsIcon = {
  name: string;
  isWhite?: boolean;
}

export const Icon: FC<TPropsIcon> = ({name, isWhite}) => {
  switch (name) {
    case 'overview':
      return <Overview className={isWhite ? 'svgColor' : ''}/>
    case 'users':
      return <Users className={isWhite ? 'svgColor' : ''}/>
    case 'agents':
      return <Agents className={isWhite ? 'svgColorAg' : ''}/>
    case 'cards':
      return <Cards className={isWhite ? 'svgColor' : ''}/>
    case 'coins':
      return <Bitcoin className={isWhite ? 'svgColorTransBtc' : ''}/>
    case 'payments':
      return <Payments className={isWhite ? 'svgColor' : ''}/>
    case 'transactions':
      return <Transactions className={isWhite ? 'svgColorTransBtc' : ''}/>
    case'statistics':
      return <Statistics className={isWhite ? 'svgColorSt' : ''}/>
    case 'logout':
      return <Logout className={isWhite ? 'svgColor' : ''}/>
      case 'calendar':
      return <Calendar className={isWhite ? 'svgColor' : ''}/>
    default:
      return null
  }
}