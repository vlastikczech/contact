import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Svg, { 
  Circle, Ellipse, G, TSpan, TextPath, Path, Polygon, Polyline, Line, Rect, Use, Image, Symbol, Defs, LinearGradient, RadialGradient, Stop, ClipPath, Pattern, Mask 
} from 'react-native-svg'

const StatsIcon = (props) => (
    <View>
        <Svg viewBox="0 0 24.455084 30.185472" width={24.455084} height={30.185472}>
            <G transform="translate(-61.741221,-103.33468)">
                <Path
                    d="M 65.417052,129.79234 V 116.13392"
                    style={{
                        stroke: props.color,
                        strokeWidth:7.35092688,
                        strokeLinecap:'round',
                        strokeLinejoin:'miter',
                        strokeMiterlimit:4,
                        strokeOpacity:1
                        }} />
                <Path
                    d="M 73.968762,129.79234 V 107.06249"
                    style={{
                        stroke: props.color,
                        strokeWidth:7.35092688,
                        strokeLinecap:'round',
                        strokeLinejoin:'miter',
                        strokeMiterlimit:4,
                        strokeOpacity:1
                        }} />
                <Path
                    d="m 82.520473,129.79234 v -7.89428"
                    style={{
                        stroke: props.color,
                        strokeWidth:7.35092688,
                        strokeLinecap:'round',
                        strokeLinejoin:'miter',
                        strokeMiterlimit:4,
                        strokeOpacity:1
                        }} />
            </G>
        </Svg>
    </View>
)

const UserIcon = (props) => (
    <View>
        <Svg viewBox="-42 0 512 512.002" width={28} height={28}>
            <Path
                d="m210.351562 246.632812c33.882813 0 63.222657-12.152343 87.195313-36.128906 23.972656-23.972656 36.125-53.304687 36.125-87.191406 0-33.875-12.152344-63.210938-36.128906-87.191406-23.976563-23.96875-53.3125-36.121094-87.191407-36.121094-33.886718 0-63.21875 12.152344-87.191406 36.125s-36.128906 53.308594-36.128906 87.1875c0 33.886719 12.15625 63.222656 36.132812 87.195312 23.976563 23.96875 53.3125 36.125 87.1875 36.125zm0 0"
                style={{fill: props.color,}} />
            <Path
                d="m426.128906 393.703125c-.691406-9.976563-2.089844-20.859375-4.148437-32.351563-2.078125-11.578124-4.753907-22.523437-7.957031-32.527343-3.308594-10.339844-7.808594-20.550781-13.371094-30.335938-5.773438-10.15625-12.554688-19-20.164063-26.277343-7.957031-7.613282-17.699219-13.734376-28.964843-18.199219-11.226563-4.441407-23.667969-6.691407-36.976563-6.691407-5.226563 0-10.28125 2.144532-20.042969 8.5-6.007812 3.917969-13.035156 8.449219-20.878906 13.460938-6.707031 4.273438-15.792969 8.277344-27.015625 11.902344-10.949219 3.542968-22.066406 5.339844-33.039063 5.339844-10.972656 0-22.085937-1.796876-33.046874-5.339844-11.210938-3.621094-20.296876-7.625-26.996094-11.898438-7.769532-4.964844-14.800782-9.496094-20.898438-13.46875-9.75-6.355468-14.808594-8.5-20.035156-8.5-13.3125 0-25.75 2.253906-36.972656 6.699219-11.257813 4.457031-21.003906 10.578125-28.96875 18.199219-7.605469 7.28125-14.390625 16.121094-20.15625 26.273437-5.558594 9.785157-10.058594 19.992188-13.371094 30.339844-3.199219 10.003906-5.875 20.945313-7.953125 32.523437-2.058594 11.476563-3.457031 22.363282-4.148437 32.363282-.679688 9.796875-1.023438 19.964844-1.023438 30.234375 0 26.726562 8.496094 48.363281 25.25 64.320312 16.546875 15.746094 38.441406 23.734375 65.066406 23.734375h246.53125c26.625 0 48.511719-7.984375 65.0625-23.734375 16.757813-15.945312 25.253906-37.585937 25.253906-64.324219-.003906-10.316406-.351562-20.492187-1.035156-30.242187zm0 0"
                style={{fill: props.color,}} />
        </Svg>
    </View>
)

const InfoIcon = (props) => (
    <View>
        <Svg viewBox="0 0 7.3516616 30.965652" width={7.3516617} height={30.965652}>
            <G transform="translate(-107.65589,-102.7698)">
                <G
                transform="matrix(1.4395353,0,0,1.4395353,-35.46895,-57.298425)"
                >
                <Path
                    d="m 101.97782,130.11565 v -9.48807"
                    style={{
                        stroke: props.color,
                        strokeWidth:5.10645819,
                        strokeLinecap:'round',
                        strokeLinejoin:'miter',
                        strokeMiterlimit:4,
                        strokeOpacity:1
                        }} />
                <Circle
                    r="2.5390604"
                    cy="113.73344"
                    cx="101.97782"
                    style={{ fill: props.color }}
                />
                </G>
            </G>
        </Svg>
    </View>
)

