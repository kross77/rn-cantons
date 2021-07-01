import * as NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";

export type UseConnected = boolean | null | undefined;

const useConnected = (): UseConnected => {
  const [connected, setConnected] = useState<UseConnected>(null);
  useEffect(() => {
    return NetInfo.addEventListener(state => {
      setConnected(state.isConnected && state.isInternetReachable);
    });
  });

  return connected;
};

export default useConnected;
