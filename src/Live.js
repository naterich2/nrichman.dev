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
		backgroundImage: "url(https://archive-media-1.nyafuu.org/wg/image/1493/00/1493008779677.png)",
		position: "fixed",
		left: "0",
		top: "0",
		width:"100%",
		height: "100%",
		filter: "blur(5px)"
	}
		return (
		<Container fluid>
			<Row>
		<div id="bg-image" style={img_props}></div>
				<Col md={2}>
					<h3 style={{"color":"white"}}>{this.state.curTime.toLocaleTimeString([],{month: 'long', day: 'numeric', year: 'numeric',hour: '2-digit',minute: '2-digit'})}</h3>
				</Col>
					<Col md={{ span: 2, offset: 8 }}>
						<p style={{"color":"white"}}>Hello2</p>
					</Col>
			</Row>
			<Row>
				<Col md={{span:2, offset:5}}>
					<h3>Nate Richman</h3>
			</Col>
			</Row>
		</Container>
		)
	}
	
}
export default Live
