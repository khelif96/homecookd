import React from 'react';
import { Menu, Tab } from 'semantic-ui-react';
import Billing from '../MyAccount/BillingForm';

const panes = [
  {
    menuItem: { key: 'users', icon: 'users', content: 'Users' },
    render: () => <Tab.Pane>  </Tab.Pane>,
  },
  {
    menuItem: <Menu.Item key='shipping'>Shipping Info</Menu.Item>,
    render: () => <Tab.Pane>  <Billing /> </Tab.Pane>,
  },
  {
    menuItem: <Menu.Item key='Payment'>Payment Info</Menu.Item>,
    render: () => <Tab.Pane></Tab.Pane>,
  },
]

const Tabs = () => (
  <Tab panes={panes} />
)

export default Tabs;
