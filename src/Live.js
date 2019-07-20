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
		height: "50%",
		filter: "blur(7px)"
	}
		return (

		<Container fluid>
			<Row>
		<div id="bg-image" style={img_props}></div>
				<Col md={2}>
					<div style={{'display':'block'}}>
						<h3 style={{"color":"white"}}>{new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric',year:'numeric'}).format(this.state.curTime)}</h3>
						<h4 style={{"color":"white"}}>{new Intl.DateTimeFormat('en-US', { hour: '2-digit',minute: '2-digit', timeZoneName: 'short'}).format(this.state.curTime)}</h4>
					</div>
				</Col>
					<Col md={{ span: 2, offset: 8 }}>
						<p style={{"color":"white"}}>Hello2</p>
					</Col>
			</Row>
			<Row>
				<Col md={{span:2, offset:5}}>
					<h3 style={{backgroundColor: '#282c34', padding:'15px', border: '5px solid', borderColor:'rgb(220,220,220)', textAlign: 'center'}}>Nate Richman</h3>
			</Col>
			</Row>
		</Container>

		)
	}

}
export default Live
