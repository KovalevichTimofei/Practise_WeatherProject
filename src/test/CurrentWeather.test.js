'use strict';

import assert from 'assert';
import CurrentWeather from '../components/CurrentWeather/index';
import additional from './CurrentWeather.test.json';

describe('CurrentWeather', () => {

    let tasks = new CurrentWeather();

    test('AddZero should add zero, when number has length 1, and should not do it, if not', () => {
        let input = [1, 2, 3, 4, 10, 15, 29, 30],
            expected = ['01', '02', '03', '04', '10', '15', '29', '30'];

        input.forEach((item, i) => {
            expect(tasks.addZero(item)).toBe(expected[i]);
        });
    });

    test('getWindDirection should return word representation of the wind direction', () => {
        let input = [0, 10, 45, 180],
            expected = ['Норд', 'Норд', 'Норд-ост', 'Зюйд'];

        input.forEach((item, i) => {
            expect(tasks.getWindDirection(item)).toBe(expected[i]);
        });
    });

    test('makeFirstLetterUpper should make first word letter upper', () => {
        let input = ['Word', 'WORD', 'wORD', 'word', 'word-word', 'ddddddddddddddddddd', ',', '1', undefined, null],
            expected = ['Word', 'WORD', 'WORD', 'Word', 'Word-word', 'Ddddddddddddddddddd', ',', '1', undefined, undefined];

        input.forEach((item, i) => {
            expect(tasks.makeFirstLetterUpper(item)).toBe(expected[i]);
        });
    });

    test('shouldRequestServer should not request when it is today and data is actual', () => {
        let input = {
                    "temperature": 21,
                    "date": {
                        "year": 2018,
                        "day": 28,
                        "month": "июня",
                        "monthNumber": 5,
                        "hour": 12
                    },
                    "wind": {"speed": 5, "gust": 8, "direction": "Ост-норд-ост"},
                    "cloudness": "Слегка облачно",
                    "pressure": 1017,
                    "humidity": 73,
                    "sun": {"sunrise": "05:07", "sunset": "n:n"},
                    "icon": "03d"
                },
            dates = [new Date(2018, 5, 28, 12), new Date(2018, 5, 28, 16)];

            dates.forEach((date) => {
                expect(tasks.shouldRequestServer(input, date)).toBe(false);
            });
    });

    test('shouldRequestServer should request when it is not today or we have not data yet', () => {
        let sample = additional.nonActualWeatherSample,
            date = new Date(2018, 5, 28, 12);//, new Date(2018, 5, 28, 16)];

        sample.push(undefined);

        sample.forEach((item) => {
            expect(tasks.shouldRequestServer(item, date)).toBe(true);
        });
    });

    test('shouldRequestServer should request when data is not actual, but we have not data yet', () => {
        let input = undefined,
            date = new Date(2018, 5, 28, 16);

            expect(tasks.shouldRequestServer(input, date)).toBe(true);
    });
});
