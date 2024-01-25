export interface ITheme {
  colorPrimary: string;
  borderRadius?: number;
  Button?: {
    colorPrimary: string;
    algorithm?: boolean;
  };
};

const ThemeData: ITheme = {
  colorPrimary: '#0e1111',
  // colorPrimary: '#081B5F',
  borderRadius: 5,
  Button: {
    colorPrimary: '#BACC81',
  },
};

export {
  ThemeData
};