import Layout from "../../../../../../Layout";
import Text from "../../../../../../Text";
import Input from "../../../../../../Input";
import useYMapsGeocoder from "../../../../../../../services/ymaps/geocoder/useYMapsGeocoder";
import {useSingleLink} from "../../../../../../../utils/linkUtils";
import debounce from "../../../../../../../utils/debounce";
import * as React from "react";
import SelectAddressList from "./list";
import {useEffect, useRef} from "react";
import {ScrollView} from "react-native";
import pause from "../../../../../../../utils/pause";

import {toPoint, toPos} from "../../../Route/components/utils";
import CenterPoint from "../../../Route/components/CenterPoint";
import PersistMap from "../../../Route/components/PersistMap";
import Button from "../../../../../../Button";
import ApplicationForm from "../../../../..";
import Block from "@kross77/rn-block/dist";
import shouldUpdate from "../../../../../../../utils/shouldUpdate";
import origin from "../../origin";


enum SelectAddressState {
    SelectPoint,
    Accurate,
}

const t = {
    selectPoint: "Выберите точку",
    edit: "Редактировать",
    accurate: "Уточните",
    inputAddress: "Введите адрес",
    savePoint: "Сохранить"
}

const StrictInput = shouldUpdate((p,n) => p.label !== n.label)(Input)

const SelectAddress = ({onSelect, point = toPos(origin), onMap, focus, ...props}) => {

    const inputRef = useRef();
    const geocode = useSingleLink<string>("");
    const [data, loading, error] = useYMapsGeocoder({
        api: "fe91030b-c315-45ef-8ea5-1e4db231bc6b",
        geocode: geocode.value
    });
    const pointLink = useSingleLink(point)
    const radiusLink = useSingleLink([Number(point?.radius) || 0])
    const accuratedPointLink = useSingleLink(null);
    useEffect(() => {
        if(inputRef.current){
            if(focus){
                inputRef.current.focus();
            }else{
                inputRef.current.blur();
            }
        }

    }, [focus])

    return (
        <Layout flex={1} pv={10} gap={20}>
            <Text h4>{pointLink.value ? point ? t.edit : t.accurate : t.selectPoint}:</Text>
            {

                !pointLink.value ?
                    <>
                        <Input
                            autoFocus
                            ref={inputRef}
                            blurOnSubmit={false}
                            onChangeText={debounce(text => geocode.set(text), 1000)}
                            placeholder={t.inputAddress}
                            icon={'location'}
                            {...props}
                        />
                        <SelectAddressList
                            onSelect={async  p => {
                                inputRef.current.blur();
                                inputRef.current.clear();
                                pointLink.set(p);
                                // await pause(0.2)
                                //  onSelect && onSelect(p);

                            }}
                            type={loading ? "loading" : error ? "error" : "display"}
                            loading={loading}
                            error={error}
                            data={data?.response.GeoObjectCollection.featureMember || []}
                        />
                        <Layout gap={20}>
                            <Button onPress={onMap} chevron={false}>
                                Выбрать на карте
                            </Button>
                        </Layout>
                    </> :
                    <Layout gap={10} flex={1}>
                        <Layout flex={1} width={'100%'} align={'center'} justify={'center'}>
                            <Layout absolute zIndex={1}>
                                <CenterPoint />
                            </Layout>
                            <PersistMap
                                displayRoute={false}
                                displayMarkers={false}
                                origin={toPoint(pointLink.value)}
                                destination={toPoint(pointLink.value)}
                                onRegionChange={ p => {
                                    const updatedPoint = toPos({...p, GeoObject: pointLink.value});
                                    accuratedPointLink.set(updatedPoint)
                                }
                                }
                            />

                        </Layout>
                        <Input
                            range2

                            sliderType={"single"}
                            label={"Радиус (км)"}
                            min={0}
                            max={1500}
                            valueLink={radiusLink}
                            onValuesChange={radiusLink.set}
                        />
                        <Layout gap={20}>

                            <Button disabled={!(radiusLink.value &&radiusLink.value[0] > 0)} onPress={() =>{
                                const point = accuratedPointLink.value || pointLink.value;
                                const pointWithRadius = {...point, radius: radiusLink.value}
                                onSelect(pointWithRadius)
                            }} chevron={false}>
                                {t.savePoint}
                            </Button>
                            <Button onPress={() => pointLink.set(null)} chevron={false}>
                                {t.inputAddress}
                            </Button>
                        </Layout>

                    </Layout>

            }
        </Layout>
    );
};

export default SelectAddress;
