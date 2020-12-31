import TagWrapper from "./TagWrapper";
import Icons from "../../../../Icons";
import Colors from "../../../../Colors";
import { default as React } from "react";

const Tags = props => {

  return (
    <TagWrapper
      key={props.key}
      filled={props.fill !== undefined}
      fill={props.fill}
      onPress={props.select}
      active={props.selected}
      next={props.next}
    >
      <Icons
        size={20}
        color={props.fill ? Colors.W100 : Colors.B800}
        name={props.icon}
      />
    </TagWrapper>
  );
};

export default Tags;
