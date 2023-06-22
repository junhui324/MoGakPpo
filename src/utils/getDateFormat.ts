const getKorDay = (day: number) => {
  switch (day) {
    case 0:
      return '일요일';
    case 1:
      return '월요일';
    case 2:
      return '화요일';
    case 3:
      return '수요일';
    case 4:
      return '목요일';
    case 5:
      return '금요일';
    case 6:
      return '토요일';
  }
};

const checkAmPm = (hour: number) => {
  const ampm = hour < 12 ? '오전' : '오후';
  hour = hour % 12;
  hour = hour === 0 ? 12 : hour;
  return `${ampm} ${hour}`;
};

const getDateFormat = (createdAt: string) => {
  try {
    const newDate = new Date(createdAt);

    return `
      ${newDate.getFullYear()}년 
      ${Number(newDate.getMonth()) + 1}월 
      ${newDate.getDate()}일
      ${getKorDay(newDate.getDay())}
      ${checkAmPm(newDate.getHours())}:${newDate.getMinutes()}:${newDate.getSeconds()}
    `;
  } catch (error) {
    console.error(error);
    return '유효한 날짜가 아닙니다.';
  }
};

export default getDateFormat;
