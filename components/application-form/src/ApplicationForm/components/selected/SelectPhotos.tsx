import Layout from "../../../Layout";
import Tag from "../../../Tag";
import Text from "../../../Text";
import * as React from "react";
import { useEffect } from "react";
import useSpringAnimation from "../../../../native/animation/useSpringAnimation";
import { Image, TouchableOpacity, View } from "react-native";
import TitleWrapper from "./components/TitleWrapper";
import Block from "@kross77/rn-block/dist";
import Colors from "../../../Colors";
import {
  FirebaseImageUploaderState,
  useFirebaseImagesUploader
} from "../../../../native/imageUpload/useImageUpload";
import Button from "../../../Button";
import { useArrayLink, useSingleLink } from "../../../../utils/linkUtils";
import Icons from "../../../Icons";

export const usePhotosUpload = () => {
  return useFirebaseImagesUploader({
    picker: {
      width: 500,
      height: 500
    }
  });
};

const SelectPhoto = ({ uploader }) => (
  <TouchableOpacity
    style={{ height: 250 }}
    onPress={() => uploader.selectImages()}
  >
    <Block relative width={"auto"} pointerEvents={"none"}>
      <Tag size={80} icon={"camera"} labelType={"h6"} />

      <Block absolute left={25} top={60}>
        <Tag
          iconBackgroundColor={Colors.POSITIVE}
          size={25}
          scaleFactor={1}
          icon={"plus"}
          labelType={"h6"}
        />
      </Block>
    </Block>
    <Text h4>Добавить фото</Text>
    <Block height={50} />
  </TouchableOpacity>
);

const UploadPhoto = ({ uploader }) => (
  <TouchableOpacity onPress={() => uploader.confirm()}>
    <Block relative width={"auto"} pointerEvents={"none"}>
      <Tag size={60} icon={"cloud"} labelType={"h6"} />
      <Block absolute left={17} top={47}>
        <Tag
          iconBackgroundColor={Colors.POSITIVE}
          size={15}
          scaleFactor={1.3}
          icon={"arrow-up"}
          labelType={"h6"}
        />
      </Block>
    </Block>
    <Text h4>Загрузить на сервер</Text>
  </TouchableOpacity>
);

const Uploading = ({ uploader }) => (
  <View>
    <Block relative width={"auto"} pointerEvents={"none"}>
      <Tag size={60} icon={"cloud"} labelType={"h6"} />
      <Block absolute left={17} top={45}>
        <Tag
          iconBackgroundColor={Colors.WARNING}
          size={20}
          scaleFactor={1.3}
          icon={"cycle"}
          labelType={"h6"}
        />
      </Block>
    </Block>
    <Text h4>Загружено {uploader.progress}%</Text>
    <Text h4>
      Фото {uploader.urls.length + 1} из {uploader.localFilesUri.length}
    </Text>
  </View>
);

const Img = ({ opacity = 1, size, uri }) => (
  <Image
    style={{
      opacity,
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: Colors.B500
    }}
    source={{
      uri
    }}
  />
);

const PhotoFiller = ({ size = 150, uri, progress = 0.5 }) => {
  return (
    <Layout relative overflow={"hidden"}>
      <Block
        overflow={"hidden"}
        absolute
        bottom={0}
        height={size * progress}
        justify={"flex-end"}
      >
        <Img size={size} uri={uri} />
      </Block>
      <Img opacity={0.5} size={size} uri={uri} />
    </Layout>
  );
};

const SelectPhotos = item => {
  const value = useSpringAnimation(0, item.selected ? 1 : 0, {
    speed: 0.5,
    bounciness: 3,
    delay: 300
  });
  const uploader = usePhotosUpload();
  const itemsLink = useArrayLink(item.defaultValue || []);
  // const current = item.defaultValue || [];
  useEffect(() => {
    if (uploader.urls && uploader.urls.length > 0) {
      const photos = [...itemsLink.value, ...uploader.urls];
      // itemsLink.set(photos)
      item.update(photos);
    }
  }, [uploader.urls]);

  useEffect(() => {
    if (uploader.state === FirebaseImageUploaderState.UPLOADED) {
      uploader.clear();
    }
  }, [uploader.state === FirebaseImageUploaderState.UPLOADED]);

  useEffect(() => {
    if (uploader.state === FirebaseImageUploaderState.SELECTED) {
      uploader.confirm();
    }
  }, [uploader.state === FirebaseImageUploaderState.SELECTED]);
  let searched = [];
  const photos = [...itemsLink.value, ...(uploader.localFilesUri || [])];
  const uploadPhotoIndex = itemsLink.value?.length + uploader.urls?.length;

  return (
    <Layout height={400}>
      <TitleWrapper size={1} title={"Фотографии"} value={value}>
        {photos && (
          <Layout gap={20} align={"center"}>
            <Layout>
              {photos && photos.length > 0 ? (
                <Layout gap={10}>
                  <Layout row gap={10} flexWrap={"wrap"}>
                    {photos.map((uri, index) => {
                      const isUpload = index < uploadPhotoIndex;
                      const isUploading = index === uploadPhotoIndex;
                      const progress = isUploading
                        ? uploader.progress
                        : isUpload
                        ? 100
                        : 0;
                      return (
                        <Layout width={70} height={80} key={uri} relative>
                          <PhotoFiller
                            uri={uri}
                            progress={progress / 100}
                            size={70}
                          />

                          <Layout
                            absolute
                            bottom={0}
                            left={5}
                            align={"center"}
                            justify={"center"}
                            color={Colors.R600}
                            width={35}
                            height={35}
                            borderRadius={20}
                          >
                            <TouchableOpacity
                              hitSlop={{
                                top: 10,
                                left: 10,
                                bottom: 10,
                                right: 10
                              }}
                              onPress={() => {
                                const items = itemsLink.value;
                                items.splice(index, 1);
                                itemsLink.set([...items]);
                                item.update(itemsLink.value);
                              }}
                            >
                              <Icons
                                color={Colors.W100}
                                size={20}
                                name={"trash"}
                              />
                            </TouchableOpacity>
                          </Layout>
                        </Layout>
                      );
                    })}
                  </Layout>
                  <Button onPress={uploader.selectImages}>Добавить</Button>
                </Layout>
              ) : (
                <Layout width={"100%"} align={"center"}>
                  <SelectPhoto uploader={uploader} />
                </Layout>
              )}
            </Layout>
          </Layout>
        )}
      </TitleWrapper>
    </Layout>
  );
};

export default SelectPhotos;
