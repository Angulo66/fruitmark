import { useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { atom, useAtom } from 'jotai';
import useCityFruits from '../hooks/useCityFruits';

export default function Dashboard() {
  return (
    <View className="container flex-1 justify-center min-w-full">
      <DataTable />
    </View>
  );
}

export const dashboardAtom = atom(false);

function DataTable() {
  const [status, setStatus] = useAtom(dashboardAtom);
  const { cityFruits } = useCityFruits();

  useEffect(() => {
    console.log('rerendering');
  }, [status]);

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: '5%',
      }}
      className="w-full flex flex-col bg-softpink"
    >
      {cityFruits.map((item, index) => (
        <View
          key={item + '' + index}
          className="my-2 shadow-xl rounded-xl w-11/12 border-deepgreen p-2 bg-purewhite"
        >
          <View className="justify-center items-center">
            <Text className="text-lg font-bold text-mandy">{item?.city}</Text>
          </View>
          <View>
            {item.fruits.map((_item, _index) => (
              <>
                <View
                  key={_item + '' + _index}
                  className="flex flex-row bg-softpink rounded-lg p-2 m-1"
                >
                  <Text className="text-md font-semibold text-deepgreen">
                    {_item?.quantity}{' '}
                  </Text>
                  <Text className="text-md font-semibold text-deepgreen">
                    {_item?.fruit}'s
                  </Text>
                </View>
              </>
            ))}
            <View className="flex flex-row justify-end p-2">
              <Text className="text-md font-semibold text-mandy">
                Total: {item?.sum}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
