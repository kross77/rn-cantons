import { useSingleLink } from '@rn-cantons/react-link'
import { Animated, Button, Text, TouchableOpacity } from 'react-native'
import * as React from 'react'
import { useRef } from 'react'
import Layout from '@rn-cantons/layout'
import BottomModal from './index'

const BottomModalExample = () => {
  const animatedLink = useSingleLink(new Animated.Value(0))
  const openLink = useSingleLink(false)
  const optionsLink = useSingleLink(false)
  const modalRef = useRef(null)
  const Header = (props: Layout) => (
    <TouchableOpacity activeOpacity={1} onPress={openLink.cb(true)}>
      <Layout pv={20} w jc ac {...props}>
        <Animated.Text>Hello</Animated.Text>
      </Layout>
    </TouchableOpacity>
  )

  const Content = (props: Layout) => (
    <Layout gap={10} h={200} pv={50} ph={20} w jc {...props}>
      <Text>
        The best Lorem Ipsum Generator in all the sea! Heave this scurvy
        copyfiller fer yar next adventure and cajol yar clients into walking the
        plank with every layout! Configure above, then get yer pirate
        ipsum...own the high seas, arg!
      </Text>
      <Button title="Open" onPress={() => optionsLink.set(true)} />
    </Layout>
  )
  const Options = (props: Layout) => (
    <Layout gap={10} h={200} pv={50} ph={20} w jc {...props}>
      <Text>This is some options</Text>
    </Layout>
  )
  const { current }: { current: any } = modalRef
  return (
    <Layout f1 ac jc>
      <Text>{openLink.value ? 'Open' : 'Close'}</Text>
      <Button title="Open" onPress={() => openLink.set(true)} />
      <Button title="Hide" onPress={() => current?.close()} />
      <Button title="Show" onPress={() => current?.open()} />

      <BottomModal

        modalStyle={{
          marginHorizontal: 20,
          backgroundColor: '#eee',
        }}
        openLink={openLink}
        ref={modalRef}
        Content={Content}
        Header={Header}
        panGestureAnimatedValue={animatedLink.value}
      />
      <BottomModal
        modalStyle={{
          marginHorizontal: 20,
          backgroundColor: '#eee',
        }}
        openLink={optionsLink}
        Content={Options}
      />
    </Layout>
  )
}

export default BottomModalExample
