import Dynamic from "../index";
import React, { useEffect, useState } from "react";
import initStaticModel from "./utils/parseConfig";
import {
  OneLevelObject,
  OneParamCallback,
  ReactComponents,
  Collection
} from "../../../utils/commonTypes";
import groupBy from "../../../utils/groupBy";
import Layout, { ILayout } from "../../Layout";
import { ScrollView } from "react-native";

interface Form {
  values: OneLevelObject;
  model: Collection<any>;
  components: ReactComponents;
  onFormUpdate: OneParamCallback;
  onSelect: OneParamCallback;
}

const groupByRequred = items => {
  if (items) {
    const [required, notRequired] = items.reduce(
      ([r, nr], item) => {
        if (item.defaultValue || item.required) {
          r.push(item);
        } else {
          nr.push(item);
        }
        return [r, nr];
      },
      [[], []]
    );
    return [required, notRequired];
  }
  return [];
};

interface Form {
  items: Collection<any>;
  layout?: ILayout;
  scrollView?: ScrollView;
  components: ReactComponents;
}

const Form = ({
  items,
  wrapper: Wrapper = ScrollView,
  components,
  layout,
  scrollView
}: Form) => {
  const [required, notRequired] = groupByRequred(items);

  const toTags = ({ type, ...item }) => ({ type: "tag", ...item });
  return (
    <Wrapper {...scrollView}>
      <Layout {...layout}>
        <Dynamic components={components} items={required || []} />
        <Layout row flexWrap={"wrap"} justify={"center"}>
          <Dynamic
            components={components}
            items={notRequired ? notRequired.map(toTags) : []}
          />
        </Layout>
      </Layout>
    </Wrapper>
  );
};

export default Form;
