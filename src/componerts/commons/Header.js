import React,{Component} from 'react';
import '../commons/css/Header.less';
import {withRouter} from 'react-router-dom';
class Header extends Component{
    constructor(){
        super();
        this.state={
            bgcolor:'rgba(0, 0, 0, 0.9)'
        }
    }
    componentDidMount(){

    }
    tosearch(){
        this.props.history.push('/search');
    }
    tocart(){
        console.log(this)
    }
    render(){
        return <div style={{display:this.props.display}}><div className='header'>
                <div style={{backgroundColor:this.props.bgcolor?this.props.bgcolor:this.state.bgcolor}} className='top'>
                    <div className='left' onClick={this.tosearch.bind(this)}>
                        <div className='logo'></div>
                        <div className='logob'></div>
                    </div>
                    <div className='right' onClick={this.tocart.bind(this)}></div>
                </div>
            </div>
            </div>
    }
}
Header=withRouter(Header);
export default Header