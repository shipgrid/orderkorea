export interface ITheme {
  colorPrimary: string;
  // borderRadius?: number;
  Button?: {
    colorPrimary: string;
    algorithm?: boolean;
  };
};

const ThemeData: ITheme = {
  colorPrimary: '#0e1111',
  // borderRadius: 10,
  Button: {
    colorPrimary: '#BACC81',
  },
};

export {
  ThemeData
};