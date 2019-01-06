import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

// 新規Todo入力フォーム
const TodoInput = ({ title, description, handleChange, handleSubmit }) => (
  <>
    <input
      name="title"
      type="text"
      placeholder="タイトルを入力"
      value={title}
      onChange={handleChange}
    />
    <br />
    <textarea
      name="description"
      type="text"
      placeholder="内容を入力"
      value={description}
      onChange={handleChange}
    />
    <br />
    <button onClick={handleSubmit}>追加</button>
  </>
);

// todoの一つの要素を表すコンポーネント
const TodoItem = ({ title, description }) => (
  <>
    <li>{title}</li>
    <li>{description}</li>
  </>
);

// データを受けて一覧表示させている
const TodoList = ({ tasks }) => (
  <ul>{tasks.map(task => <TodoItem {...task} key={task.id} />)}</ul>
);

// 親コンポーネント、stateをここに固めたい。
// formで入力した情報をクリックしたらsetStateしたい。
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      uniqueId: 1,
      form: { title: "", description: "" },
    };
  }

  handleChange = (e) => {
    this.setState({
      form: { ...this.state.form, [e.target.name]: e.target.value },
    });
  };

  handleClick = () => {
    const newTask = {
      ...this.state.form,
      id: this.state.uniqueId,
    };
    this.setState({
      tasks: [newTask, ...this.state.tasks],
      uniqueId: this.state.uniqueId + 1,
      form: { title: "", description: "" },
    });
  };

  resetTodo = () => {
    this.setState({
      tasks: []
    });
  };

  render() {
    return (
      <>
        <p>Todo App</p>
        <button onClick={this.resetTodo}>一括削除</button>
        <br />
        <TodoInput
          {...this.state.form}
          handleChange={this.handleChange}
          handleSubmit={this.handleClick}
        />
        <TodoList tasks={this.state.tasks} />
      </>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
