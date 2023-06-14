import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './chatBot.module.scss';
import { IoIosClose } from 'react-icons/io';
import chatData from './chatBot.json';
import Logo from '../../assets/Character.png';
import ROUTES from '../../constants/Routes';

function ChatBot() {
  const navigate = useNavigate();
  const [showChatBox, setShowChatBox] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [selectedLink, setSelectedLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setShowChatBox((prev) => !prev);
    setIsLoading((prev) => !prev);
  };

  const handleQuestionClick = (question: string) => {
    setSelectedQuestion(question);
    const selected = chatData.find((item) => item.question === question);

    if (selected) {
      setSelectedAnswer(selected.answers as string);
      setSelectedLink(selected.link as string);
    }
  };

  const handleLinkClick = (link: string) => {
    const selected = chatData.find((item) => item.link === link);

    switch(selected?.to) {
      case '/projects': {
        navigate(`${ROUTES.PROJECT_LIST}`);
        break;
      }
      case '/portfolios': {
        navigate(`${ROUTES.PORTFOLIO_LIST}`);
        break;
      }
      case '/main/portfolios': {
        navigate(`${ROUTES.MAIN}`);

        const hotProtfolioElement = document.getElementById('HotPortfolio');

        if (hotProtfolioElement) {
          const yOffset = -100;
          const y = hotProtfolioElement.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
        break;
      }
      case '/main/stacks': {
        navigate(`${ROUTES.MAIN}`);
        const bestStackElement = document.getElementById('BestStack');

        if (bestStackElement) {
          const yOffset = -100;
          const y = bestStackElement.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
        break;
      }

      case '/email': {
        const mailtoUrl = `mailto:moppe_help@elice.com`;
        window.location.href = mailtoUrl;
        break;
      }
    }
  }

  useEffect(() => {
    setSelectedQuestion('');
    setSelectedAnswer('');
  }, [isLoading]);
  
  return (
    <div className={styles.stickyButtonWrapper}>
      {showChatBox ? (
        <div className={styles.chatContainer}>
          <div className={styles.header}>
            <div>모프</div>
            <IoIosClose onClick={handleClick}/>
          </div>
          <div className={styles.body}>
            <div className={styles.question}>{chatData[0].question}</div>
            <div className={styles.questionWrapper} >
              {chatData.map((v, i) => {
                if (i >= 1) {
                  return (
                      <div 
                        className={styles.questionButton}
                        key={i}
                        onClick={() => handleQuestionClick(v.question)}
                      >
                        {v.question}
                      </div>
                  )
                }
              })}
            </div>
            {selectedQuestion 
              ? (<div>
                  <div className={styles.question}>{selectedQuestion}을(를) 물어보셨네요!</div>
                  <div className={styles.answer}>{selectedAnswer}</div>
                  {selectedLink ? <div className={styles.link} onClick={() => handleLinkClick(selectedLink)}>{selectedLink}</div>: ''}
                </div>)
              : ''
            }
          </div>
        </div>
      ) : (
        <button className={styles.chatButton} onClick={handleClick}>
          <img src={Logo} />
        </button>
      )}
    </div>
  );
}

export default ChatBot;