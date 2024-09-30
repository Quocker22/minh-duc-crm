export interface MessageModel {
  text: string;
  time: string;
  type: 'in' | 'out';
  user: number;
  template?: boolean;
}

const defaultMessages: Array<MessageModel> = [
  {
    text: 'How likely are you to recommend our company to your friends and family ?',
    time: '2 mins',
    type: 'in',
    user: 4,
  },
  {
    text: 'Hey there, we’re just writing to let you know that you’ve been subscribed to a repository on GitHub.',
    time: '5 mins',
    type: 'out',
    user: 2,
  },
  {
    text: 'Ok, Understood!',
    time: '1 Hour',
    type: 'in',
    user: 4,
  },
  {
    text: 'You’ll receive notifications for all issues, pull requests!',
    time: '2 Hours',
    type: 'out',
    user: 2,
  },
  {
    text: 'You can unwatch this repository immediately by clicking here: <a href="https://keenthemes.com">Keenthemes.com</a>',
    time: '3 Hours',
    type: 'in',
    user: 4,
  },
  {
    text: 'Most purchased Business courses during this sale!',
    time: '4 Hours',
    type: 'out',
    user: 2,
  },
  {
    text: 'Company BBQ to celebrate the last quater achievements and goals. Food and drinks provided',
    time: '5 Hours',
    type: 'in',
    user: 4,
  },
  {
    template: true,
    text: '',
    time: 'Just now',
    type: 'out',
    user: 2,
  },
  {
    template: true,
    text: 'Right before vacation season we have the next Big Deal for you.',
    time: 'Just now',
    type: 'in',
    user: 4,
  },
];

export interface UserInfoModel {
  email: string;
  name: string;
  online: boolean;
  position: string;
  avatar?: string;
  initials?: { label: string; state: 'warning' | 'danger' | 'primary' | 'success' | 'info' };
}

const defaultUserInfos: Array<UserInfoModel> = [
  {
    avatar: 'avatars/300-6.jpg',
    email: 'e.smith@kpmg.com.au',
    name: 'Emma Smith',
    online: false,
    position: 'Art Director',
  },
  {
    email: 'melody@altbox.com',
    initials: { label: 'M', state: 'danger' },
    name: 'Melody Macy',
    online: true,
    position: 'Marketing Analytic',
  },
  {
    avatar: 'avatars/300-1.jpg',
    email: 'max@kt.com',
    name: 'Max Smith',
    online: false,
    position: 'Software Enginer',
  },
  {
    avatar: 'avatars/300-5.jpg',
    email: 'sean@dellito.com',
    name: 'Sean Bean',
    online: false,
    position: 'Web Developer',
  },
  {
    avatar: 'avatars/300-25.jpg',
    email: 'brian@exchange.com',
    name: 'Brian Cox',
    online: false,
    position: 'UI/UX Designer',
  },
  {
    email: 'mikaela@pexcom.com',
    initials: { label: 'M', state: 'warning' },
    name: 'Mikaela Collins',
    online: true,
    position: 'Head Of Marketing',
  },
  {
    avatar: 'avatars/300-9.jpg',
    email: 'f.mitcham@kpmg.com.au',
    name: 'Francis Mitcham',
    online: false,
    position: 'Software Arcitect',
  },

  {
    email: 'olivia@corpmail.com',
    initials: { label: 'O', state: 'danger' },
    name: 'Olivia Wild',
    online: true,
    position: 'System Admin',
  },
  {
    email: 'owen.neil@gmail.com',
    initials: { label: 'N', state: 'primary' },
    name: 'Neil Owen',
    online: true,
    position: 'Account Manager',
  },
  {
    avatar: 'avatars/300-23.jpg',
    email: 'dam@consilting.com',
    name: 'Dan Wilson',
    online: false,
    position: 'Web Desinger',
  },
  {
    email: 'emma@intenso.com',
    initials: { label: 'E', state: 'danger' },
    name: 'Emma Bold',
    online: true,
    position: 'Corporate Finance',
  },
  {
    avatar: 'avatars/300-12.jpg',
    email: 'ana.cf@limtel.com',
    name: 'Ana Crown',
    online: false,
    position: 'Customer Relationship',
  },
  {
    email: 'robert@benko.com',
    initials: { label: 'A', state: 'info' },
    name: 'Robert Doe',
    online: true,
    position: 'Marketing Executive',
  },
  {
    avatar: 'avatars/300-13.jpg',
    email: 'miller@mapple.com',
    name: 'John Miller',
    online: false,
    position: 'Project Manager',
  },
  {
    email: 'lucy.m@fentech.com',
    initials: { label: 'L', state: 'success' },
    name: 'Lucy Kunic',
    online: true,
    position: 'SEO Master',
  },
  {
    avatar: 'avatars/300-21.jpg',
    email: 'ethan@loop.com.au',
    name: 'Ethan Wilder',
    online: true,
    position: 'Accountant',
  },
];

