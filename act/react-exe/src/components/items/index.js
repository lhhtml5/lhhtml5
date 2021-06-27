import React, { Component } from 'react';
import './index.css';
export default class Item extends Component {
	state={mouse:false};
	// 函数的柯里化以及高阶函数
	update = (id) => {
		return (e) => {
			this.props.updateTodo(id, e.target.checked);
		};
	};
	//鼠标事件
  entryM=(flag)=>{
      this.setState({mouse:flag});
	}

	//触发删除
	overDelete=(id)=>{
		if(window.confirm('确定删除')){
			this.props.deleteTodo(id);
		}
    
	}
	render() {
		const { id, name, done } = this.props;
		const {mouse} = this.state;
		return (
			<li onMouseEnter={()=>this.entryM(true)} 
			    onMouseLeave={()=>this.entryM(false)} 
					style={{background:mouse?'#bfc':'#fff'}}>
				<label>
					{/*
					checkbox设置checked会报警告信息，告诉你如果设置checked需要配合onChange事件
					可以尝试设置defaultChecked，但是defaultChecked只能设置默认值，它不会关心checkbox改变以后的数据
					1.可以配合onChange或者disabled等进行使用
					*/}
					<input type='checkbox' checked={done} onChange={this.update(id)} />
					<span>{name}</span>
				</label>
				<button className='btn btn-danger' 
				onClick={()=>this.overDelete(id)}
				style={{ display: mouse ?'block':'none'}}>
					删除
				</button>
			</li>
		);
	}
}