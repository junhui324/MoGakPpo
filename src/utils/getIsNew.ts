export function getIsNew(createdAt: string) {
  const nowDate = new Date();
  //3일 이내 게시글이라면 true 반환
  nowDate.setDate(nowDate.getDate() - 3);
  const createdAtDate = new Date(createdAt);
  return createdAtDate > nowDate;
}
