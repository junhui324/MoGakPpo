import React, { useState } from 'react';
import styles from './chatBot.module.scss';
import { BsChatHeartFill } from 'react-icons/bs';
import { IoIosClose } from 'react-icons/io';
import chatData from './chatBot.json';

function ChatBot() {
  const [showChatBox, setShowChatBox] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const handleClick = () => {
    setShowChatBox((prev) => !prev);
  };

  const handleQuestionClick = (question: string) => {
    setSelectedQuestion(question);
    const selected = chatData.find((item) => item.question === question);
    return selected 
    ? setSelectedAnswer(selected.answers as string) 
    : '이런 답변을 가져오지 못했어요';
  };
  
  return (
    <div className={styles.stickyButtonWrapper}>
      {showChatBox ? (
        <div className={styles.chatContainer}>
          <div className={styles.header}>
            <IoIosClose onClick={handleClick}/>
          </div>
          <div className={styles.body}>
            <div className={styles.question}>{chatData[0].question}</div>
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
            {selectedQuestion 
              ? (<div>
                  <div className={styles.question}>{selectedQuestion}을(를) 물어보셨네요!</div>
                  <div className={styles.answer}>{selectedAnswer}</div>
                </div>)
              : ''
            }
          </div>
        </div>
      ) : (
        <button className={styles.chatButton} onClick={handleClick}>
          <BsChatHeartFill />
        </button>
      )}
    </div>
  );
}

export default ChatBot;
