import { useEffect, useState, useRef, ChangeEvent } from 'react';
import { TypeUserProfile } from '../../interfaces/User.interface';
import { getUserProfile } from '../../apis/Fetcher';
import Stack from "../../components/Stack";
import styles from './updateUser.module.scss';
import { RiAddCircleFill } from 'react-icons/ri';

function UpdateUser() {
  const [user, setUser] = useState<TypeUserProfile>();
  const [imageSrc, setImageSrc] = useState(user?.user_img);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  const getUserData = async () => {
    try {
      const userList = await getUserProfile();
      setUser(userList);
      setImageSrc(userList.user_img);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img 
          className={styles.image} 
          src={imageSrc} 
          alt={user?.user_name}
          onClick={handleImageChange}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className={styles.fileInput}
          ref={fileInputRef}
        />
        <RiAddCircleFill 
          className={styles.addButton} 
          onClick={handleImageChange} 
        />
      </div>
      <form className={styles.form}>
        <label>이름</label>
        <input 
          type="text" 
          defaultValue={user?.user_name}
          placeholder="이름을 입력해 주세요."
        />
        <label>자기소개</label>
        <textarea
          defaultValue={user?.user_introduction}
          placeholder="자기소개를 입력해 주세요."
        />
        <label>원하는 직군</label>
        <input 
          type="text" 
          defaultValue={user?.user_career_goal}
          placeholder="원하는 직군을 입력해 주세요."
        />
        <Stack />
      </form>
    </div>
  )
}

export default UpdateUser;