import Layout from "../../Layout";
import upgrade from "../../../utils/upgrade";
import Input from "../../Input";
import * as React from "react";
import {useEffect, useState} from "react";
import moment from "moment";
import Tag from "../../Tag";
import Text from "../../Text";
import Block from "@kross77/rn-block";
import {Image, TouchableOpacity, View} from "react-native";
import Avatar from "../../Avatar";
import Colors from "../../Colors";
import {RouteMap} from "./selected/Route";
import Rating from "./selected/Rating";
import Icons from "../../Icons";
import useDeviceSize from "../../../native/useDeviceSize";

const useReference = (props: { onRef: (ref: any) => void }) => {
    const [ref, setRef] = useState({});
    useEffect(() => {
        if (props.onRef) {
            props.onRef && props.onRef(ref);
        }
    }, [ref]);
    return [ref, setRef];
};

const OnlyTouch = ({select, children, touch, view}) => (
    <TouchableOpacity activeOpacity={1} onPress={() => select()} {...touch}>
        <View pointerEvents={"none"} {...view}>{children}</View>
    </TouchableOpacity>
);

const wrap = (Parent: any, Component: any) => (props: any) => (
    <Parent {...props}>
        <Component {...props} />
    </Parent>
);


const string = ({removable, ...props}) => {
    if (removable) {
        return <Layout row gap={10}>
            <Block flex={1}>
                <String {...props}/>
            </Block>
            <TouchableOpacity hitSlop={{top: 5, bottom: 5, left: 5, right: 5}} onPress={() => props.update(undefined)}>
                <Icons name={'trash'} size={20} color={Colors.B800}/>
            </TouchableOpacity>

        </Layout>
    } else {
        return <String {...props} />
    }
}
const StringWrap = string

const String = wrap(
    OnlyTouch,
    upgrade(Input, {
        type: "string",
        returnKeyType: "next"
    })
);
const Route = wrap(
    upgrade(TouchableOpacity, ({select}) => ({
        onPress: () => select(),
        style: {height: '100%', width: '100%'},
        pointerEvents: 'box-only'
    })),
    upgrade(RouteMap, {pointerEvents: 'none'})
)

const RouteSearch = wrap(
    upgrade(TouchableOpacity, ({select}) => ({
        onPress: () => select(),
        style: {height: '100%', width: '100%'},
        pointerEvents: 'box-only'
    })),
    upgrade(RouteMap, {pointerEvents: 'none', map: {displayWaypoints: true, displayRoute: false}})
);
const formComponents = {
    layout: Layout,
    string: string,
    date: (props) => {
        const String = string;
        const value = props.defaultValue && moment(props.defaultValue).format('DD.MM.YYYY')
        const size = useDeviceSize()
        return <Layout width={'100%'}><String {...props} defaultValue={value}/></Layout>
    },
    rating: upgrade(Rating, {behaviour: 'display'}),
    multiline: upgrade(string, {multiline: true}),
    route: (props) => {
        return props.defaultValue?.points?.length > 1 ?
            <Layout align={'flex-start'}>
                {props.label && <Text meta>{props.label}</Text>}
                <Layout pv={10} width={'100%'} height={200}>

                    <Route select={props.select}
                           points={props.defaultValue?.points}/>
                </Layout>
            </Layout>
            :
            <String {...props} />
    },
    "route-search": (props) => {

        return props.defaultValue?.points?.length > 1 ?
            <Layout pv={10} width={'100%'} height={200}><RouteSearch select={props.select}
                                                                     points={props.defaultValue?.points}/></Layout> :
            <String {...props} />
    },
    number: string,
    year: string,
    "number-options": (props) => {
        const String = string;
        const item = props.options.find(v => v.value === props.defaultValue?.optionValue)
        const defaultValue = props.defaultValue && item?.value ? `${props.defaultValue?.inputValue} ${item?.label}` : '';
        return <String {...props} defaultValue={defaultValue}/>
    },
    range: upgrade(string, ({defaultValue, valueLabel}) => ({value: defaultValue && `${defaultValue} ${valueLabel}`})),
    multirange: upgrade(string, ({defaultValue, valueLabel}) => ({value: defaultValue && `от ${defaultValue[0]} до ${defaultValue[1]} ${valueLabel}`})),
    phone: wrap(
        OnlyTouch,
        upgrade(Input, {
            type: "string",
            returnKeyType: "next",
            dataDetectorType: "phoneNumber",
            keyboardType: "phone-pad"
        })
    ),
    photo: wrap(OnlyTouch, (props: any) => (
        <Layout gap={5}>
            <Text meta>{props.label}</Text>
            <Avatar
                iconColor={Colors.B800}
                size={150}
                border={"grey"}
                color={Colors.PLACEHOLDER}
                uri={props.defaultValue}
                {...props}
            />
        </Layout>
    )),
    photos: wrap(upgrade(OnlyTouch, {
        touch: {
            style: {
                width: '100%'
            }
        }
    }), (props: any) => (
        <Layout width={'100%'} gap={5} align={'flex-start'}>
            <Text meta>{props.label}</Text>
            <Layout row gap={5} wrap justify={"flex-start"} flexWrap={"wrap"}>

                {
                    props.defaultValue && props.defaultValue.map(uri => <Layout width={'auto'}>
                        <Avatar
                            reactangle
                            key={uri}
                            iconColor={Colors.B800}
                            size={75}
                            border={"grey"}
                            color={Colors.PLACEHOLDER}
                            uri={uri}
                            {...props}
                        />
                        <Layout height={5}/>
                    </Layout>)
                }

            </Layout>
        </Layout>
    )),
    reference: wrap(OnlyTouch, (props: any) => (
        <Layout gap={5}>
            <Text meta>{props.label}</Text>
            <Image
                iconColor={Colors.B800}
                size={350}
                border={"grey"}
                color={Colors.PLACEHOLDER}
                style={{
                    width: 350,
                    height: 350,
                    borderRadius: 350 / 2,
                }}
                source={{uri: props.defaultValue}}
                {...props}
            />
        </Layout>
    )),
    list: string,
    select: wrap(OnlyTouch, ({wrapper, ...props}: any) => {
        const [_, setRef] = useReference(props);
        const selectedItem = props.options.find(v => v.value === props.defaultValue)
        return (
            <Layout {...wrapper}>
                <Input select {...props} value={selectedItem?.label || null} onRef={setRef}/>
            </Layout>
        );
    }),
    tag: wrap(OnlyTouch, (props: any) => {
        return (
            <Block relative width={90} height={90}>
                <Tag onPress={() => props.onFocus(400)} size={55} {...props} />
            </Block>
        );
    })
};

export default formComponents;
