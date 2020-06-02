import Layout from "../../../Layout";
import Tag from "../../../Tag";
import Text from "../../../Text";
import * as React from "react";
import useSpringAnimation from "../../../../native/animation/useSpringAnimation";
import { Animated, Image, TouchableOpacity } from "react-native";
import { useUpload } from "../../../panels/SelectPhoto";
import TitleWrapper from "./components/TitleWrapper";
import { useEffect } from "react";
import Block from "@kross77/rn-block/dist";
import Colors from "../../../Colors";

const SelectedPhoto = item => {
  const value = useSpringAnimation(0, item.selected ? 1 : 0, {
    speed: 0.5,
    bounciness: 3,
    delay: 300
  });
  const uploader = useUpload(() => null);
  useEffect(() => {
    // uploader.selectImage();
  }, []);
  return (
    <Layout height={300}>
      <TitleWrapper title={item.placeholder} value={value}>
        <Layout center>
          {uploader.localFileUri && (
            <Image
              style={{
                width: 150,
                height: 150,
                borderRadius: 75,
              }}
              source={{ uri: uploader.localFileUri }}
            />
          )}
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
        </Layout>
      </TitleWrapper>
    </Layout>
  );
};

export default SelectedPhoto;
