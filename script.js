        // Elementos do DOM para facilitar manipulações
        const startButton = document.getElementById('start-btn');
        const restartButton = document.getElementById('restart-btn');
        const questionContainer = document.getElementById('question-container');
        const resultContainer = document.getElementById('result-container');
        const questionElement = document.getElementById('question');
        const answerButtonsElement = document.getElementById('answer-buttons');
        const scoreElement = document.getElementById('score');
        const progressBarFull = document.getElementById('progress-bar-full');

        // Variáveis de estado do jogo
        let shuffledQuestions, currentQuestionIndex;
        let score = 0;

        // Perguntas e respostas do jogo
        const questions = [
            {
                question: 'O que é Inteligência Artificial?',
                answers: [
                    { text: 'A. Tecnologia de reconhecimento de voz', correct: false },
                    { text: 'B. Simulação de inteligência humana por máquinas', correct: true },
                    { text: 'C. Redes sociais', correct: false },
                    { text: 'D. Computação em nuvem', correct: false }
                ]
            },
            {
                question: 'O que é Machine Learning?',
                answers: [
                    { text: 'A. Um tipo de IA que permite que o software melhore a precisão sem ser explicitamente programado', correct: true },
                    { text: 'B. Um programa de edição de vídeo', correct: false },
                    { text: 'C. Um sistema operacional', correct: false },
                    { text: 'D. Uma técnica de computação gráfica', correct: false }
                ]
            },
            {
                question: 'Qual é o principal objetivo da Visão Computacional?',
                answers: [
                    { text: 'A. Gerar imagens 3D', correct: false },
                    { text: 'B. Interpretar e entender o conteúdo visual do mundo', correct: true },
                    { text: 'C. Criar jogos de vídeo', correct: false },
                    { text: 'D. Desenhar gráficos', correct: false }
                ]
            }
        ];

        // Event Listeners para iniciar e reiniciar o jogo
        startButton.addEventListener('click', startGame);
        restartButton.addEventListener('click', restartGame);

        // Função para iniciar o jogo
        function startGame() {
            startButton.classList.add('hide');
            shuffledQuestions = questions.sort(() => Math.random() - 0.5);
            currentQuestionIndex = 0;
            questionContainer.classList.remove('hide');
            resultContainer.classList.add('hide');
            score = 0;
            setNextQuestion();
            updateProgressBar();
        }

        // Função para configurar a próxima pergunta
        function setNextQuestion() {
            resetState();
            showQuestion(shuffledQuestions[currentQuestionIndex]);
        }

        // Função para exibir a pergunta e as opções de resposta
        function showQuestion(question) {
            questionElement.innerText = question.question;
            question.answers.forEach(answer => {
                const button = document.createElement('button');
                button.innerText = answer.text;
                button.classList.add('btn');
                if (answer.correct) {
                    button.dataset.correct = answer.correct;
                }
                button.addEventListener('click', selectAnswer);
                answerButtonsElement.appendChild(button);
            });
        }

        // Função para limpar o estado anterior
        function resetState() {
            clearStatusClass(document.body);
            while (answerButtonsElement.firstChild) {
                answerButtonsElement.removeChild(answerButtonsElement.firstChild);
            }
        }

        // Função para lidar com a seleção da resposta
        function selectAnswer(e) {
            const selectedButton = e.target;
            const correct = selectedButton.dataset.correct === "true";
            setStatusClass(document.body, correct);
            Array.from(answerButtonsElement.children).forEach(button => {
                setStatusClass(button, button.dataset.correct === "true");
            });
            if (correct) {
                score++;
            }
            currentQuestionIndex++;
            if (currentQuestionIndex < shuffledQuestions.length) {
                setTimeout(() => {
                    setNextQuestion();
                    updateProgressBar();
                }, 1000);
            } else {
                setTimeout(() => {
                    endGame();
                }, 1000);
            }
        }

        // Função para finalizar o jogo e exibir a pontuação
        function endGame() {
            questionContainer.classList.add('hide');
            resultContainer.classList.remove('hide');
            scoreElement.innerText = score;
        }

        // Função para reiniciar o jogo
        function restartGame() {
            startGame();
        }

        // Função para definir a classe de status (correto/incorreto)
        function setStatusClass(element, correct) {
            clearStatusClass(element);
            if (correct) {
                element.classList.add('correct');
            } else {
                element.classList.add('wrong');
            }
        }

        // Função para limpar a classe de status
        function clearStatusClass(element) {
            element.classList.remove('correct');
            element.classList.remove('wrong');
        }

        // Função para atualizar a barra de progresso
        function updateProgressBar() {
            const progressPercent = (currentQuestionIndex / shuffledQuestions.length) * 100;
            progressBarFull.style.width = `${progressPercent}%`;
        }
