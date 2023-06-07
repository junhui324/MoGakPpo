import { useEffect, useState, useRef, ChangeEvent, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiAddCircleFill } from 'react-icons/ri';
import { TypeUserProfile } from '../../interfaces/User.interface';
import { getUserProfile, updateUserProfile } from '../../apis/Fetcher';
import Stack from "../../components/Stack";
import ROUTES from '../../constants/Routes';
import styles from './updateUser.module.scss';
import DefaultUserImg from '../../assets/DefaultUser.png';

function UpdateUser() {
  const [user, setUser] = useState<TypeUserProfile>({} as TypeUserProfile);
  const [imageSrc, setImageSrc] = useState<string>(DefaultUserImg);
  const [userStack, setUserStack] = useState<string[]>([]);
  const [inputName, setInputName] = useState<string>('');
  const [inputIntroLength, setInputIntroLength] = useState<number>(0);
  const [inputCareerLength, setInputCareerLength] = useState<number>(0);
  const [isValid, setIsValid] = useState<boolean>(true);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputIntroRef = useRef<HTMLTextAreaElement>(null);
  const inputCareerRef = useRef<HTMLInputElement>(null);

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
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    input: React.RefObject<HTMLInputElement | HTMLTextAreaElement>,
    max: number
  ) => {
    switch (input.current?.name) {
      case 'intro': {
        const { value } = e.target;
        if (value.length <= max && input.current) {
          setInputIntroLength(input.current?.value.length);
        }
        break;
      }
      case 'career': {
        const { value } = e.target;
        if (value.length <= max && input.current) {
          setInputCareerLength(input.current?.value.length);
        }
        break;
      }
    }
  };

  const handleSetStackList = (stacks: string[]) => {
    setUserStack(stacks);
  };

  const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (isValid && window.confirm('수정하시겠습니까?')) {
      try {
          const updatedUserData = {
            user_img: imageSrc || DefaultUserImg,
            user_name: inputName.trim(),
            user_introduction: inputIntroRef.current?.value || '',
            user_career_goal: inputCareerRef.current?.value || '',
            user_stacks: {
              stackList: userStack || [],
            },
          };
  
          await updateUserProfile(updatedUserData);
          navigate(`${ROUTES.MY_PAGE}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCancel = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    
    if (window.confirm('취소 하시겠습니까?')) {
      navigate(`${ROUTES.MY_PAGE}`);
    }
  }

  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await getUserProfile();
  
        if (data.user_stacks && data.user_stacks.stackList) {
          setUserStack(data.user_stacks.stackList);
        } else {
          setUserStack([]);
        }

        if (data.user_introduction) {
          setInputIntroLength(data.user_introduction.length);
        } else {
          setInputIntroLength(0);
        }

        if (data.user_career_goal) {
          setInputCareerLength(data.user_career_goal.length);
        } else {
          setInputCareerLength(0);
        }
  
        setUser(data);
        setImageSrc(data.user_img || DefaultUserImg);
        setInputName(data.user_name);
      } catch (error) {
        console.log(error);
      }
    };
  
    getUserData();
  }, []);

  useEffect(() => {
    setIsValid(inputName.length !== 0);
  }, [inputName]);

  return (
    <div className={styles.container}>
      {user && (
        <form className={styles.form}>
          <div className={styles.imageContainer}>
            <img
              className={styles.image}
              src={imageSrc || DefaultUserImg}
              alt={user.user_name}
              onClick={handleImageChange}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className={styles.fileInput}
              ref={fileInputRef}
            />
            <RiAddCircleFill className={styles.addButton} onClick={handleImageChange} />
          </div>
          <div className={styles.nameContainer}>
            <label className={styles.name}>이름</label>
            <input
              type="text"
              name="name"
              value={inputName}
              placeholder="이름을 입력해 주세요."
              maxLength={MAX_NAME_COUNT}
              onChange={(e) => setInputName(e.target.value)}
            />
            <p>{inputName.length}/{MAX_NAME_COUNT}</p>
          </div>
          <div className={styles.introContainer}>
            <label>자기소개</label>
            <textarea
              name="intro"
              defaultValue={user.user_introduction}
              ref={inputIntroRef}
              placeholder="자기소개를 입력해 주세요."
              maxLength={MAX_INTRO_COUNT}
              onChange={(e) => handleChange(e, inputIntroRef, MAX_INTRO_COUNT)}
            />
            <p>{inputIntroLength}/{MAX_INTRO_COUNT}</p>
          </div>
          <div className={styles.CareerContainer}>
            <label>원하는 직군</label>
            <input
              type="text"
              name="career"
              defaultValue={user.user_career_goal}
              ref={inputCareerRef}
              placeholder="원하는 직군을 입력해 주세요."
              maxLength={MAX_CAREER_COUNT}
              onChange={(e) => handleChange(e, inputCareerRef, MAX_CAREER_COUNT)}
            />
            <p>{inputCareerLength}/{MAX_CAREER_COUNT}</p>
          </div>
          <Stack selectedStack={userStack} setStackList={handleSetStackList} />
          <button 
            className={isValid ? styles.submitButton : styles.disabledButton} 
            onClick={handleSubmit} 
            disabled={!isValid}
          >
            완료
          </button>
          <button className={styles.cancelButton} onClick={handleCancel}>
            취소
          </button>
        </form>
      )}
    </div>
  );
}

export default UpdateUser;