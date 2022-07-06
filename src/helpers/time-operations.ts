export const differenceInMinutes = (time1: string, time2: string) => {
  const today = new Date();
  const todayString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  const startTime = new Date(`${todayString} ${time1}`);
  const endTime = new Date(`${todayString} ${time2}`);
  const difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
  return Math.round(difference / 60000);
};

export const incrementDuration = (datetime: string | Date, duration: number) => {
  const date = new Date(datetime);
  if (date.toString() === 'Invalid Date') return '';
  date.setMinutes(date.getMinutes() + duration);
  return date;
};

export const getHumanDateTime = (datetime: string | Date) => {
  const date = new Date(datetime);
  if (date.toString() === 'Invalid Date') return '';
  return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
};

export const getHumanTime = (datetime: string | Date) => {
  const date = new Date(datetime);
  if (date.toString() === 'Invalid Date') return '';
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
};

export const getRequestDate = (datetime: string | Date) => {
  const date = new Date(datetime);
  if (date.toString() === 'Invalid Date') return '';
  return `${date.getFullYear()}-${String(date.getMonth()).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};
