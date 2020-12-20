import React from 'react';

import Header from '../Header';

export default {
  title: 'user/Header',
  component: Header,
};

const Template = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
  primary: true,
};

// export const LoggedOut = Template.bind({});
// LoggedOut.args = {};
