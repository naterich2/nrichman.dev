import React from 'react'
import {Row, Col, Image, Container} from 'react-bootstrap'

class Live extends React.Component {
	constructor(props){
		super(props);
		this.state = {curTime: new Date()}
	}
	componentDidMount() {
		setInterval( () => {
			this.setState({
				curTime: new Date()})
		}, 1000);
	}
	render(){
    const img_props = {
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: "url(/resources/images)",
      position: "fixed",
      left: "0",
      top: "0",
      width:"100%",
      height: "100%",
      filter: "blur(5px) brightness(70%)"
    }
		return (

		<Container fluid>
			<Row style={{margin:'20px'}}>
		    <div id="bg-image" style={img_props}></div>
				<Col md={2}>
					<div style={{'display':'block'}}>
						<h3 style={{"color":"white"}}>{new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric',year:'numeric'}).format(this.state.curTime)}</h3>
						<h4 style={{"color":"white"}}>{new Intl.DateTimeFormat('en-US', { hour: '2-digit',minute: '2-digit', timeZoneName: 'short'}).format(this.state.curTime)}</h4>
					</div>
				</Col>
			</Row>
			<Row style={{position: 'absolute', bottom:'50%', width:'100%'}}>
				<Col md={{span:2, offset:5}}>
					<h3 style={{position:'relative', top: '50%',padding:'15px', border: '3px solid', borderColor:'rgb(220,220,220)', textAlign: 'center', color: 'rgb(220,220,220)'}}>Nate Richman</h3>
			</Col>
			</Row>
		</Container>

		)
	}

}
export default Live
