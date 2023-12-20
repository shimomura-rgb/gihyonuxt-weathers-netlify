import type {City} from "@/interfaces";

export const useWeatherInfoFetcher = (city: City) => {
	const config = useRuntimeConfig();
	const asyncData = useLazyAsyncData(
		`useWeatherInfoFetcher-${city.id}`,
		(): Promise<any> => {
			// const weatherInfoUrl = "https://api.openweathermap.org/data/2.5/weather";
			const params:{
				lang: string;
				q: string;
				appid: string;
			} =
			{
				lang: "ja",
				q: city.q,
				//APIキーのクエリパラメータ。ここに各自の文字列を記述する!!
				// appId: "xxxxxx"
				appid: config.public.weathermapAppid
			}
			const queryParams = new URLSearchParams(params);
			// const urlFull = `${weatherInfoUrl}?${queryParams}`;
			const urlFull = `${config.public.weatherInfoUrl}?${queryParams}`;
			const response = $fetch(urlFull);
			return response;
		},
		{
			transform: (data): string => {
				const weatherArray = data.weather;
				const weather = weatherArray[0];
				return weather.description;
			}
		}
	);
	return asyncData;
};
// export const useWeatherInfoFetcher = (city: City) => {
// 	const config = useRuntimeConfig();
// 	const params:{
// 		lang: string;
// 		q: string;
// 		appid: string;
// 	} =
// 	{
// 		lang: "ja",
// 		q: city.q,
// 		appid: config.public.weathermapAppid
// 	}
// 	const asyncData = useLazyFetch(
// 		config.public.weatherInfoUrl,
// 		{
// 			key: `useWeatherInfoFetcher-${city.id}`,
// 			params: params,
// 			transform: (data: any): string => {
// 				const weatherArray = data.weather;
// 				const weather = weatherArray[0];
// 				return weather.description;
// 			}
// 		}
// 	);
// 	return asyncData;
// };
