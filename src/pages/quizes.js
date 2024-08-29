import React, { useEffect, useState } from "react";
import { Button, Modal, List, message } from "antd";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("https://opentdb.com/api.php?amount=10&difficulty=easy");
        const data = await response.json();
        setQuestions(data.results);
      } catch (error) {
        message.error("Failed to fetch questions");
      }
    };
    fetchQuestions();
  }, []);

  const showModal = (index) => {
    setCurrentIndex(index);
    setCurrentQuestion(questions[index]);
    setIsModalVisible(true);
  };

  const handleAnswerClick = (answer) => {
    if (answer === currentQuestion.correct_answer) {
      message.success("Correct!");
    } else {
      message.error("Wrong answer!");
    }
    setIsModalVisible(false);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentQuestion(questions[currentIndex + 1]);
    } else {
      message.success("Quiz completed!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <List
        bordered
        dataSource={questions}
        renderItem={(item, index) => (
          <List.Item onClick={() => showModal(index)} style={{ cursor: "pointer" }}>
            {item.question}
          </List.Item>
        )}
      />
      <Modal
        title="Question"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <h3>{currentQuestion?.question}</h3>
        {currentQuestion?.type === "multiple" &&
          currentQuestion?.incorrect_answers.concat(currentQuestion?.correct_answer).map((answer, index) => (
            <Button key={index} onClick={() => handleAnswerClick(answer)} style={{ margin: "5px" }}>
              {answer}
            </Button>
          ))}
        {currentQuestion?.type === "boolean" &&
          ["True", "False"].map((answer, index) => (
            <Button key={index} onClick={() => handleAnswerClick(answer)} style={{ margin: "5px" }}>
              {answer}
            </Button>
          ))}
      </Modal>
    </div>
  );
};

export default Quiz;
