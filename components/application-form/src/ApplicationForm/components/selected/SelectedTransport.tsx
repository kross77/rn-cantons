import * as React from "react";
import { useEffect, useState } from "react";
import Text from "../../../Text";
import { useLiveModel } from "../../../../logic/model";
import Layout from "../../../Layout";
import { Transport } from "../../../inputs/SelectImage";

import { FlatList } from "react-native";
import { useArrayLink } from "../../../../utils/linkUtils";
import Appear from "../../../Appear";
import Button from "../../../Button";
/**
 image: "https://static.av.by/public_images/big/016/25/74/public_16257461_b_fb8d7d4.jpeg",
 name: "DAF XF 95 430",
 year: "2004"
 */

const SelectedTransport = item => {
  const { transport } = useLiveModel();
  const selectedIds = useArrayLink([]);

  useEffect(() => {
    item.update && item.update(selectedIds.value);
  }, [selectedIds.value]);

  return (
    <Layout gap={30}>
        <Text h3>Выберите машины: </Text>
      <FlatList
        data={transport.list}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          const dataItem = {
            id: item.id,
            image: item.photos && item.photos[0],
            name: item.carModel,
            year: item.yearIssue
          };
          const selected = selectedIds.value.includes(item.id);
          return (
            <Transport
              onMultiSelect={() => {
                if (selected) {
                  selectedIds.remove(item.id);
                } else {
                  selectedIds.add(item.id);
                }
              }}
              size={80}
              selected={selected}
              item={dataItem}
            />
          );
        }}
      />
        <Appear visible={selectedIds.value?.length > 0}>
            <Button onPress={() => item.next()}>Далее</Button>
        </Appear>
    </Layout>
  );
};

export default SelectedTransport;
