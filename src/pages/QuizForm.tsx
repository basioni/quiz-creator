import React from "react";

class QuizForm extends React.Component<{}, { questions: any }> {
  constructor(props: any) {
    super(props);
    this.state = {
      questions: [{ created: "", description: "", id: "", modified: "", title: "", score: null, url: "",  questions_answers: ["", ""] }]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  addClick() {
    this.setState((prevState) => ({
      questions: [...prevState.questions, { created: "", description: "", id: "", modified: "", title: "", score: null, url: "",  questions_answers: [] }]
    }));
  }

  removeClick(i: number) {
    let questions = [...this.state.questions];
    questions.splice(i, 1);
    this.setState({ questions });
  }
  removeAnswer(qi: number, i: number) {
    let questions = [...this.state.questions];
    let questions_answers = [...questions[qi].questions_answers];
    questions_answers.splice(i, 1);
    questions[qi] = { ...questions[qi], questions_answers };
    console.log(questions_answers);
    this.setState({ questions });
  }

  handleSubmit(event: any) {
    alert("A name was submitted: " + JSON.stringify(this.state.questions));
    event.preventDefault();
  }

  handleChange(i: number, e: any) {
    const { name, value } = e.target;
    let questions = [...this.state.questions];
    questions[i] = { ...questions[i], [name]: value };
    this.setState({ questions });
  }

  handleOptions(qi: number, i: number, e: any) {
    const { name, value } = e.target;
    let questions: any = [...this.state.questions];
    let questions_answers = [...questions[qi].questions_answers];
    questions_answers[i] = { ...questions_answers[i], [name]: value };
    questions[qi] = { ...questions[qi], questions_answers };
    this.setState({ questions });
  }

  addAnswer(i: number) {
    let questions = [...this.state.questions];
    questions[i] = {
      ...questions[i],
      options: [...this.state.questions[i].questions_answers, { title: "" }]
    };
    this.setState({ questions });
  }

  createQuestions() {
    console.log(this.state);
    return this.state.questions.map((el: any, i: number) => (
      <div className="d-flex flex-row bd-highlight mb-3" key={i}>
        Question: 
        <input
          placeholder="Question"
          name="Question"
          value={el.title || ""}
          onChange={(e) => this.handleChange(i, e)}
        />
        <div className="pl-4">{this.createAnswers(i)}</div>
        <input
          type="button"
          value="Add Answer"
          onClick={() => this.addAnswer(i)}
        />
        <input
          type="button"
          value="remove answer"
          onClick={() => this.removeClick(i)}
        />
      </div>
    ));
  }

  createAnswers(qi: number) {
    return this.state.questions[qi].questions_answers.map((el: any, i: number) => (
      <div key={i}>
        <input
          placeholder="Question Title"
          name="title"
          value={el.title || ""}
          onChange={(e) => this.handleOptions(qi, i, e)}
        />
        <input
          type="button"
          value="remove"
          onClick={() => this.removeAnswer(qi, i)}
        />
      </div>
    ));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.createQuestions()}
        <input
          type="button"
          value="Add Question"
          onClick={this.addClick.bind(this)}
        />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default QuizForm;
