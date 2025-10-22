import FacebookIcon from "./ic-facebook";
import FacebookCircleIcon from "./ic-facebook-circle";
import InstagramIcon from "./ic-instagram";
import LineIcon from "./ic-line";
import LineFooterIcon from "./ic-line-footer";
import NewIcon from "./ic-new";
import PickupIcon from "./ic-pickup";
import SedanIcon from "./ic-sedan";
import SUVIcon from "./ic-suv";
import TwitterIcon from "./ic-twitter";
import VanIcon from "./ic-van";

export const iconRegistry = {
  sedan: SedanIcon,
  new: NewIcon,
  pickup: PickupIcon,
  suv: SUVIcon,
  facebook: FacebookIcon,
  facebookCircle: FacebookCircleIcon,
  instagram: InstagramIcon,
  twitter: TwitterIcon,
  line: LineIcon,
  lineFooter: LineFooterIcon,
  van: VanIcon,
} as const;

type IconProps = React.SVGProps<SVGSVGElement> & {
  name: keyof typeof iconRegistry;
};

export const SvgIcon = ({ name, className, ...props }: IconProps) => {
  const IconComponent = iconRegistry[name];
  return <IconComponent {...props} />;
};
