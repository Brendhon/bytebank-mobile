import Svg, { Path, SvgProps } from "react-native-svg"

export default function LogoIllustration(props: SvgProps) {
  return (
    <Svg
      width={27}
      height={28}
      viewBox="0 0 27 28"
      fill="none"
      {...props}
    >
      <Path
        d="M20.586 7.136H7.11v13.538h13.475V7.136zM7.066.6H.512v6.492h6.554V.6zM27 .6h-6.462v6.492H27V.6z"
        fill={props.color}
      />
      <Path d="M13.894 20.63H.42v6.77h13.475v-6.77z" fill={props.color} />
      <Path
        d="M20.586 7.136H7.11v13.538h13.475V7.136zM7.066.6H.512v6.492h6.554V.6zM27 .6h-6.462v6.492H27V.6z"
        fill={props.color}
      />
    </Svg>
  )
}
