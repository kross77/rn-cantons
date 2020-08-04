/**
 * @format
 */

import {AppRegistry} from 'react-native';
import { Text} from 'react-native'
import Layout from '@rn-cantons/layout';
import {name as appName} from './app.json';

const App = () => <Layout wh ac jc>
    <Text>It is working </Text>
</Layout>

AppRegistry.registerComponent(appName, () => App);
