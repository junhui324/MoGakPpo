import { useEffect, useState, useRef, ChangeEvent, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loginAtom } from '../../recoil/loginState';
import { RiAddCircleFill } from 'react-icons/ri';
import { getUserProfile, updateUserProfile } from '../../apis/Fetcher';
import Stack from "../../components/Stack";
import ROUTES from '../../constants/Routes';
import styles from './updateUser.module.scss';

function UpdateUser() {
  const [userInfo, setUserInfo] = useRecoilState(loginAtom);

  const [userStack, setUserStack] = useState<string[]>([]);
  const [imageSrc, setImageSrc] = useState<string>('');
  const [inputName, setInputName] = useState<string>('');
  const [inputIntroLength, setInputIntroLength] = useState<number>(0);
  const [inputCareerLength, setInputCareerLength] = useState<number>(0);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [imageFile, setImageFile] = useState<File>();

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
      setImageFile(file);
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
        const formData = new FormData();

        formData.append('user_img', imageFile as File);
        formData.append('user_name', inputName.trim());
        formData.append('user_introduction', inputIntroRef.current?.value as string);
        formData.append('user_career_goal', inputCareerRef.current?.value as string);
        formData.append('user_stacks', JSON.stringify(userStack || []));

        await updateUserProfile(formData);

        setUserInfo((prev) => {
          return {
            ...prev,
            user_name: inputName.trim(),
            user_img: imageSrc,
            user_career_goal: inputCareerRef.current?.value as string,
            user_stacks: {
              stackList: userStack || []
            },
            user_introduction: inputIntroRef.current?.value as string
          }
        });

        navigate(`${ROUTES.MY_PAGE}`);
      } catch (error) {
        alert('수정을 실패했습니다.');
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
        setUserInfo((prev) => {
          return {
            ...prev,
            user_name: data.user_name,
            user_img: data.user_img,
            user_career_goal: data.user_career_goal,
            user_stacks: data.user_stacks,
            user_introduction:data.user_introduction,
          }
        });
        setImageSrc(data.user_img);
        setInputName(data.user_name);
        setInputIntroLength(data.user_introduction.length);
        setInputCareerLength(data.user_career_goal.length);
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
      {userInfo && (
        <form className={styles.form} encType="multipart/form-data">
          <div className={styles.imageContainer}>
            <img
              className={styles.image}
              src={imageSrc}
              alt={userInfo.user_name}
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
              defaultValue={userInfo.user_introduction}
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
              defaultValue={userInfo.user_career_goal}
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