export type IThumbnailProps = {
  name: string;
  imageURL: string;
  pressable: boolean;
  onClick?: () => void;
  buttons?: []Element;
};
