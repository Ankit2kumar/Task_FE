import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom'; 
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import Result from './Result'; 

function Game() {
    const [gameQuestions, setGameQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [showFeedback, setShowFeedback] = useState(false);
    const [points, setPoints] = useState(0); 
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        // Select 10 random IDs from 1 to 45
        const randomIds = [];
        // change the question count so instead of 10 to20 or 30
        while (randomIds.length < 10) {
            const randomId = Math.floor(Math.random() * 140) + 1;
            if (!randomIds.includes(randomId)) {
                randomIds.push(randomId);
            }
        }

        // Fetch questions using selected random IDs
        const fetchPromises = randomIds.map(id =>
            axios.get(`http://localhost:1337/api/questions/${id}`)
        );
        console.log(fetchPromises);
        Promise.all(fetchPromises)
            .then(responses => {
                const questions = responses.map(response => response.data);
                setGameQuestions(questions);
            })
            .catch(error => {
                console.error("Error fetching questions:", error);
            });
    }, []);

    const handleAnswerSelect = async(answer) => {
       console.log("line 41:",answer)
        setSelectedAnswer(answer);
        setShowFeedback(false);
        const currentQuestion = gameQuestions[currentQuestionIndex];
        console.log('line 46',currentQuestion);
        const correctAnswerLog = currentQuestion.data.attributes.answer;
        if (correctAnswerLog === answer) {
           
           console.log("line 49 ")
           setPoints(points + 1);
            setShowFeedback("correct");
            console.log('your score is:', points);
            
        } else {
            console.log("line 52 ")
            setShowFeedback("incorrect");
        }

        try {
            const response = await axios.post('http://localhost:1337/api/checkanswer', {
                id: currentQuestion.id,
                answer: answer
            });

            console.log("line71",response.data)
        } catch (error) {
            console.error('Error checking answer:', error);
        }
    };

  
    const handleNextQuestion = () => {
        // Reset states for the next question
        setSelectedAnswer(null);
        setShowFeedback(false);

        // Move to the next question
        if (currentQuestionIndex < gameQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };
    const currentQuestion = gameQuestions[currentQuestionIndex];
    console.log(currentQuestion);
    if (!currentQuestion) {
        return <div>Loading...</div>;
    }
    const question = currentQuestion.data.attributes.question;
    const answerA = currentQuestion.data.attributes.A;
    const answerB = currentQuestion.data.attributes.B;
    const answerC = currentQuestion.data.attributes.C;
    const answerD = currentQuestion.data.attributes.D;
    return (
      
        <Container maxWidth="sm" sx={{
            display: 'flex',
            mt:'5rem',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '50vh',
            bgcolor: "#b77722c2", 
          color:"#ffff" 
          }}>
        <div>
        {showResults && <Result  score={points} />}
           
            <p sx={{mr:'4rem'}}>Score: {points}</p>
            <h2>Question {currentQuestionIndex + 1}</h2>
            <p>{question}</p>
            
            {/* Use Material-UI Checkbox components */}
            <label>
                <Checkbox
                    value="A"
                    checked={selectedAnswer === 'A'}
                    onChange={() => handleAnswerSelect('A')}
                />
                {answerA}
            </label>
            <label>
                <Checkbox
                    value="B"
                    checked={selectedAnswer === 'B'}
                    onChange={() => handleAnswerSelect('B')}
                />
                {answerB}
            </label>
            <label>
                <Checkbox
                    value="C"
                    checked={selectedAnswer === 'C'}
                    onChange={() => handleAnswerSelect('C')}
                />
                {answerC}
            </label>
            <label>
                <Checkbox
                    value="D"
                    checked={selectedAnswer === 'D'}
                    onChange={() => handleAnswerSelect('D')}
                />
                {answerD}
            </label>
            
       
        </div>
        {currentQuestionIndex < gameQuestions.length - 1 && (
                    <Button variant="contained" sx={{mt:'4rem'}}  onClick={handleNextQuestion}>
                        Next Question
                    </Button>
                )}
                {currentQuestionIndex === gameQuestions.length - 1 && (
                    <Link to="/results" state={{ score:points}}>
                   
                    <Button variant="contained">
                        End Game
                    </Button></Link>
                )}

{showFeedback === "incorrect" && (
            <Stack sx={{ width: '100%',mt:'2rem' }} spacing={2}>
                <Alert severity="error">The answer is Wrong</Alert>
            </Stack>
        )}

        {showFeedback === "correct" && (
            <Stack sx={{ width: '100%',mt:'2rem' }} spacing={2}>
                <Alert severity="success">Correct Answer</Alert>
            </Stack>
        )}
        </Container>
    );
}

export default Game;
