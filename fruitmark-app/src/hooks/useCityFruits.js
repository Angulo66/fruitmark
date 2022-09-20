import { useState, useEffect } from 'react';
import { atom, useAtom } from 'jotai';

export const cityFruitsRenderAtom = atom(false);

export default function useCityFruits() {
  const [rerendering, setRerendering] = useAtom(cityFruitsRenderAtom);
  const [loading, setLoading] = useState(true);
  const [cities, setCities] = useState([]);
  const [fruits, setFruits] = useState([]);
  const [cityFruits, setCityFruits] = useState([]);

  useEffect(() => {
    const fetchCityFruits = async () => {
      try {
        const axios = require('axios');
        const res = await axios.get('http://localhost:3000/city_fruits');

        const citiesData = res.data.map((item) => item.city);
        const fruitsData = res.data
          .map((item) => item.fruits)
          .flat()
          .map((item) => item.fruit);

        const fruitsDataUnique = [...new Set(fruitsData)];

        setCities(citiesData);
        setFruits(fruitsDataUnique);
        setCityFruits(res.data);

        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCityFruits();
  }, [rerendering]);

  return { cities, fruits, cityFruits, loading };
}