const HelpIcon = (props) => (
    <View>
        <Svg viewBox="0 0 24 24" width={24} height={24}>
            <Path
                d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 18.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25c.691 0 1.25.56 1.25 1.25s-.559 1.25-1.25 1.25zm1.961-5.928c-.904.975-.947 1.514-.935 2.178h-2.005c-.007-1.475.02-2.125 1.431-3.468.573-.544 1.025-.975.962-1.821-.058-.805-.73-1.226-1.365-1.226-.709 0-1.538.527-1.538 2.013h-2.01c0-2.4 1.409-3.95 3.59-3.95 1.036 0 1.942.339 2.55.955.57.578.865 1.372.854 2.298-.016 1.383-.857 2.291-1.534 3.021z"
                style={{
                    stroke: props.color,
                    fill: props.fill,
                    strokeWidth:5.10645819,
                    strokeLinecap:'round',
                    strokeLinejoin:'miter',
                    strokeMiterlimit:4,
                    strokeOpacity:1
                    }} 
            />
        </Svg>
    </View>
)

const PlusIcon = (props) => (
    <View style={styles.icon}>
        <Svg viewBox="0 0 95 95" width={80} height={80}>
            <Path
                d="M47.5 0C21.3074 0 0 21.3074 0 47.5C0 73.6926 21.3074 95 47.5 95C73.6926 95 95 73.6926 95 47.5C95 21.3074 73.6926 0 47.5 0ZM68.2812 51.4581H51.4581V68.2812C51.4581 70.4665 49.6852 72.2393 47.5 72.2393C45.3148 72.2393 43.5419 70.4665 43.5419 68.2812V51.4581H26.7188C24.5335 51.4581 22.7607 49.6852 22.7607 47.5C22.7607 45.3148 24.5335 43.5419 26.7188 43.5419H43.5419V26.7188C43.5419 24.5335 45.3148 22.7607 47.5 22.7607C49.6852 22.7607 51.4581 24.5335 51.4581 26.7188V43.5419H68.2812C70.4665 43.5419 72.2393 45.3148 72.2393 47.5C72.2393 49.6852 70.4665 51.4581 68.2812 51.4581Z"
                fill="url(#paint0_linear)"
            />
            <Defs>
                <LinearGradient id="paint0_linear" x1="5.5" y1="-1.13766e-06" x2="65" y2="47" gradientUnits="userSpaceOnUse">
                    <Stop stopColor="#DBDBDB"/>
                    <Stop offset="1" stopColor="white"/>
                </LinearGradient>
            </Defs>
        </Svg>
    </View>
)

const MinusIcon = (props) => (
    <View style={styles.icon}>
        <Svg viewBox="0 0 95 95" width={80} height={80}>
            <Path
                d="M47.5 0C21.3074 0 0 21.3074 0 47.5C0 73.6926 21.3074 95 47.5 95C73.6926 95 95 73.6926 95 47.5C95 21.3074 73.6926 0 47.5 0ZM68.2812 51.4581H26.7188C24.5335 51.4581 22.7607 49.6852 22.7607 47.5C22.7607 45.3148 24.5335 43.5419 26.7188 43.5419H68.2812C70.4665 43.5419 72.2393 45.3148 72.2393 47.5C72.2393 49.6852 70.4665 51.4581 68.2812 51.4581Z"
                fill="url(#paint0_linear)"
            />
            <LinearGradient 
                id="paint0_linear" 
                x1="63.5" y1="47" x2="-14.5" y2="1.33138e-06" 
                gradientUnits="userSpaceOnUse"
                >
                <Stop stopColor="white"/>
                <Stop offset="1" stopColor="#DBDBDB"/>
            </LinearGradient>
        </Svg>
    </View>
)

export default function ChooseSVG(props) {
    if (props.name === 'stats') {
        return <StatsIcon color={props.color}/>
    }
    else if (props.name === 'user') {
        return <UserIcon color={props.color}/>
    }
    else if (props.name === 'info') {
        return <InfoIcon color={props.color}/>
    }
    else if (props.name === 'help') {
        return <HelpIcon color={props.color} fill={props.fill}/>
    }
    else if (props.name === 'plus') {
        return <PlusIcon/>
    }
    else if (props.name === 'minus') {
        return <MinusIcon/>
    }
}

const styles = StyleSheet.create({
    icon: {
        borderRadius: 50,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 6,
        zIndex: 3
      },
})