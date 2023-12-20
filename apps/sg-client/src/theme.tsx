export interface ITheme {
  borderRadius: number;
  colorPrimary: string;
  Button?: {
    colorPrimary: string;
    algorithm?: boolean;
  };
};

const ThemeData: ITheme = {
  borderRadius: 6,
  colorPrimary: '#0e1111',
  Button: {
    colorPrimary: '#BACC81',
  },
};

export {
  ThemeData
};