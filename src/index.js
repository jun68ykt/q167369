import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

//　form　- ここにstateをもたせるべきか
class TodoInput extends React.Component {
  render() {
    return (
      <>
        <input name="title" type="text" placeholder="タイトルを入力" />
        <br />
        <textarea name="description" type="text" placeholder="内容を入力" />
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
  constructor() {
    super();
    this.state = {
      tasks: [],
      uniqueId: 1
    };
  }

  handleClick(e) {
    // 入力情報がeventに反映されていない
    const newTitle = e.target.title.value;
    const newDescription = e.target.description.value;
    const newUniqueId = this.state.uniqueId + 1;
    const newTasks = this.state.tasks.slice();

    newTasks.push({
      title: newTitle,
      description: newDescription,
      id: newUniqueId
    });

    this.setState({ newTasks });

    e.target.title.value = "";
    e.target.description.value = "";
  }

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
        <TodoInput handleSubmit={this.handleClick.bind(this)} />
        <TodoList tasks={this.state.tasks} />
      </>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
