function Category() {
  const categories = ['전체', '프론트엔드', '백엔드', '디자인', '기획', '기타'];
  return (
    <ul>
      {categories.map((name, index) => {
        return <li key={index}>{name}</li>;
      })}
    </ul>
  );
}

export default Category;
