import { useEffect, useState } from "react";

import Banner from "../../assets/banner.svg";

import styles from "./styles.module.scss";
import { useParams } from "react-router-dom";
////////////////////////////////////////////////////////////////////////////////

interface SatisfactionSurvey {
  title: string;
  question1: {
    title: string;
    answer: number;
  };
  question2: {
    title: string;
    answer: number;
  };
}

const Survey = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [hasCompanyIdentifier, setHasCompanyIdentifier] = useState(false);
  const { companyIdentifier } = useParams<{ companyIdentifier: string }>();

  useEffect(() => {
    if (companyIdentifier) {
      setHasCompanyIdentifier(true);
    }
  }, [companyIdentifier]);

  const [survey, setSurvey] = useState<SatisfactionSurvey[]>([
    {
      title: "Experiência de viagem:",
      question1: {
        title: "Como você avalia a qualidade dos carros?",
        answer: 0,
      },
      question2: {
        title: "Como você avalia a qualidade dos motoristas?",
        answer: 0,
      },
    },
    {
      title: "Experiência com o aplicativo:",
      question1: {
        title: "Facilidade em realizar o pagamento pelo app:",
        answer: 0,
      },
      question2: {
        title: "Facilidade em solicitar um carro pelo app:",
        answer: 0,
      },
    },
  ]);

  const handleNextQuestion = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevQuestion = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3001/satisfaction-survey", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        survey,
        companyIdentifier,
      }),
    })

    console.log(response)
  };

  return (
    <>
      {!hasCompanyIdentifier ? (
        <h1>Você não tem permissão para acessar essa página.</h1>
      ) : (
        <div className={styles.container}>
          <img src={Banner} alt="banner" />
          <div className={styles.formContainer}>
            <form className={styles.form}>
              <h1 onClick={() => console.log(survey)}>
                {survey[questionIndex].title}
              </h1>
              <ul className={styles.questionsList}>
                <li>
                  <p>{survey[questionIndex].question1.title}</p>
                  <ul className={styles.buttonsList}>
                    <div>
                      {[1, 2, 3, 4, 5].map((item) => (
                        <li key={item + survey[questionIndex].question1.title}>
                          <button
                            type="button"
                            className={
                              survey[questionIndex].question1.answer === item
                                ? styles.rangeBtnActive
                                : ""
                            }
                            onClick={() => {
                              setSurvey((prevSurvey) => {
                                const newSurvey = [...prevSurvey];
                                newSurvey[questionIndex].question1.answer =
                                  item;
                                return newSurvey;
                              });
                            }}
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </div>

                    <div>
                      {[6, 7, 8, 9, 10].map((item) => (
                        <li key={item + survey[questionIndex].question1.title}>
                          <button
                            type="button"
                            className={
                              survey[questionIndex].question1.answer === item
                                ? styles.rangeBtnActive
                                : ""
                            }
                            onClick={() => {
                              setSurvey((prevSurvey) => {
                                const newSurvey = [...prevSurvey];
                                newSurvey[questionIndex].question1.answer =
                                  item;
                                return newSurvey;
                              });
                            }}
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </div>
                  </ul>
                </li>
                <li>
                  <p>{survey[questionIndex].question2.title}</p>
                  <ul className={styles.buttonsList}>
                    <div>
                      {[1, 2, 3, 4, 5].map((item) => (
                        <li key={item + survey[questionIndex].question2.title}>
                          <button
                            type="button"
                            className={
                              survey[questionIndex].question2.answer === item
                                ? styles.rangeBtnActive
                                : ""
                            }
                            onClick={() => {
                              setSurvey((prevSurvey) => {
                                const newSurvey = [...prevSurvey];
                                newSurvey[questionIndex].question2.answer =
                                  item;
                                return newSurvey;
                              });
                            }}
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </div>
                    <div>
                      {[6, 7, 8, 9, 10].map((item) => (
                        <li key={item + survey[questionIndex].question2.title}>
                          <button
                            type="button"
                            className={
                              survey[questionIndex].question2.answer === item
                                ? styles.rangeBtnActive
                                : ""
                            }
                            onClick={() => {
                              setSurvey((prevSurvey) => {
                                const newSurvey = [...prevSurvey];
                                newSurvey[questionIndex].question2.answer =
                                  item;
                                return newSurvey;
                              });
                            }}
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </div>
                  </ul>
                </li>
              </ul>
              <div className={styles.actions}>
                <button
                  className={styles.backBtn}
                  onClick={handlePrevQuestion}
                  disabled={questionIndex === 0}
                >
                  Anterior
                </button>

                <button
                  onClick={
                    questionIndex === survey.length - 1
                      ? handleSubmit
                      : handleNextQuestion
                  }
                  type="button"
                  className={styles.nextBtn}
                >
                  {questionIndex === survey.length - 1 ? "Enviar" : "Próxima"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Survey;
