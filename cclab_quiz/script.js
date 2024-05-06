
document.addEventListener("DOMContentLoaded", () => {
    const quizContainer = document.getElementById('quiz-container');
    const questions = [
        { question: "What color is your mood today and why do you think so?", inputType: "color", options: ["lightcoral", "lightsalmon", "khaki", "palegreen", "darkgreen", "mediumaquamarine", "skyblue", "royalblue", "mediumpurple", "indigo", "violet", "pink", "dimgray", "saddlebrown", "black", "whitesmoke"] },
        { question: "How would you rate your mood on a scale of 1-10 at this moment?", inputType: "radio", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"] },
        { question: "Do you notice your thoughts or feelings change when you are around certain people or places?", inputType: "textarea" },
        { question: "Are you able to comprehend the triggers of your emotions?", inputType: "radio", options: ["Yes", "No", "Sometimes"] },
        { question: "What thoughts are associated with feelings of frustration and stress?", inputType: "textarea" },
        { question: "Are your physical needs (like sleep, nutrition, exercise) being met, and how might this be affecting your mood?", inputType: "radio", options: ["I'm getting 7+ hours of sleep per night, two hours of exercise per week, and consuming the five groups- vegetables, fruits, protein, grains, and dairy! ", "I'm getting 5-6 hours of sleep per night, one hour of exercise per week, and eat 2 meals consisting of most of the food groups", "I get under five hours of sleep on most days, don't really have time or energy to exercise, I get by with 1-2 meals consisting of fewer food groups.. :/"] },
        { question: "How have you emotionally grown and what have you learned from past emotional challenges?", inputType: "textarea", inputType: "radio", options: ["I don't think I've really grown.. life is static", "I guess I've grown, general maturity", "I don't remember", "I'm proud of my growth and can explicitly describe the change"]},
        { question: "What activities or hobbies bring you joy or relaxation, and how can you prioritize them more and incorporate them into your routine?", inputType: "textarea", inputType: "radio", options: ["I make time for my hobbies everyday, maybe I need to priorize work more..", "I rarely make time for my hobbies or passions, just can't find the time", "I try to make time every now and then and if I have energy to"]}
        
    ];
    let currentQuestionIndex = 0;
    
    function displayQuestion(index) {
        quizContainer.innerHTML = '';
        const question = questions[index];
        const questionElement = document.createElement('div');
        questionElement.innerHTML = `<h2>${question.question}</h2>`;

        let inputElement;
        if (question.inputType === "color") {
            inputElement = document.createElement('div');
            question.options.forEach(color => {
                const colorButton = document.createElement('button');
                colorButton.style.backgroundColor = color;
                colorButton.classList.add('color-button');
                colorButton.addEventListener('click', () => {
                    document.body.style.backgroundColor = color;
                    saveAnswer(index, color);
                });
                inputElement.appendChild(colorButton);
            });
        } else if (question.inputType === "textarea") {
            inputElement = document.createElement('textarea');
        } else if (question.inputType === "radio") {
            inputElement = document.createElement('div');
            question.options.forEach(option => {
                const label = document.createElement('label');
                label.classList.add('radio-option'); // Add this line

                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = 'option';
                radio.value = option;
                label.appendChild(radio);
                label.append(option);
                inputElement.appendChild(label);
                inputElement.appendChild(document.createElement('br')); 
            });
        }

        inputElement.id = 'user-input';
        questionElement.appendChild(inputElement);
        quizContainer.appendChild(questionElement);

        if (index > 0) {
            const prevButton = document.createElement('button');
            prevButton.innerText = 'Previous';
            prevButton.addEventListener('click', () => changeQuestion(-1));
            quizContainer.appendChild(prevButton);
        }

        if (index < questions.length - 1) {
            const nextButton = document.createElement('button');
            nextButton.innerText = 'Next';
            nextButton.addEventListener('click', () => changeQuestion(1));
            quizContainer.appendChild(nextButton);
        } else {
            const submitButton = document.createElement('button');
            submitButton.innerText = 'Submit';
            submitButton.addEventListener('click', submitQuiz);
            quizContainer.appendChild(submitButton);
        }
    }

    function changeQuestion(direction) {
        saveAnswer(currentQuestionIndex);
        currentQuestionIndex += direction;
        displayQuestion(currentQuestionIndex);
    }

    function saveAnswer(index, answer = null) {
        if (!answer) {
            const inputElement = document.getElementById('user-input');
            if (questions[index].inputType === "radio") {
                answer = document.querySelector('input[name="option"]:checked')?.value;
            } else {
                answer = inputElement.value;
            }
        }
        localStorage.setItem(`question_${index}`, answer);
    }

    function submitQuiz() {
        saveAnswer(currentQuestionIndex);
        quizContainer.innerHTML = '<h1>Thank you for completing the quiz!</h1>' +
        '<p>Thank you for taking the time to engage with this quiz and reflect deeply on these insightful questions. Completing this exercise is a significant step towards understanding and regulating your emotions, which is crucial for maintaining good mental health and practicing mindfulness. Each question is designed to encourage introspection and self-awareness, key components in emotional regulation.</p>' +
        '<p>Recognizing the colors of your mood, understanding the impact of your environment on your thoughts and feelings, and identifying triggers for emotions are all vital for gaining control over your reactions and responses. Delving into the thoughts that accompany feelings of frustration and stress, or considering alternative perspectives in challenging situations, helps in developing resilience and a more balanced outlook on life.</p>' +
        '<p>Moreover, acknowledging the importance of physical needs like sleep, nutrition, and exercise in influencing your mood, reflects a holistic approach to emotional well-being. Reflecting on your emotional growth and learning from past challenges builds strength and wisdom. Finally, recognizing and prioritizing activities that bring joy and relaxation is essential for nurturing your mental health and overall well-being.</p>' +
        '<p>We hope this exercise has offered valuable insights into your emotional world and highlighted the importance of regular self-reflection for your mental health journey. Remember, the path to emotional regulation and mindfulness is continuous and deeply personal. Your efforts in understanding and caring for your mental health today lay the foundation for a more aware, balanced, and fulfilling life.</p>';
    }

    document.getElementById("start-quiz").addEventListener("click", function() {
        this.style.display = 'none';
        displayQuestion(currentQuestionIndex);
    });
});
