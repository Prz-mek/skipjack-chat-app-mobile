import * as React from 'react';
import { Button, View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FlatList, StyleSheet } from 'react-native';
import { ConversationsProvider, useConversations } from './contexts/ConversationsContext';
import { SocketProvider } from './contexts/SocketContext';
import { AuthProvider } from './contexts/AuthContext';
import ConversationListItem from './components/ConversationListItem';

function ProfileScreen({ navigation }: any) {
  //const {itemId, otherParam} = route.params;
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => setCount((c) => c + 1)} title="Update count" />
      ),
    });
  }, [navigation]);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* <Text>My id is: {itemId}</Text> */}
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details')}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
      <Text>Count: {count}</Text>
    </View>
  );
}

function ConversationTitle(props: any) {
  return (
    <View style={{ flexDirection: "row" }}>
      <Image
        style={{ width: 50, height: 50 }}
        source={require('./assets/icon.png')}
      />
      <Text>{props.title}</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
        <Stack.Group>
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={({ navigation }) => ({
              headerRight: () => (
                <Button
                  onPress={() => navigation.navigate('Profile')}
                  title="Profile"
                  color="#fff"
                />
              ),
            })}
          />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{
            headerTitle: () => <ConversationTitle {...{ title: 'My Profile' }} />,
          }} />
        </Stack.Group>

      </Stack.Navigator>
    </NavigationContainer>
    </AuthProvider>
  );
}


function ConversationsScreen() {
    const { conversations } = useConversations();

  return (
    <View style={styles.container}>
      <FlatList style={{ width: '100%' }} data={conversations} renderItem={({ item }) => <ConversationListItem chatRoom={item} />} />
    </View>
  );
}

function ContactsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Contacts</Text>
    </View>
  );
}

function ConversationScreen() {
  return<></>;
}

function CreateConvesationScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Contacts</Text>
    </View>
  );
}

function ContactScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Contacts</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function Dashboard() {
  return (
    <SocketProvider>
      <ConversationsProvider>
        <Tab.Navigator>
          <Tab.Screen name="Conversations" component={ConversationsScreen} />
          <Tab.Screen name="Contacts" component={ContactsScreen} />
        </Tab.Navigator>
      </ConversationsProvider>
    </SocketProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});