import { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { NativeWindStyleSheet } from 'nativewind';
import { useAtom, atom } from 'jotai';
import useCityFruits from '../hooks/useCityFruits';

const fromCityAtom = atom('');
const toCityAtom = atom('');
const fruitAtom = atom('');
const quantityAtom = atom(0);
export const openTransferAtom = atom(false);

export default function TransferFruits() {
  const { cities, fruits, cityFruits } = useCityFruits();
  const [fromCity] = useAtom(fromCityAtom);
  const [toCity] = useAtom(toCityAtom);
  const [fruit] = useAtom(fruitAtom);
  const [quantity, setQuantity] = useAtom(quantityAtom);

  const transferFruit = async () => {
    try {
      const axios = require('axios');
      await axios.post('http://localhost:3000/city_fruits/transfer', {
        cityA: fromCity,
        cityB: toCity,
        fruit,
        quantity,
      });

      Alert.alert(
        `${quantity} ${fruit} Transfered from ${fromCity} to ${toCity}`
      );
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: '5%',
      }}
      className="flex flex-col bg-softpink"
    >
      <View className="bg-purewhite rounded-xl shadow-xl py-10">
        <Transfer
          label="Select Source Store"
          data={cities}
          dataType="fromCity"
        />
        <Transfer
          label="Select Destination Store"
          data={cities}
          dataType="toCity"
        />
        <Transfer label="Select Fruit to Transfer" data={fruits} />
        <View className="flex flex-col justify-center items-center">
          <Text className="text-center text-deepgreen font-semibold pb-1">
            Amount to Transfer
          </Text>
          <TextInput
            className="bg-purewhite h-10 px-5 pr-16 rounded-lg text-sm shadow-lg w-72"
            placeholder="Amount"
            onChangeText={(text) => setQuantity(Number(text))}
          />
        </View>
      </View>
      <View className="pt-10 w-72">
        <TouchableOpacity
          onPress={() => {
            transferFruit();
          }}
          className="bg-equator py-2 px-4 rounded-lg w-full shadow-lg"
        >
          <Text className="text-purewhite font-bold text-lg text-center">
            Transfer
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function Transfer({ label, data, dataType }) {
  const [selected, setSelected] = useState('Select ');
  const [open, setOpen] = useState(false);

  const [, setFromCity] = useAtom(fromCityAtom);
  const [, setToCity] = useAtom(toCityAtom);
  const [, setFruit] = useAtom(fruitAtom);

  function handleSelect(value) {
    if (dataType === 'fromCity') {
      setFromCity(value);
    } else if (dataType === 'toCity') {
      setToCity(value);
    } else {
      setFruit(value);
    }
    setSelected(value);
    setOpen(false);
  }

  return (
    <View className="bg-red-400 items-center justify-center p-4 m-4 rounded-xl shadow-xl">
      <Text className="text-md text-deepgreen font-semibold">{label}</Text>
      <View className="w-72">
        <View className="mt-1">
          <TouchableOpacity
            onPress={() => setOpen(!open)}
            className="relative w-full rounded-lg bg-purewhite py-2 pl-3 pr-10 text-left shadow-md text-l"
          >
            <View className="flex flex-row justify-between">
              <Text className="text-deepgreen font-semibold text-sm">
                {' '}
                {selected ? selected : ''}{' '}
              </Text>
            </View>
          </TouchableOpacity>
          {open && (
            <FlatList
              className="mt-1 w-full rounded-md bg-purewhite py-1 shadow-lg"
              data={data}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    handleSelect(item);
                  }}
                >
                  <Text
                    className={`block truncate py-2 pl-10 pr-4 ${
                      selected === item
                        ? 'font-medium text-purewhite bg-equator'
                        : 'font-normal text-deepgreen'
                    }`}
                  >
                    {data ? item : ''}
                  </Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </View>
    </View>
  );
}

NativeWindStyleSheet.setOutput({
  default: 'native',
});
