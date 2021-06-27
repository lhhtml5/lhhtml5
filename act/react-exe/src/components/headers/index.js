import React,{Component} from 'react';
import './index.css';
import { nanoid } from 'nanoid';

export default class Header extends Component {
	/*
		目标：先要获取到input的值
	*/
	handleKeyUp = (e) => {
		const { keyCode, target } = e;
		if (keyCode !== 13) return; // 不按回车键不处理
		if (target.value.trim() === '') {
			alert('输入不能为空');
			return;
		}

		// 如果按下回车键，是不是要形成一个todo的对象
		// 随机值会不会是唯一值？
		// 时间戳一定是唯一值吗？
		const todoObj = { id: nanoid(), name: e.target.value, done: false };
		this.props.addTodo(todoObj);
	};

	render() {
		return (
			<div className='todo-header'>
				<input type='text' onKeyUp={this.handleKeyUp} placeholder='请输入你的任务名称，按回车键确认'  />
			</div>
		);
	}
}