const messageFromClient: MessageModel = {
  text: 'Thank you for your awesome support!',
  time: 'Just now',
  type: 'in',
  user: 4,
};

export interface AlertModel {
  description: string;
  icon: string;
  state: 'primary' | 'danger' | 'warning' | 'success' | 'info';
  time: string;
  title: string;
}

const defaultAlerts: Array<AlertModel> = [
  {
    description: 'Phase 1 development',
    icon: 'icons/duotune/technology/teh008.svg',
    state: 'primary',
    time: '1 hr',
    title: 'Project Alice',
  },
  {
    description: 'Confidential staff documents',
    icon: 'icons/duotune/general/gen044.svg',
    state: 'danger',
    time: '2 hrs',
    title: 'HR Confidential',
  },
  {
    description: 'Corporeate staff profiles',
    icon: 'icons/duotune/finance/fin006.svg',
    state: 'warning',
    time: '5 hrs',
    title: 'Company HR',
  },
  {
    description: 'New frontend admin theme',
    icon: 'icons/duotune/files/fil023.svg',
    state: 'success',
    time: '2 days',
    title: 'Project Red',
  },
  {
    description: 'Product launch status update',
    icon: 'icons/duotune/maps/map001.svg',
    state: 'primary',
    time: '21 Jan',
    title: 'Project Breafing',
  },
  {
    description: 'Collection of banner images',
    icon: 'icons/duotune/general/gen006.svg',
    state: 'info',
    time: '21 Jan',
    title: 'Banner Assets',
  },
  {
    description: 'Collection of SVG icons',
    icon: 'icons/duotune/art/art002.svg',
    state: 'warning',
    time: '20 March',
    title: 'Icon Assets',
  },
];
export interface LogModel {
  code: string;
  message: string;
  state: 'success' | 'danger' | 'warning';
  time: string;
}

const defaultLogs: Array<LogModel> = [
  { code: '200 OK', message: 'New order', state: 'success', time: 'Just now' },
  { code: '500 ERR', message: 'New customer', state: 'danger', time: '2 hrs' },
  { code: '200 OK', message: 'Payment process', state: 'success', time: '5 hrs' },
  { code: '300 WRN', message: 'Search query', state: 'warning', time: '2 days' },
  { code: '200 OK', message: 'API connection', state: 'success', time: '1 week' },
  { code: '200 OK', message: 'Database restore', state: 'success', time: 'Mar 5' },
  { code: '300 WRN', message: 'System update', state: 'warning', time: 'May 15' },
  { code: '300 WRN', message: 'Server OS update', state: 'warning', time: 'Apr 3' },
  { code: '300 WRN', message: 'API rollback', state: 'warning', time: 'Jun 30' },
  { code: '500 ERR', message: 'Refund process', state: 'danger', time: 'Jul 10' },
  { code: '500 ERR', message: 'Withdrawal process', state: 'danger', time: 'Sep 10' },
  { code: '500 ERR', message: 'Mail tasks', state: 'danger', time: 'Dec 10' },
];

export { defaultAlerts, defaultLogs, defaultMessages, defaultUserInfos, messageFromClient };
