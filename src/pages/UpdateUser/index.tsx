import { useEffect, useState, useRef, ChangeEvent, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { TypeUserProfile } from '../../interfaces/User.interface';
import { getUserProfile, updateUserProfile } from '../../apis/Fetcher';
import Stack from "../../components/Stack";
import styles from './updateUser.module.scss';
import { RiAddCircleFill } from 'react-icons/ri';
import ROUTES from '../../constants/Routes';

function UpdateUser() {
  const [user, setUser] = useState<TypeUserProfile>();
  const [imageSrc, setImageSrc] = useState(user?.user_img);
  const [userStack, setUserStack] = useState<string[]>(user?.user_stacks.stackList ?? []);
  const [inputName, setInputName] = useState<string>('');
  const [inputIntro, setInputIntro] = useState<string>('');
  const [inputCareer, setInputCareer] = useState<string>('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const MAX_NAME_COUNT = 50;
  const MAX_INTRO_COUNT = 250;
  const MAX_CAREER_COUNT = 50;

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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    max: number,
    title: string
  ) => {
    const { value } = e.target;
    if (value.length <= max) {
      switch (title) {
        case 'name': {
          setInputName(value);
          break;
        }
        case 'intro': {
          setInputIntro(value);
          break;
        }
        case 'career': {
          setInputCareer(value);
          break;
        }
      }
    }
  };

  const handleSetStackList = (stacks: string[]) => {
    setUserStack(stacks);
  };

  const getUserData = async () => {
    try {
      const userList = await getUserProfile();
      setUser(userList);
    } catch (error) {
      console.error(error);
    }
  };

  const updatedUserData = {
    user_img: imageSrc || '',
    user_name: inputName,
    user_introduction: inputIntro || '',
    user_career_goal: inputCareer || '',
    user_stacks: {
      stackList: userStack || [],
    },
  };
  
  const handleSumbit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    
    if (window.confirm('수정하시겠습니까?')) {
      try {
        await updateUserProfile(updatedUserData);
      } catch (error) {
        console.log(error);
      }

      navigate(`${ROUTES.MY_PAGE}`);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (user) {
      setImageSrc(user.user_img);
      setInputName(user.user_name);
      setInputIntro(user.user_introduction);
      setInputCareer(user.user_career_goal);
      setUserStack(user.user_stacks.stackList);
    }
  }, [user]);

  return (
    <div className={styles.container}>
      <form className={styles.form}>
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
        <div className={styles.nameContainer}>
          <label className={styles.name}>이름</label>
          <input 
            type="text" 
            value={inputName}
            placeholder="이름을 입력해 주세요."
            maxLength={MAX_NAME_COUNT}
            onChange={(e) => handleChange(e, MAX_NAME_COUNT, 'name')}
          />
          <p>{inputName.length}/{MAX_NAME_COUNT}</p>
        </div>
        <div className={styles.introContainer}>
          <label>자기소개</label>
          <textarea
            value={inputIntro}
            placeholder="자기소개를 입력해 주세요."
            maxLength={MAX_INTRO_COUNT}
            onChange={(e) => handleChange(e, MAX_INTRO_COUNT, 'intro')}
          />
          <p>{inputIntro.length}/{MAX_INTRO_COUNT}</p>
        </div>
        <div className={styles.CareerContainer}>
          <label>원하는 직군</label>
          <input 
            type="text" 
            value={inputCareer}
            placeholder="원하는 직군을 입력해 주세요."
            maxLength={MAX_CAREER_COUNT}
            onChange={(e) => handleChange(e, MAX_CAREER_COUNT, 'career')}
          />
          <p>{inputCareer.length}/{MAX_CAREER_COUNT}</p>
        </div>
        <Stack 
          selectedStack={userStack}
          setStackList={handleSetStackList}
        />
        <button 
          className={styles.submitButton}
          onClick={handleSumbit}
        >
          완료
        </button>
      </form>
    </div>
  )
}

export default UpdateUser;