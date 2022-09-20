import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
} from 'react-native';

export default function Login({ navigation }) {
  const [signInView, setSignInView] = useState(false);

  return !signInView ? (
    <View className="flex-1 bg-softpink">
      <ImageBackground
        className="w-screen h-screen absolute"
        resizeMode="fit"
        source={require('../../assets/fruit-top.png')}
      />
      <View className="rounded-lg w-6/12 h-3/5">
        <Image
          className=""
          source={require('../../assets/fruitmark-logo.png')}
        />
      </View>

      <View className="flex flex-col items- justify-center">
        {/* <Text className="text-lg text-gray-700 text-center font-bold p-3">
          Fruitmark
        </Text> */}
        <Text className="text-lg text-deepgreen text-center font-normal p-3">
          We deliver on-demand organic fresh fruits from nearby stores
        </Text>
      </View>

      <View className="flex flex-col items-center justify-center">
        <View className="w-72 my-4">
          <TouchableOpacity
            className="bg-equator rounded-lg shadow-2xl p-2"
            onPress={() => {
              navigation.navigate('App', { screen: 'Dashboard' });
            }}
          >
            <Text className="text-purewhite text-center text-lg font-semibold">
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
        <View className="w-72">
          <TouchableOpacity
            className="bg-purewhite rounded-lg shadow-2xl p-2"
            onPress={() => setSignInView(true)}
          >
            <Text className="text-deepgreen text-center text-lg font-semibold">
              I'm a Client
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  ) : (
    <SignIn setSignInView={setSignInView} navigation={navigation} />
  );
}

function SignIn({ setSignInView, navigation }) {
  return (
    <View className="flex-1 flex-col justify-center items-center p-3 m-3 bg-softpink">
      <ImageBackground
        className="w-screen h-screen absolute"
        resizeMode="fit"
        source={require('../../assets/bg-fruitmark.png')}
      />
      <View>
        <Text className="text-deepgreen text-xl font-bold text-center">
          Sign In
        </Text>
      </View>

      <View className="w-72">
        <TextInput
          placeholder="Email Address"
          className="bg-purewhite rounded-lg shadow-lg p-2 m-4 text-gray-700"
        />
        <TextInput
          placeholder="Password"
          className="bg-purewhite rounded-lg shadow-lg p-2 m-4 text-gray-700"
        />
      </View>

      <View className="w-64">
        <TouchableOpacity
          className="bg-equator rounded-lg shadow-2xl p-2 m-2"
          onPress={() => {
            navigation.navigate('App', { screen: 'Dashboard' });
          }}
        >
          <Text className="text-purewhite text-center text-md font-semibold">
            Sign In
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-purewhite rounded-lg shadow-2xl p-2 m-2"
          onPress={() => {
            setSignInView(false);
          }}
        >
          <Text className="text-deepgreen text-center text-md font-semibold">
            Later
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
