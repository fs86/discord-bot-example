import { getRandomInt } from '@helpers';
import { DateTime } from 'luxon';

const now = DateTime.now();

function getDate(subtractDays: number) {
  return now.minus({ days: subtractDays }).toFormat('dd.MM.');
}

export function getJoinLeaveRatioMockData() {
  return Array.from({ length: 7 }, (_x, i) => {
    return { day: getDate(i), joins: getRandomInt(0, 200), leaves: getRandomInt(0, 200) };
  }).reverse();
}
