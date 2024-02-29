export interface MasterIconProps {
  size?: string
  fill?: string
  rotate?: string
}

export interface MasterIconMap {
  [key: string]: React.FC<MasterIconProps>
}
