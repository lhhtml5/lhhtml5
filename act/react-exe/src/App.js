import React  from "react";
import Header from './components/headers';
import './app.css';
import Footer from './components/footers';
import List from './components/lists'


class App extends React.Component {
	// state状态提升
	state = {
		todos: [
			{ id: '001', name: '吃饭', done: true },
			{ id: '002', name: '睡觉', done: true },
			{ id: '003', name: '敲代码', done: false },
		],
	};

	// 状态在哪里，修改操作就在哪里
	// 添加一个todo
	addTodo = (todoObj) => {
		const { todos } = this.state;
		// 数组追加
		// 数组复制数组合并
		const newTodos = [todoObj, ...todos];
		this.setState({
			todos: newTodos,
		});
	};

	// 选中一个todo，并且更新一个todo
	updateTodo = (id, done) => {
		/*
		const { todos } = this.state;
		// 修改todos只是修改state里的todos
		// 1.直接从state进行解构获取了todos
		// 2.直接对todos进行原数据的修改
		// 3.进行react状态修改的时候不建议直接修改原数据
		// 4.一般情况都需要对state数据形成一个新的数据
		todos.map((todoObj) => {
			// 进行遍历，每个item项的id是不是传递过来的id相等，如果相等，说明就是修改的目标，
			// 那么当前的这个找到的item对象，我将它的done进行修改
			if (todoObj.id === id) todoObj.done = done;
			return todoObj;
		});

		this.setState({ todos });
		*/
		// 利用新数据进行状态的修改更新
		const todos = this.state.todos;
		const newTodos = todos.map((todoObj) => {
			if (todoObj.id === id) todoObj.done = done;
			return todoObj;
		});
		// 利用新的数据进行了状态的更新操作
		this.setState({ todos: newTodos });
	};
	//删除一个todo
    deleteTodo=(id)=>{
       //console.log(id);
			 const {todos} = this.state;
			 const newTodos = todos.filter(tO=>{
				 return tO.id !==id;
			 })
       this.setState({ todos: newTodos });
		}
//删除已经完成的TODO
 deleteAll=()=>{
	 const newTodos =this.state.todos.filter((tO)=>!tO.done)
	 this.setState({ todos: newTodos});
 }
 //所有的点击
 upDataAll=(done)=>{
	 const newTodos =this.state.todos.map((tO)=>{
		 return{...tO,done};
	 })
	 this.setState({ todos: newTodos});
 }
  render(){
    const{todos}=this.state;
    return (
      <div className='todo-container'>
       <div className='todo-wrap'>
         <Header addTodo={this.addTodo} />
         <List todos={todos} 
				 updateTodo={this.updateTodo} 
				 deleteTodo={this.deleteTodo}/>
         <Footer deleteAll={this.deleteAll} 
				 todos={todos}
				 upDataAll={this.upDataAll}/>
       </div>
     </div>
      );
  }
  
}

export default App;
