import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

//　form　- ここにstateをもたせるべきか
class TodoInput extends React.Component {
  render() {
    return (
      <>
        <input
          name="title"
          type="text"
          placeholder="タイトルを入力"
          value={this.props.title}
          onChange={this.props.handleChange}
        />
        <br />
        <textarea
          name="description"
          type="text"
          placeholder="内容を入力"
          value={this.props.description}
          onChange={this.props.handleChange}
        />
        <br />
        <button onClick={this.props.handleSubmit}>追加</button>
      </>
    );
  }
}

// todoの一つの要素を表すコンポーネント
const TodoItem = props => {
  return (
    <>
      <li>{props.title}</li>
      <li>{props.description}</li>
    </>
  );
};

// データを受けて一覧表示させている
class TodoList extends React.Component {
  render() {
    const list = this.props.tasks.map(task => {
      return <TodoItem {...task} key={task.id} />;
    });
    return (
      <>
        <ul>{list}</ul>
      </>
    );
  }
}

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
