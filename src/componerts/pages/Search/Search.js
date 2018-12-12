import React,{Component} from 'react';
import axios from 'axios';
import './css/Search.less';
import {withRouter} from 'react-router-dom';
class Search extends Component{
    constructor(){
        super();
        this.state={
            data:{
                hot_search:[],
                recommend_products:[],
                search_keyword:[],
                recommend_ads:[]
            }
        }
    }
    componentWillMount(){
        axios.get('https://apim.restful.5lux.com.cn/search/recommend_list')
        .then((res)=>{
            this.setState({
                data:res.data.data
            })
            
            
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    goBack(){
        this.props.history.goBack()
    }
    render(){
        return <div className='search'>
            <div className='seahead'>
                <div className='search_bd'>
                    <span></span>
                    <input placeholder={this.state.data.search_keyword}></input>
                </div>
                <div className='qux' onClick={this.goBack.bind(this)}>
                    取消
                </div>
            </div>
            <div className='seacon'>
                <div className='hot'> 
                    热门搜索
                </div>
                <div className='hotlist'>
                    <ul>
                        {
                            this.state.data.hot_search.map((item)=>{
                                return <li key={item.uri}>
                                    {item.keyword}
                                </li>
                            })
                        }
                    </ul>
                </div>
                <div className='searchRec'>
                        <span></span><div>为您推荐</div><span></span>
                </div>
                <div className='searchrec_con'>
                    <ul>
                        {
                            this.state.data.recommend_products.map((item)=>{
                                return <li key={item.product_id}>
                                    <img alt='' src={item.product_thumb} />
                                    <p>{item.product_name}</p>
                                    <div>￥{item.product_price}</div>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    }
}
Search=withRouter(Search);
export default Search;