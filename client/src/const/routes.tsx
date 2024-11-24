import { Overview } from '../pages/Overview/Overview';
import { Users } from '../pages/Users'
import { Agents } from '../pages/Agents'
import { Statistics } from '../pages/Statistics'
import { Transactions } from '../pages/Transactions'
import { Payments } from '../pages/Payments'
import { Cards } from '../pages/Cards'
import { Coins } from '../pages/Coins'
import { Logout } from '../pages/Logout'

export type TRoutes = {
  name: string;
  title: string;
  path: () => string;
  count?: number;
  component: () => JSX.Element;
};

export const routes: TRoutes[] = [
  {
    name: 'overview',
    title: 'Overview',
    path () {return '/' + this.name;},
    component () {return <Overview title={this.title} />;}
  },
  {
    name: 'users',
    title: 'Users',
    path () {return '/' + this.name;},
    component () {return <Users title={this.title} />;},
  },
  {
    name: 'agents',
    title: 'Agents',
    path () {return '/' + this.name;},
    component () {return <Agents title={this.title} />;},
  },
  {
    name: 'cards',
    title: 'Cards',
    path () {return '/' + this.name;},
    component () {return <Cards title={this.title} />;},
    count: 10,
  },
  {
    name: 'coins',
    title: 'Bitcoin & Ethereum',
    path () {return '/' + this.name;},
    component () {return <Coins title={this.title} />;},
  },
  {
    name: 'payments',
    title: 'Payments',
    path () {return '/' + this.name;},
    component () {return <Payments title={this.title} />;},
    count: 10,
  },
  {
    name: 'transactions',
    title: 'Transactions',
    path () {return '/' + this.name;},
    component () {return <Transactions title={this.title} />;},
  },
  {
    name: 'statistics',
    title: 'Statistics',
    path () {return '/' + this.name;},
    component () {return <Statistics title={this.title} />;},
  },
  {
    name: 'logout',
    title: 'Logout',
    path () {return '/' + this.name;},
    component () {return <Logout title={this.title} />;},
  },
];
