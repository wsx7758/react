import React,{Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import './css/mallnav.less';
class Mallnav extends Component{
    constructor(){
        super();
        this.state={
            mallnav:[],
            border:'首页',
            navid:0
        }
    }
    componentWillMount(){
        axios.get('https://apim.restful.5lux.com.cn/shop/catalist')
        .then((res)=>{
            // console.log(res.data.data)
            this.setState({
                mallnav:res.data.data
            })
        })
        .catch((err)=>{
            console.log(err)
        });
    }
    nextnav(name,id){
        console.log(id)
        let {path}=this.props.match
        this.setState({
            border:name
        })
        this.props.history.push(path+'/:id='+id)
        console.log(this.state.navid)
    }
    render(){
        return <div className='mallnav'>
            <div className='mallnav-con'>
                <ul>
                    {
                        this.state.mallnav.map((item,ind)=>{
                            return <li onClick={this.nextnav.bind(this,item.cata_name,item.cata_id)}
                                className={item.cata_id===this.props.location.pathname.split('=')[1]?'border':''} 
                                key={item.cata_id}>
                                {item.cata_name}
                            </li>
                        })
                    }
                </ul>
            </div>
        </div>
    }
}
Mallnav=withRouter(Mallnav);
export default Mallnav;