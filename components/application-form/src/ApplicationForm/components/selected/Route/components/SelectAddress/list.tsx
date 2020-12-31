import createTypeComponent from "../../../../../../../utils/createTypeComponent";
import Layout from "../../../../../../Layout";
import { ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import { FeatureMember } from "../../../../../../../services/ymaps/geocoder/useYMapsGeocoder";
import * as React from "react";
import Icon from "../../../../../../Icon";
import Text from "../../../../../../Text";
import Colors from "../../../../../../Colors";
import Block from "@kross77/rn-block/dist";
import upgrade from "../../../../../../../utils/upgrade";

const SelectAddressList = createTypeComponent({
  loading: () => (
    <Layout width={"100%"} minHeight={250} center>
      <ActivityIndicator />
    </Layout>
  ),
  display: ({ data, onSelect = null }) => (
    <FlatList
      data={data}
      keyboardShouldPersistTaps="always"
      style={{ width: "100%", height: "100%" }}
      ItemSeparatorComponent={upgrade(Block, {
        height: 0,
        padding: 0,
        margin: 0
      })}
      keyExtractor={item => item.name}
      renderItem={({ item }: { item: FeatureMember }) => {
        return (
          <TouchableOpacity style={{height: 60}} onPress={() => onSelect(item)}>
            <Layout width={"100%"} gap={10} row key={item.GeoObject.name}>
              <Icon name={"location"} />
              <Layout
                align={"flex-start"}
                justify={"center"}
                flex={1}
                height={"100%"}
              >
                <Text align={'left'} h7>{item.GeoObject.name}</Text>
                <Text align={'left'} meta>{item.GeoObject.description}</Text>
              </Layout>

              <Icon
                size={50}
                color={"transparent"}
                iconColor={Colors.B800}
                name={"chevron-right"}
              />
            </Layout>
          </TouchableOpacity>
        );
      }}
    />
  ),
  error: ({ error }) => (
    <Layout width={"100%"} minHeight={250} center>
      <Text error>{error}</Text>
    </Layout>
  )
});

export default SelectAddressList;
