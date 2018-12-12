import React,{Component} from 'react';
import axios from 'axios';
import './css/detailimg.less';
import {withRouter} from 'react-router-dom';
import store from '../../../../store';
import * as action from '../../../../actions';
class Detailrecommend extends Component{
    constructor(){
        super();
        this.state={
            detailrecommendNav:['猜你喜欢','精品推荐'],
            Navpick:'猜你喜欢',
            detailrecommend:{
                you_like:[],
                recommend:[]
            },
            detailrecommendCon:[]
        }
    }
    componentWillMount(){
        axios.get('https://apim.restful.5lux.com.cn/good/goodsdetail_recommend/',{
            params:{
                product_id:4666452
            }
        })
        .then((res)=>{
            this.setState({
                detailrecommend:res.data.data
            })
            this.setdetailrecommendCon('猜你喜欢')
        })
    }
    setdetailrecommendCon(val){
        if(val==='猜你喜欢'){
            this.setState({
                detailrecommendCon:this.state.detailrecommend.you_like,
                Navpick:val
            })
        }
        else{
            this.setState({
                detailrecommendCon:this.state.detailrecommend.recommend,
                Navpick:val
            })
        }
    }
    todetail(id,cata_id,brand_id){
        store.dispatch(action.setid(id));
        store.dispatch(action.setproduct_id(id));
        store.dispatch(action.setbrand_id(brand_id));
        store.dispatch(action.setcata_id(cata_id));
        store.dispatch(action.setgoods_id(id));
        this.props.history.push('/detail');
    }
    render(){
        return <div className='detailrecommend'>
            <div className='detailrecommendnav'>
            {this.state.detailrecommendNav.map((val)=>{
                return <div key={val}
                className={this.state.Navpick===val?'colorblack':''}
                onClick={this.setdetailrecommendCon.bind(this,val)}
                >
                {val}
                </div>
            })}
            </div>
            <ul>
                {
                    this.state.detailrecommendCon.map((val)=>{
                        return <li key={val.good_id}
                        onClick={this.todetail.bind(this,
                            val.product_id,val.good_id,val.cata_id
                            )}
                        >
                            <img alt='' src={val.thumb} />
                            <div>{val.brand_name}</div>
                            <p>￥{val.product_price}</p>
                        </li>
                    })
                }
            </ul>
        </div>
    }

}
Detailrecommend=withRouter(Detailrecommend);
export default Detailrecommend;