import * as React from "react";
import {useContext, useEffect} from "react";
import Layout from "../../../../Layout";
import Text from "../../../../Text";
import Block from "@kross77/rn-block/dist";
import useDeviceSize from "../../../../../native/useDeviceSize";
import {ActivityIndicator, Animated, Keyboard, TouchableOpacity} from "react-native";
import SelectAddress from "./components/SelectAddress";
import Button from "../../../../Button";
import useSpringAnimation from "../../../../../native/animation/useSpringAnimation";
import {ArrayLink, useArrayLink, useSingleLink} from "../../../../../utils/linkUtils";
import Icons from "../../../../Icons";
import Colors from "../../../../Colors";
import createTypeComponent from "../../../../../utils/createTypeComponent";
import Map from "../../../../Map";
import {FeatureMember} from "../../../../../services/ymaps/geocoder/useYMapsGeocoder";
import wrap from "../../../../../utils/wrap";
import upgrade from "../../../../../utils/upgrade";
import {ModalsContext} from "../../../../Animation/components/Modals";
import Svg, {Path} from "react-native-svg"
import shouldUpdate from "../../../../../utils/shouldUpdate";
import DisplayRouteInfo from "./components/DisplayRouteInfo";
import origin from "./origin";

const Slides = ({children, currentSlide = 0, ...props}) => {
    const value = useSpringAnimation(0, currentSlide);
    const size = useDeviceSize();
    return (
        <Animated.View
            height={"100%"}
            style={{
                flex: 1,
                transform: [
                    {
                        translateX: value.interpolate({
                            inputRange: [0, 1],
                            outputRange: [size.width / 2, -size.width / 2]
                        })
                    }
                ]
            }}
        >
            <Layout row>
                {children?.map((child, i) => (
                    <Layout width={size.width} key={`item ${i}`}>
                        {child}
                    </Layout>
                ))}
            </Layout>
        </Animated.View>
    );
};

const NoPoints = ({onAddPoint}) => (
    <Layout>
        <Layout pv={60}>
            <Icons name={"map"} size={120} color={Colors.B800}/>
            <Text h5>{`Фильтр по локациям \nне задан`}</Text>
        </Layout>

        <Button onPress={() => onAddPoint()}>Добавить точку</Button>
    </Layout>
);

interface Points {
    pointsLink: ArrayLink<FeatureMember>;
    onAddPoint: () => void;
    hidden: boolean;
}

const IconButton = wrap(TouchableOpacity, Icons);

const ng = s => Math.round(Number(s) * 1000) / 1000

const getPointName = pos => {
    const [ln, lt] = pos.split(" ");
    return `Координаты \n${ng(lt)}, ${ng(ln)}`
}

const PointMap = ({point, onPress}) => (
    <Layout row color={Colors.W100} pv={10} ph={10}>
        <Layout
            wrapper={upgrade(TouchableOpacity, {onPress})}
            align={"flex-start"}
            width={"auto"}
            flex={1}>
            <Text oversized align={"left"}>
                {point?.GeoObject?.name || getPointName(point?.GeoObject?.Point.pos)}
            </Text>
            <Text meta align={"left"}>
                {point?.GeoObject?.description}
            </Text>
        </Layout>
        <Layout row gap={15} width={"auto"}>
            <IconButton
                disabled={!point.up}
                onPress={point.up}
                color={Colors.B800}
                name={"chevron-up"}
                size={20}
            />
            <IconButton
                disabled={!point.down}
                onPress={point.down}
                color={Colors.B800}
                name={"chevron-down"}
                size={20}
            />
            <IconButton
                disabled={!point.delete}
                onPress={point.delete}
                color={Colors.B800}
                name={"trash"}
                size={20}
            />
        </Layout>
    </Layout>
);

const TouchLayout = wrap(
    upgrade(TouchableOpacity, {style: {width: "100%"}}),
    Layout
);

export const RouteMap = ({points, ...wrapper}) => {
    const latlnPoints =
        points &&
        points.map(p => {
            const [longitude, latitude] = p.GeoObject?.Point.pos.split(" ") || [];
            return {longitude: Number(longitude), latitude: Number(latitude)};
        });
    return points ? (
        <Map
            wrapper={wrapper}
            delta={0.05}
            waypoints={latlnPoints.length > 2 ? latlnPoints.slice(1, -1) : []}
            origin={latlnPoints[0]}
            destination={latlnPoints[latlnPoints.length - 1]}
            {...map}
        />
    ) : (
        <Layout center>
            <ActivityIndicator/>
        </Layout>
    );
};


const Points = ({
                    pointsLink,
                    onAddPoint,
                    hidden: hiddenProp = false,
                    next,
    ...props
                }: Points) => {
    const latlnPoints = pointsLink.value.map(p => {
        const [longitude, latitude] = p.GeoObject?.Point.pos.split(" ") || [];
        return {longitude: Number(longitude), latitude: Number(latitude)};
    });

    const routeInfo = useSingleLink({})
    const pointsLive = pointsLink.value.map((p, i) => ({
        ...p,
        delete: () => pointsLink.remove(i),
        up: i > 0 ? () => pointsLink.move(i, i - 1) : null,
        down:
            i < pointsLink.value?.length - 1 ? () => pointsLink.move(i, i + 1) : null
    }));

    return (
        <Layout gap={15}>
            <Layout pv={10} ph={30}>
                <Text h5>Фильтр по геопозиции:</Text>
            </Layout>

            <Layout height={150}>
                <Map
                    onReady={({distance, duration}) => routeInfo.set({distance, duration})}
                    delta={0.05}
                    displayWaypoints
                    displayRoute={false}
                    waypoints={latlnPoints.length > 2 ? latlnPoints.slice(1, -1) : []}
                    origin={latlnPoints[0]}
                    destination={latlnPoints[latlnPoints.length - 1]}
                />
            </Layout>
            <Layout height={10}/>
            <Layout gap={2}>
                {pointsLive.map((point, index) => (
                    <PointMap onPress={() => onAddPoint(point, index)} key={point?.GeoObject?.name} point={point}/>
                ))}
            </Layout>
            <Button onPress={() => onAddPoint(null, -1)}>Добавить точку</Button>
        </Layout>
    );
};

