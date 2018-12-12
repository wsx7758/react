import React,{Component} from 'react';
import Header from '../../commons/Header';
import Footer from '../../commons/Footer';
import Backtop from '../../commons/Backtop';
import 'swiper/dist/css/swiper.min.css';
import './css/Mall.less';
import Mallhome from './page/home';
import Others from './page/others';
import Mallnav from './components/mallnav';
import {Switch,Route,withRouter} from 'react-router-dom';
class Index extends Component{
    constructor(){
        super();
        this.state={
            display:'none'
        }
    }
    componentWillMount(){
        let id=this.props.location.pathname.split('=')[1];
        let {path}=this.props.match
        if(!id|id===0){
            this.props.history.push(path+'/:id=0')
        }

        
    }
    componentDidMount(){
        window.addEventListener('scroll',()=>{
            var scrollHeight = window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop || 0;
            if(scrollHeight>=500){
                this.setState({
                    display:'block'
                })
            }
            if(scrollHeight<500){
                this.setState({
                    display:'none'
                })
            }
        })
    }
    componentWillReceiveProps(next){
        if(next.location.pathname==='/mall'){
            this.props.history.push('/mall/:id=0')
        }
    }
    componentWillUnmount(){
        
    }
    render(){
        let {pathname}=this.props.location
        let id=pathname.split('=')[1]
        // console.log(id)
        return <div>
                <Header />
                <Mallnav />
                <Switch>
                    <Route path="/mall/:id" component={id==0|undefined?Mallhome:Others} /> 
                    {/* <Redirect from="/mall" to='/mall/:id=0' /> */}
                </Switch>
                <Backtop display={this.state.display}/>
                <Footer/>
            </div>
    }
}
Index=withRouter(Index)
export default Index;