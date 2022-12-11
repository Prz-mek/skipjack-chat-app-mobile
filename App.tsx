import * as React from 'react';
import { Button, View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import { AuthProvider } from './src/contexts/AuthContext';
import ConversationListScreen from './src/screens/ConversationListScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ContactListScreen from './src/screens/ContactListScreen';
import ConversationScreen from './src/screens/ConversationScreen';
import { MaterialIcons } from '@expo/vector-icons';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { Provider as PaperProvider } from 'react-native-paper';
import ChangeUsernameScreen from './src/screens/ChangeUsernameScreen';
import ChangePasswordScreen from './src/screens/ChangePasswordScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ProfileButton from './src/components/ProfileButton';
import NewContactButton from './src/components/NewContactButton';
import NewConversationButton from './src/components/NewConversationButton';
import AddContactScreen from './src/screens/AddContactScreen';
import CreateConversationScreen from './src/screens/CreateConversationScreen';
import ChangeLanguageScreen from './src/screens/ChangeLanguageScreen';
import "./i18n.config";
import { useTranslation } from 'react-i18next';
import { ConversationsProvider } from './src/contexts/ConversationsContext';
import { SocketProvider } from './src/contexts/SocketContext';


const mainColor = '#f4511e';


// TODO
function ConversationTitle(props: any) {
  return (
    <View style={{ flexDirection: "row" }}>
      <Image
        style={{ width: 40, height: 40, borderRadius: 20, marginRight: 15 }}
        source={{ uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/jeff.jpeg" }}
      />
      <Text style={{ color: "white", fontSize: 18, padding: 5 }}>{props.title}</Text>
    </View>
  );
}

const isAuthenticated = true;

const Stack = createNativeStackNavigator();

export default function App() {

  const { t } = useTranslation();

  return (
    <AuthProvider>
      <SocketProvider>
      <ConversationsProvider>
      <ActionSheetProvider>
        <PaperProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={{
              // headerShown: false,
              headerStyle: {
                backgroundColor: mainColor,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}>
              {isAuthenticated ? (
                <Stack.Group>
                    <Stack.Screen
                      name="InnerTabNavigation"
                      component={InnerTabNavigation}
                      options={({ navigation }) => ({
                        headerShown: false,
                        headerRight: () => (
                          <Button
                            onPress={() => navigation.navigate('Profile')}
                            title="Profile"
                            color="#fff"
                          />
                        ),
                      })}
                    />
                    <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: "Profil" }} />
                    <Stack.Screen name="ChangeLanguage" component={ChangeLanguageScreen} options={{ title: "Change language" }} />
                    <Stack.Screen name="ChangeUsername" component={ChangeUsernameScreen} options={{ title: "Change username" }} />
                    <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ title: "Change password" }} />
                    <Stack.Screen name="ConversationRoom" component={ConversationScreen} options={{
                      headerTitle: () => <ConversationTitle {...{ title: 'Ola' }} />,
                    }} />
                    <Stack.Screen name="AddContact" component={AddContactScreen} options={{ title: "Add new contact" }} />
                    <Stack.Screen name="CreateConversation" component={CreateConversationScreen} options={{ title: "Create group conversation" }} />
                </Stack.Group>
              ) : (
                <Stack.Group>
                  <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                  <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
                </Stack.Group>
              )}

            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </ActionSheetProvider>
      </ConversationsProvider>
      </SocketProvider>
    </AuthProvider>
  );
}

const Tab = createBottomTabNavigator();

function InnerTabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Conversations"
      screenOptions={{
        headerStyle: {
          backgroundColor: mainColor,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: '#f4a15e',
        tabBarStyle: {
          backgroundColor: mainColor
        }
      }}
    >
      <Tab.Screen
        name="Conversations"
        component={ConversationListScreen}
        options={({ navigation }) => ({
          title: "Conversations",
          headerLeft: () => (
            <ProfileButton onPress={() => navigation.navigate('Profile')} />
          ),
          headerRight: () => (
            <NewConversationButton onPress={() => navigation.navigate('CreateConversation')} />
          ),
          tabBarIcon: ({ color }) => <MaterialIcons name="chat-bubble" size={24} color={color} />
        })}
      />
      <Tab.Screen
        name="Contacts"
        component={ContactListScreen}
        options={({ navigation }) => ({
          title: "Contacts",
          headerLeft: () => (
            <ProfileButton onPress={() => navigation.navigate('Profile')} />
          ),
          headerRight: () => (
            <NewContactButton onPress={() => navigation.navigate('AddContact')} />
          ),
          tabBarIcon: ({ color }) => <MaterialIcons name="people-alt" size={24} color={color} />
        })}
      />
    </Tab.Navigator>
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