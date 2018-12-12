import React,{Component} from 'react';
import axios from 'axios';
import Footer from '../../../commons/Footer';
import './css/Store.less';
import {withRouter} from 'react-router-dom';
import List from '../commons/list';
class Store extends Component{
    constructor(){
        super();
        this.state={
            topRight:[
                '推荐专柜',
                '支持预约'
            ],
            bespeak:'推荐',
            toppick:'推荐专柜',
            bomLeft:[
                '所有城市',
                '所有品牌'
            ],
            bompick:'',
            storeList:[],
            citys:[],
            cityshow:true,
        }
    }
    componentWillMount(){
        this.getstore(0)
        // this.getcity(0)
        
    }
    getactive(pick,ind){
        console.log(ind)
        this.getstore(ind)
        this.setState({
            toppick:pick,
            bespeak:ind===0?'推荐':'新店'
        })
    }
    getup(pick,ind){
        if(this.state.bompick===pick){
            this.setState({
                bompick:'',
                cityshow:true
            }) 
        }else{
            this.setState({
                bompick:pick,
                cityshow:false
            })

        }
        this.getcity(ind)
        
    }
    getcity(ind){
        let str=ind===0?'city':'brand';
        axios.get('https://apim.restful.5lux.com.cn/good/filter_'+str,
            // {
            //     params:{
            //         is_bespeak:ind
            //     }
            // }
        )
        .then((res)=>{
            console.log(res.data.data)
            this.setState({
                citys:res.data.data.list
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    getstore(ind){
        axios.get('https://apim.restful.5lux.com.cn/good/storelist',{
            params:{
                is_bespeak:ind
            }
        })
        .then((res)=>{
            // console.log(res.data.result_msg)
            if(res.data.result_msg==='成功'){
                this.setState({
                    storeList:res.data.data.store_list
                })
            }
            
        })
        .catch((err)=>{
            console.log(err)
        });
    }
    goNearby(){
        let {history}=this.props;
        history.push('/store/nearby');
    }
    render(){
        // console.log(typeof(this.state.citys),this.state.citys)
        return <div className='store'>
            <div className='storeNav'>
                <div className='navTop'>
                    <div className='Top-l'>
                    {
                        this.state.topRight.map((item,ind)=>{
                            return <div onClick={this.getactive.bind(this,item,ind)} key={ind} className={this.state.toppick===item?'active':''}>{item}</div>
                        })
                    }
                    </div>
                    <div className='Top-r'>
                        <div className='glass'></div>
                        <div className='bag'></div>
                    </div>
                </div>
                <div className='navBom'>
                    <div className='bom-l'>
                        {
                            this.state.bomLeft.map((item,ind)=>{
                                return <div onClick={this.getup.bind(this,item,ind)} key={ind}>{item}<span className={this.state.bompick===item?'up':''}></span></div>
                            })
                        }
                    </div>
                    <div className='bom-r' onClick={this.goNearby.bind(this)}>
                    附近<span></span>
                    </div>
                </div>
               
            </div>
            <div className='storeContent'>
            <div className='city' style={{display:this.state.cityshow?'none':'block'}}>
                    <div className='allcity'>
                        {this.state.bompick}
                    </div>
                    
                    <div className='cityList'>
                    {
                            this.state.citys.map((item,ind)=>{
                                return <div key={item.first_name}>
                                <div className='cityTitle'>{item.first_name}</div>
                                <div className='cityLoc'>
                                    <ul>
                                        {
                                            item.child.map((item,ind)=>{
                                               return <li key={ind}>{this.state.bompick==='所有城市'?item.region_name:item.brand_name}</li>
                                            })
                                        }
                                    </ul>
                                </div>
                                </div>
                            })
                        }
                    </div>
                </div>
                    {/* <ul className='conUl' style={{display:this.state.cityshow?'block':'none'}}>
                        {
                            this.state.storeList.map((item,ind)=>{
                                return <li key={ind}>
                                    <div className='storeLogo'><img src={item.store_thumb} /><div className='like'><span className='likeLogo'></span><span>{item.popularity}</span></div></div>
                                    <div className='storedetails'>
                                        <div className='storeName'>{item.title}</div>
                                        <div className='storeType'><span className='type-l'>{this.state.bespeak}</span><span className='store_desc'>{item.introduction}</span></div>
                                        <div className='storeLoc'>
                                            <div>
                                                <span className='loclogo'></span>
                                                <span className='locgps'>{item.province_name}</span>
                                            </div>
                                            
                                            <span>门店详情</span>
                                        </div>
                                    </div>
                                    
                                </li>
                            })
                        }
                    </ul> */}
                    <List arr={this.state.storeList} show={this.state.cityshow} type={this.state.bespeak}/>
                </div>
            <Footer/>
        </div>
    }
}
Store=withRouter(Store);
export default Store;