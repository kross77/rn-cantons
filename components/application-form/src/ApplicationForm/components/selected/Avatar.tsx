import Layout from "../../../Layout";
import Tag from "../../../Tag";
import Text from "../../../Text";
import * as React from "react";
import { useEffect } from "react";
import useSpringAnimation from "../../../../native/animation/useSpringAnimation";
import { Image, TouchableOpacity, View } from "react-native";
import { useUpload } from "../../../panels/SelectPhoto";
import TitleWrapper from "./components/TitleWrapper";
import Block from "@kross77/rn-block/dist";
import Colors from "../../../Colors";
import { useResizing } from "../../../../expo/image/Resize";
import { FirebaseImageUploaderState } from "../../../../native/imageUpload/useImageUpload";
import Button from "../../../Button";
import {useSingleLink} from "../../../../utils/linkUtils";

const SelectPhoto = ({ uploader }) => (
  <TouchableOpacity onPress={() => uploader.selectImage()}>
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
  </View>
);

const SelectedAvatar = item => {
  const uploader = useUpload(() => null);
  const deletedLink = useSingleLink(false);
  useEffect(() => {
    if (uploader.localFileUri) {
      resize(uploader.localFileUri);
    }
  }, [uploader.localFileUri]);

  useEffect(() => {
    if (uploader.state === FirebaseImageUploaderState.SELECTED) {
      uploader.confirm();
    }
  }, [uploader.state === FirebaseImageUploaderState.SELECTED]);
  useEffect(() => {
    if (uploader.state === FirebaseImageUploaderState.UPLOADED) {
      deletedLink.set(false);
    }
  }, [uploader.state === FirebaseImageUploaderState.UPLOADED]);

  useEffect(() => {
    if (uploader.url) {
      item.update(uploader.url);
    }
  }, [uploader.url]);

  const [resize, uri] = useResizing({
    width: 300,
    height: 300,
    quality: 70,
    format: "PNG"
  });
  console.log('SelectedAvatar', uploader)
  const defaultValue = deletedLink.value ? null : item.defaultValue || uploader.url
  return (
    <Layout height={300}>
      {defaultValue ? (
        <Layout gap={20} center>
          <Image
            style={{
              width: 250,
              height: 250,
              borderRadius: 250/2,
              backgroundColor: Colors.B500
            }}
            source={{ uri: defaultValue }}
          />
          <Button
            icon={"trash"}
            chevron={false}
            onPress={async () => {
              await item.update(null);
              deletedLink.set(true);
            }}
            type={"small"}
          >
            Удалить
          </Button>
        </Layout>
      ) : (
        <Layout gap={40} center>
          {uri && (
            <Image
              style={{
                width: 150,
                height: 150,
                borderRadius: 75
              }}
              source={{ uri }}
            />
          )}

          {uploader.state === FirebaseImageUploaderState.UPLOADING ? (
            <Uploading uploader={uploader} />
          ) : (
            <SelectPhoto uploader={uploader} />
          )}
        </Layout>
      )}
    </Layout>
  );
};

export default SelectedAvatar;
