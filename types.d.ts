declare global {
  interface MasterIconProps {
    size?: string;
    fill?: string;
    rotate?: string;
  }
  
  interface MasterIconMap {
    [key: string]: React.FC<IconProps>;
  }  
}

export {}