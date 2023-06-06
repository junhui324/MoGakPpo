import { useEffect, useState, useRef, ChangeEvent, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { TypeUserProfile } from '../../interfaces/User.interface';
import { getUserProfile, updateUserProfile } from '../../apis/Fetcher';
import Stack from "../../components/Stack";
import styles from './updateUser.module.scss';
import { RiAddCircleFill } from 'react-icons/ri';
import ROUTES from '../../constants/Routes';
import useBeforeUnload from '../../hooks/useBeforeUnload';
import DefaultUserImg from '../../assets/DefaultUser.png';

function UpdateUser() {
  const [user, setUser] = useState<TypeUserProfile | null>(null);
  const [imageSrc, setImageSrc] = useState<string | undefined>(DefaultUserImg);
  const [userStack, setUserStack] = useState<string[]>([]);
  const [inputNameLength, setInputNameLength] = useState<number>(0);
  const [inputIntroLength, setInputIntroLength] = useState<number>(0);
  const [inputCareerLength, setInputCareerLength] = useState<number>(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputNameRef = useRef<HTMLInputElement>(null);
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
    inputStateSetter: React.Dispatch<React.SetStateAction<number>>,
    max: number
  ) => {
    const { value } = e.target;
    if (value.length <= max && input.current) {
      inputStateSetter(input.current?.value.length);
    }
  };

  const handleSetStackList = (stacks: string[]) => {
    setUserStack(stacks);
  };

  const isValidName = () => {
    if (inputNameRef.current) {
      return inputNameRef.current.value.trim().length > 0;
    }
  };

  const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!isValidName()) {
      return;
    }

    if (window.confirm('수정하시겠습니까?')) {
      try {
        if (inputNameRef.current && inputIntroRef.current && inputCareerRef.current) {
          const updatedUserData = {
            user_img: imageSrc || DefaultUserImg,
            user_name: inputNameRef.current.value.trim(),
            user_introduction: inputIntroRef.current.value || '',
            user_career_goal: inputCareerRef.current.value || '',
            user_stacks: {
              stackList: userStack || [],
            },
          };
  
          await updateUserProfile(updatedUserData);
          navigate(`${ROUTES.MY_PAGE}`);
        }

      } catch (error) {
        console.log(error);
      }
    }
  };

  useBeforeUnload();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await getUserProfile();
        setUser(data);
        setImageSrc(data.user_img || DefaultUserImg);
        setUserStack(data.user_stacks.stackList);
        setInputNameLength(data.user_name.length);
        setInputIntroLength(data.user_introduction.length);
        setInputCareerLength(data.user_career_goal.length);
      } catch (error) {
        console.error(error);
      }
    };

    getUserData();
  }, []);

  const buttonClassName = isValidName() ? styles.submitButton : styles.disabledButton;

  return (
    <div className={styles.container}>
      {user && (
        <form className={styles.form}>
          <div className={styles.imageContainer}>
            <img
              className={styles.image}
              src={imageSrc}
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
              defaultValue={user.user_name}
              ref={inputNameRef}
              placeholder="이름을 입력해 주세요."
              maxLength={MAX_NAME_COUNT}
              onChange={(e) => handleChange(e, inputNameRef, setInputNameLength, MAX_NAME_COUNT)}
            />
            <p>{inputNameLength}/{MAX_NAME_COUNT}</p>
          </div>
          <div className={styles.introContainer}>
            <label>자기소개</label>
            <textarea
              defaultValue={user.user_introduction}
              ref={inputIntroRef}
              placeholder="자기소개를 입력해 주세요."
              maxLength={MAX_INTRO_COUNT}
              onChange={(e) => handleChange(e, inputIntroRef, setInputIntroLength, MAX_INTRO_COUNT)}
            />
            <p>{inputIntroLength}/{MAX_INTRO_COUNT}</p>
          </div>
          <div className={styles.CareerContainer}>
            <label>원하는 직군</label>
            <input
              type="text"
              defaultValue={user.user_career_goal}
              ref={inputCareerRef}
              placeholder="원하는 직군을 입력해 주세요."
              maxLength={MAX_CAREER_COUNT}
              onChange={(e) => handleChange(e, inputCareerRef, setInputCareerLength, MAX_CAREER_COUNT)}
            />
            <p>{inputCareerLength}/{MAX_CAREER_COUNT}</p>
          </div>
          <Stack selectedStack={userStack} setStackList={handleSetStackList} />
          <button className={buttonClassName} onClick={handleSubmit} disabled={!isValidName()}>
            완료
          </button>
        </form>
      )}
    </div>
  );
}

export default UpdateUser;