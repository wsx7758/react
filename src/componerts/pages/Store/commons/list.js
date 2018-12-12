import React,{Component} from 'react';
import './css/list.less';
class List extends Component{
    constructor(){
        super();
        this.state={
            storelist:[]
        }
    }

    render(){
        console.log(this.props)
        return <div>
        
        <ul className='conUl' style={{display:this.props.show?'block':'none'}}>
        {
            this.props.arr.map((item,ind)=>{
                return <li key={ind}>
                    <div className='storeLogo'><img alt='' src={item.store_thumb} /><div className='like'><span className='likeLogo'></span><span>{item.popularity}</span></div></div>
                    <div className='storedetails'>
                        <div className='storeName'>{item.title}</div>
                        <div className='storeType'><span className='type-l'>{this.props.type}</span><span className='store_desc'>{item.introduction}</span></div>
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
    </ul>
    </div>
    }
}
export default List;