const DisplayRoute = createTypeComponent({
    noPoints: NoPoints,
    points: Points
});


export const toPoint = y => {
    const [ln, lt] = y?.GeoObject?.Point.pos.split(' ');
    return {GeoObject: y?.GeoObject, latitude: Number(lt), longitude: Number(ln)}
}

export const toPos = (point) => {
    return {
        GeoObject: {
            ...point.GeoObject,
            Point: {pos: `${point.longitude} ${point.latitude}`}
        }
    }
}

const RoutePoint = ({onBack, onAddPoint, point}) => {
    const modals = useContext(ModalsContext)
    const onMap = () => {
        Keyboard.dismiss()
        modals.add(<SelectPoint
            onBack={modals.pop}
            point={point}
            onReady={(point) => {
                onAddPoint(toPos(point))
                modals.pop();
                modals.pop();
            }}/>)
    };
    return (
        <Layout height={"100%"} ph={20} relative>

            <Block absolute zIndex={1} width={30} right={12} top={7}>
                <TouchableOpacity onPress={onBack}>
                    <Icons size={30} name={'cross'}/>
                </TouchableOpacity>
            </Block>

            <Block flex={1}>
                <SelectAddress onSelect={onAddPoint} onMap={onMap} point={point} defaultValue={point?.GeoObject?.name}/>
            </Block>


        </Layout>
    )
};



export const CenterPoint = (props) => {
    return (
        <Svg width={44} height={44} viewBox="0 0 44 44" fill="none" {...props}>
            <Path d="M22 29a7 7 0 100-14 7 7 0 000 14z" fill="#CD0102"/>
            <Path
                d="M22 42c11.046 0 20-8.954 20-20S33.046 2 22 2 2 10.954 2 22s8.954 20 20 20z"
                stroke="#CD0102"
                strokeWidth={3.5}
            />
        </Svg>
    )
}

export const PersistMap = shouldUpdate((p, n) => JSON.stringify(p.origin) !== JSON.stringify(n.origin))(Map)

const SelectPoint = ({point, onBack, onReady}) => {
    const or = toPoint(point || toPos(origin));
    const regionLink = useSingleLink(or);

    return (
        <Layout width={'100%'} height={'100%'} gap={10}>
            <Layout pv={10}>
                <Text h5>Выбрать точку:</Text>
            </Layout>
            <Block absolute zIndex={1} width={30} right={12} top={7}>
                <TouchableOpacity onPress={onBack}>
                    <Icons size={30} name={'cross'}/>
                </TouchableOpacity>
            </Block>

            <Layout width={'100%'} flex={1} align={'center'} justify={'center'}>
                <Layout zIndex={99}>
                    <CenterPoint/>
                </Layout>
                <PersistMap
                    displayRoute={false}
                    displayMarkers={false}
                    origin={or}
                    destination={or}
                    onRegionChange={regionLink.set}
                />

            </Layout>
            <Layout gap={20}>
                <Button onPress={() => {
                    onReady(regionLink.value)
                }} chevron={false}>
                    Готово
                </Button>
            </Layout>
        </Layout>
    )
}

const RouteSearch = (props: any) => {
    const size = useDeviceSize();
    const slide = useSingleLink<number>(0);
    const hiddenRoute = useSingleLink<boolean>(false);
    const points = useArrayLink<any>(props.defaultValue?.points || []);
    const routeInfo = useSingleLink<any>(props.defaultValue?.route || {});
    const addPointVisibleIndex = useSingleLink(-1)
    const update = () => props.update && props.update({route: routeInfo.value, points: points.value});
    const modals = useContext(ModalsContext);

    useEffect(() => {

        if (points.value) {
            update();
        }
    }, [points.value]);

    useEffect(() => {
        if (routeInfo.value) {
            update();
        }
    }, [routeInfo.value]);

    const onAddPoint = pointIndex => async p => {
        modals.pop()
        if (pointIndex !== -1) {
            points.update(pointIndex, p)
        } else {
            points.add(p);
        }
    }

    const Point = ({point, pointIndex}) => <RoutePoint
        point={point}
        slideLink={slide}
        onAddPoint={onAddPoint(pointIndex)}
        onBack={modals.pop}
    />
    return (
        <Layout width={'100%'}>
            <DisplayRoute
                type={points.value?.length === 0 ? "noPoints" : "points"}
                onAddPoint={(point, pointIndex = -1) => {
                    modals.add(<Point point={point} pointIndex={pointIndex}/>)
                }}
                pointsLink={points}
                routeInfo={routeInfo}
                hidden={hiddenRoute.value}
                next={props.next}
            />
        </Layout>
    );
};

export default RouteSearch;
