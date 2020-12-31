import Layout from '@rn-cantons/layout'
import { Button, Text } from 'react-native'
import React from 'react'
import { useSingleLink } from '@rn-cantons/react-link'
import Modals, { UseModals } from './index'

const ModalsExample = () => {
  const Content = (props: any) => (
    <Layout gap={10} h={200} pv={50} ph={20} w jc {...props}>
      <Text>
        The best Lorem Ipsum Generator in all the sea! Heave this scurvy
        copyfiller fer yar next adventure and cajol yar clients into walking the
        plank with every layout! Configure above, then get yer pirate
        ipsum...own the high seas, arg!
      </Text>
    </Layout>
  )
  return (
    <Modals>
      <Layout f1 ac jc>
        <UseModals>
          {(modals) => (
            <Layout>
              <Text>{modals.value.length}</Text>
              <Button title="Open" onPress={() => modals.add(Content)} />
            </Layout>
          )}
        </UseModals>
      </Layout>
    </Modals>
  )
}

export default ModalsExample
