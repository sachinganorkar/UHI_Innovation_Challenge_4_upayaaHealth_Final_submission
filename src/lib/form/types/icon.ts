export type Icon = JSX.Element | React.FC;

export type IconDescriptor = {
  src: Icon;
  background?: string;
  foreground?: string;
  shadowColor?: string;
};
export type IconRenderer = IconDescriptor | Icon | undefined;
