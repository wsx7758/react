import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import '../../../node_modules/antd-mobile/dist/antd-mobile.css';
import './css/Footer.less';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobeAfrica,faHome,faMapMarkerAlt,faUser,faShoppingBag } from '@fortawesome/free-solid-svg-icons';

library.add(faGlobeAfrica,faHome,faMapMarkerAlt,faUser,faShoppingBag)
class Footer extends Component{
	constructor(){
		super();
		this.state={
			navlist:[
				{
					title:'首页',
					icon:'home',
					path:'/home'
				},
				{
					title:'商城',
					icon:'shopping-bag',
					path:'/mall'
				},
				{
					title:'海外服务',
					icon:'globe-africa',
					path:'/africa'
				},
				{
					title:'到店',
					icon:'map-marker-alt',
					path:'/store'
				},
				{
					title:'我的',
					icon:'user',
					path:'/my'
				}
			]
		}
	}
	componentWillMount(){
		// console.log(this.props)
	}
	render(){
		return  <div className='footer'>
			<ul>
				{
					this.state.navlist.map((item)=>{
						return <li key={item.title}>
							<NavLink to={item.path} activeClassName='lh'>
							{<FontAwesomeIcon icon={item.icon}/>}
							<div>{item.title}</div>
							</NavLink>
						</li>
					})
				}
			</ul>
			{/* <Switch>
				<Route path={match.url + "/computer"} component={Computer} />
				<Route path={match.url +"/phone"} render={()=><strong>我的手机</strong>} />
				<Route path={match.url +"/pad"} render={()=><strong>我的平板</strong>} />
			</Switch> */}
		</div>
	}
}
// Footer = withRouter(Footer);
export default Footer