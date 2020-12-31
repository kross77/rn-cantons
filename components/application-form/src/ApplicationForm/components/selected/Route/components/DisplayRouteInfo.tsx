import Layout from "../../../../../Layout";
import Icons from "../../../../../Icons";
import Text from "../../../../../Text";
import * as React from "react";
import withErrorBoundary from "../../../../../../utils/withErrorBoundary";

export const distanceToLabel = (v: number) => `${Math.round(v / 10) * 10} км`;
export const durationToLabel = (num: number) => {
    const hours = (num / 60);
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);
    return `${rhours} ч. ${rminutes} мин.`;
}


const DisplayRouteInfo = withErrorBoundary(({ points, routeInfo }) => {
  return points && points.length >= 2 ? (
    <Layout row>
      <Layout flex={1} gap={5}>
        <Icons name={"location"} size={30} />
        <Text h6>{distanceToLabel(routeInfo.distance)} </Text>
      </Layout>
      <Layout flex={1} gap={5}>
        <Icons name={"clock"} size={30} />
        <Text h6>{durationToLabel(routeInfo.duration)}</Text>
      </Layout>
    </Layout>
  ) : null;
});

export default DisplayRouteInfo;
