import List from '../commons/list';
import React,{Component} from 'react';
import axios from 'axios';
import '../css/Storenearby.less';
import {withRouter} from 'react-router-dom';
class storeNearby extends Component{
    constructor(){
        super();
        this.state={
            storelist:[],
            sum:'aaa'
        }
    }
    componentWillMount(){
        axios.get('https://apim.restful.5lux.com.cn/good/storelist?',{
            params:{
                latitude:'',
                longitude:'',
                is_nearby:1,
                page:1
            }
        })
        .then((res)=>{
            console.log(res.data.data.store_list)
            this.setState({
                storelist:res.data.data.store_list
            })
        })
        .catch((err)=>{
            console.log(err)
        });
    }
    render(){
        let arr=this.state.storelist
        console.log(arr)
        return <div>
            <div className='nearhead'>
                附近门店
                <div className='headleft' onClick={this.props.history.goBack}></div>
                <div className='headright'>
                    <span className='nearsc'></span>
                    <span className='nearbag'></span>
                </div>
            </div>
            <div className='list'>
                <List arr={arr} show='true' type='新店' />
            </div>
        </div>
    }
}
storeNearby=withRouter(storeNearby)
export default storeNearby;