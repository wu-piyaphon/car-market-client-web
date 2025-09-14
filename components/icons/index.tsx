import FacebookIcon from "./ic-facebook";
import InstagramIcon from "./ic-instagram";
import NewIcon from "./ic-new";
import PickupIcon from "./ic-pickup";
import SedanIcon from "./ic-sedan";
import SUVIcon from "./ic-suv";
import TwitterIcon from "./ic-twitter";

export const iconRegistry = {
  sedan: SedanIcon,
  new: NewIcon,
  pickup: PickupIcon,
  suv: SUVIcon,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  twitter: TwitterIcon,
} as const;

type IconProps = React.SVGProps<SVGSVGElement> & {
  name: keyof typeof iconRegistry;
};

export const SvgIcon = ({ name, ...props }: IconProps) => {
  const IconComponent = iconRegistry[name];
  return <IconComponent {...props} />;
};
