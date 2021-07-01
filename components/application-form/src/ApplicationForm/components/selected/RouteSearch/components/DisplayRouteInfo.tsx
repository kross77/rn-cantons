import Layout from "../../../../../Layout";
import Icons from "../../../../../Icons";
import Text from "../../../../../Text";
import * as React from "react";
import withErrorBoundary from "../../../../../../utils/withErrorBoundary";

const DisplayRouteInfo = withErrorBoundary(({ points, routeInfo }) => {
  return points && points.length >= 2 ? (
    <Layout row>
      <Layout flex={1} gap={5}>
        <Icons name={"location"} size={30} />
        <Text h6>{`${Math.round(routeInfo.distance / 10) * 10} км`} </Text>
      </Layout>
      <Layout flex={1} gap={5}>
        <Icons name={"clock"} size={30} />
        <Text h6>
          {`${Math.round((routeInfo.duration * 10) / 60) / 10} часов`}{" "}
        </Text>
      </Layout>
    </Layout>
  ) : null;
});

export default DisplayRouteInfo;
