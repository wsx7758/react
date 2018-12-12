import React,{Component} from 'react';
import axios from 'axios';
import './css/moregoods.less';
import { PullToRefresh } from 'antd-mobile';
class Moregoods extends Component{
    constructor(){
        super();
        this.state={
            goodsList:[],
            page:1
        }
    }
    componentWillMount(){
        this.load(this.state.page)
        // axios.get('https://apim.restful.5lux.com.cn/shop/theirchose',{
        //     params:{
        //         page:1
        //     }
        // })
        // .then((res)=>{
        //     console.log(res.data.data.theirchose)
        //     this.setState({
        //         goodsList:this.state.goodsList.concat(res.data.data.theirchose)
        //     })
        // })
        // .catch((err)=>{
        //     console.log(err)
        // })
    }
    
    load(page){
        axios.get('https://apim.restful.5lux.com.cn/shop/theirchose',{
            params:{
                page:page
            }
        })
        .then((res)=>{
            // console.log(res.data.data.theirchose)
            this.setState({
                goodsList:this.state.goodsList.concat(res.data.data.theirchose)
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    render(){
        return <PullToRefresh
        damping={60}
        direction='up'
        refreshing={false}
        onRefresh={() => {
            this.setState({
                page:this.state.page+1
            })
            this.load(this.state.page);
        }}
    >
        <div className='Moregoods'>
        
            <ul>
                {
                    this.state.goodsList.map((item,ind)=>{
                        return <li key={ind}>
                            <img alt='' src={'https://images.weserv.nl/?url='+item.thumb} />
                            <p>{item.brand_name}</p>
                            <span>￥{item.product_price}</span>
                        </li>
                    })
                }
            </ul>
            
        </div>
        </PullToRefresh>
    }
}
export default Moregoods;