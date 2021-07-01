import { default as React } from "react";
import Layout from "../../../Layout";
import Tags from "./components/Tags";
import { ReactComponents } from "../../../../utils/commonTypes";
import { ApplicationForm } from "../../model";
import Icons from "../../../Icons";
import Block from "@kross77/rn-block/dist";
import { TouchableOpacity, View } from "react-native";
import createTypeComponent from "../../../../utils/createTypeComponent";
import { selectedComponents } from "../selected";
import Button from "../../../Button";
import Text from "../../../Text";
import Colors from "../../../Colors";

interface PopupContent {
  model: ApplicationForm;
  components: ReactComponents;
  isTags: boolean;
}

export const SelectedComponents = createTypeComponent(selectedComponents);

export const didMountWrapper = (Wrapped, mes = "") =>
  class extends React.Component {
    componentDidMount(): void {}

    render() {
      return <Wrapped {...this.props} />;
    }
  };

const PopupContent = ({
  requiredFieldsFilledConfirmation = true,
  isTags = true,
  model,
}: PopupContent) => {
  return (
    <Layout>
      <View
        style={{ width: '100%', minHeight: 250}}
        keyboardShouldPersistTaps={'always'}
        overScrollMode={'always'}
        showsVerticalScrollIndicator={true}
      >
        <SelectedComponents {...model.selectedItem} />

        {/*{model.selectedItem?.validationError && <Text>⚠️{model.selectedItem.validationError}</Text>}*/}
        {isTags && model.items.length > 1 && (
          <Layout
            justify={"center"}
            flexWrap={"wrap"}
            pv={15}
            align={"center"}
            width={"auto"}
            row
            gap={10}
          >
            {model.items.map(Tags)}
          </Layout>
        )}
      </View>
    </Layout>
  );
};

export default PopupContent;
