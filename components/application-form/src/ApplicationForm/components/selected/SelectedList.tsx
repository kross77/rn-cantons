import Text from "../../../Text";
import * as React from "react";
import {ActivityIndicator, Button, Image, ScrollView, TouchableOpacity, View} from "react-native";
import Layout from "../../../Layout";
import urlQueryToFirestoreCollection, {getCollectionParams} from "../../../../utils/firestore/urlQueryToFirestoreCollection";
import useFirebaseUser from "../../../../firebase/auth/useFirebaseUser";
import {useCollectionData} from "react-firebase-hooks/firestore";
import firestore from "@react-native-firebase/firestore";
import ApplicationFrom from "../../index";
import Block from "@kross77/rn-block/dist";
import Animation from "../../../Animation";
import {useSingleLink} from "../../../../utils/linkUtils";
import {useEffect} from "react";
import Colors from "../../../Colors";
import Tag from "../../../Tag";
import useDeviceSize from "../../../../native/useDeviceSize";


const DelayedRender = ({children, delay = 200}) => {
    const render = useSingleLink(false)
    useEffect(() => {
        setTimeout(() => render.set(true), delay)
    }, [])
    return render.value ? children : null
}

const Preview = ({item, size = 60}) =>  <Image style={{ borderRadius: size/2, backgroundColor: Colors.B800, width: size, height: size}} source={{uri: (item.photos && item.photos[0]) || "https://www.samsung.com/etc/designs/smg/global/imgs/support/cont/NO_IMG_600x600.png"}}/>

const SelectedList = (props: any) => {
    const user = useFirebaseUser();
    const params = {
        userId: user?.user?.uid
    };
    const collectionParams = getCollectionParams(props.collection, params)
    const collection = urlQueryToFirestoreCollection(props.collection, params);
    const [items, loading] = useCollectionData(collection, {idField: "id"})


    const add = (value: object) => firestore().collection(collectionParams.fieldPath).add(value)
    const update = ({id, ...updated}: object) => firestore().collection(collectionParams.fieldPath).doc(id).set(updated, {merge: true});
    const remove = (id: string) => firestore().collection(collectionParams.fieldPath).doc(id).delete()
    const reset = () => firestore().collection('forms').doc('developer').set({[props.newReference]: undefined}, {merge: true})
    const openNew = useSingleLink(false)
    const newEditing = useSingleLink(false)
    const size = useDeviceSize()
    return (
        <DelayedRender>
            <Animation relative type={"twoLayers"} popupTopMagin={"0%"} openned={openNew.value}>
                <Layout center>
                    <ScrollView showsHorizontalScrollIndicator={false} directionalLockEnabled={true}>
                        <Layout gap={10} minHeight={size.height - 100} justify={'center'} >
                            {loading ? <ActivityIndicator /> :
                                items.map(item =>
                                    <Layout alignItems={'center'}  width={size.width - 20}  row gap={15} >
                                        <Preview item={item} size={70}/>
                                        <Layout width={'auto'} gap={5} align={'flex-start'}>
                                            <Text h6 align={'left'}>{item.carModel}</Text>
                                            <Text h7 align={'left'}>{item.number}</Text>
                                        </Layout>
                                        <Block flex={1} />
                                        <Block width={40} height={40} relative top={5} right={5}>

                                            <Tag onPress={() => remove(item.id)} icon={'trash'}>Удалить</Tag>


                                        </Block>

                                    </Layout>
                                )
                            }
                        </Layout>
                    </ScrollView>
                    <Layout gap={10} pv={40}>
                        <TouchableOpacity onPress={() => openNew.set(true)}>
                            <Block pointerEvents={'none'}>
                                <Block width={'auto'} absolute left={-60} top={-19}>
                                    <Tag iconBackgroundColor={Colors.TRANSPARENT} iconColor={Colors.B800} size={80} icon={'plus'} />
                                </Block>
                                <Button color={Colors.B800}  title={'Добавить'}/>
                            </Block>
                        </TouchableOpacity>


                    </Layout>
                </Layout>
                <Layout center>
                    <Block zIndex={1}>
                        {
                            openNew.value && <DelayedRender delay={50}>
                                <ApplicationFrom
                                    onClose={() => openNew.set(false)}
                                    onChangeOpenState={newEditing.set}
                                    animation={{popupTopMagin: "0%" }}
                                    name={props.newReference}/>
                            </DelayedRender>

                        }
                    </Block>
                    <Block zIndex={newEditing.value ? 0 : 2}  absolute bottom={30}>
                        <Button color={Colors.B800} onPress={() => openNew.set(false)} title={'Закрыть'}/>
                    </Block>


                </Layout>
            </Animation>
        </DelayedRender>


    );
};

export default SelectedList;
