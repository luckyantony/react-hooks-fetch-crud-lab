import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const handleCorrectAnswerChange = (event) => {
    const newCorrectIndex = parseInt(event.target.value);

    const updatedQuestion = { ...question, correctIndex: newCorrectIndex };
    onUpdateQuestion(updatedQuestion); 

    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    })
      .then(response => {
        if (!response.ok) {
          console.error("Error updating question:", response.status);
        }
        return response.json();
      })
      .catch(error => console.error("Error updating question:", error));
  };

  const handleDeleteClick = () => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          onDeleteQuestion(id);
        } else {
          console.error("Error deleting question:", response.status);
        }
      })
      .catch(error => console.error("Error deleting question:", error));
  };

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={correctIndex} onChange={handleCorrectAnswerChange}>
          {options}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;