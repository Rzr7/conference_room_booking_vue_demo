export const differenceInMinutes = (time1: string, time2: string) => {
  const today = new Date();
  const todayString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  const startTime = new Date(`${todayString} ${time1}`);
  const endTime = new Date(`${todayString} ${time2}`);
  const difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
  return Math.round(difference / 60000);
};
