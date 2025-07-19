export default interface AppleWebApp {
    title: string;
    statusBarStyle: 'default' | 'black-translucent' | 'black';
    startupImage: (string | { url: string; media: string })[];
  }