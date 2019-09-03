import './Home.css'
import { Jumbotron, Container, Row, Col, Image,
  OverlayTrigger, Tooltip } from 'react-bootstrap'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import MainNav from './MainNav.js'
import Footer from './Footer.js'
import { withRouter } from 'react-router-dom'

library.add(fab)
class Resume extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loggedIn: false
    }
  }
  render () {
    const programming = [['node-js', 'I used node to create the webserver for this website, as well as during my time in Network Services at DoIT.  Click to see my git repo!', 'https://git.nrichman.dev'],
      ['python', 'I used python for my bioinformatics class as well as for csv parsing and generation at CoreBiome, I also use it to write quick scripts to help me with math homework', 'https://git.nrichman.dev'],
      ['java', 'I used Java for intro to CS, data structures, and AI. I created a replica Minesweeper game, and attempted and failed to make an atomic orbital viewer for my Senior project in High School.  Click to go to my github page to see those projects.', 'https://github.com/naterich2'],
      ['cuttlefish', 'I wrote a driver for a DHT11 temperature and humidity sensor for one of my raspberry pi\'s, and I used C to do microcontroller programming at Caerus', 'https://github.com/naterich2'],
      ['MATLAB', 'I have used MATLAB for data analysis and model fitting during my Hilldale research, and I created a program to detect different life stages in S. Cerevisiae for a computational photography class', 'https://github.com/naterich2']]
    /* eslint-disable no-return-assign */
    const programmingHtml = programming.map(([language, description, link]) => {
      if (language === 'MATLAB') {
        return (
          <OverlayTrigger
            key={language}
            style={{ flexGrow: 1 }}
            placement={'top'}
            overlay={
              <Tooltip id={'tooltip-' + language}>{description}</Tooltip>
            }
          >
            <Image src='/matlab.png' height='32px'
              style={{
                paddingLeft: '2px',
                paddingRight: '2px',
                marginLeft: '2px',
                marginRight: '2px',
                marginTop: '5px',
                flexGrow: '.2'
              }}
              onClick={() => window.location.href = link}
            />
          </OverlayTrigger>
        )
      } else {
        return (
          <OverlayTrigger
            key={language}
            placement={'top'}
            style={{ flexGrow: 1 }}
            overlay={
              <Tooltip id={'tooltip-' + language}>{description}</Tooltip>
            }
          >
            <FontAwesomeIcon
              style={{
                verticalAlign: 'middle',
                paddingLeft: '2px',
                paddingRight: '2px',
                marginLeft: '2px',
                marginTop: '5px',
                flexGrow: '1',
                marginRight: '2px' }}
              icon={['fab', language]}
              size={'2x'}
              onClick={() => window.location.href = link}
            />
          </OverlayTrigger>
        )
      }
    })
    /* eslint-enable no-return-assign */
    return (
      <div className='resume'>
        <div style={{ position: 'relative', backgroundAttachment: 'scroll', width: '100%', backgroundColor: '#282c35' }}>
          <MainNav onLogin={() => this.setState({loggedIn: false})}/>
          <Jumbotron style={{ backgroundAttachment: 'scroll', position: 'relative', left: '15%', width: '70%' }}>
            <Container style={{ width: '80%' }}>
              <Row>
                <Col md={{ span: 2, offset: 5 }}>
                  <Image style={{ height: 'auto', width: '100%' }} src='/Nate.jpg' roundedCircle />
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 4, offset: 4 }}>
                  <h3 style={{ textAlign: 'center' }}><b>Nate Richman</b></h3>
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 2, offset: 5 }}>
                  <p style={{ textAlign: 'center' }}><a href='mailto:nate@nrichman.dev'>Contact</a></p>
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 3 }}>
                  <h4><b>Objective</b></h4>
                </Col>
                <hr width='100%' />
              </Row>
              <Row>
                <Col md={{ span: 12 }}>
                  <p>I am a graduate student looking to contribute to biomedical research and development in a technical setting. I
      am fascinated by many areas of biomedical engineering including tissue engineering, biomechanics, biosensor development, and how computer
      science and informatics can be applied to biotechnology. I have gained experience in these fields by working as an intern at an FDA regulated class II medical device company, at a microbiome bioinformatics company, and as a network engineer in the Division of IT at UW-
      Madison.  Additionally, I have furthered my knowledge in these fields by conducting funded novel research in a mechanical engineering lab, pursuing a Masters degree in biomedical engineering, and working on projects related to computer science and electronics for fun.  I love to learn, and challenging problems inspire my curiosity. This makes me a quick learner and gives me a desire to work in a fast paced, dynamic environment.</p>
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 3 }}>
                  <h4><b>Education</b></h4>
                </Col>
                <hr width='100%' />
              </Row>
              <Row>
                <Col md={{ span: 9 }}>
                  <p><b>Bachelor of Biomedical Engineering, emphasis in Biomaterials, Cellular/Tissue Engineering</b></p>
                  <p>Certificates in Biocore Honors, Computer Science, and Biology in Engineering</p>
                  <p><i>University of Wisconsin-Madison</i>, Madison, WI</p>
                  <p stle={{ marginBottom: '5px' }}>&nbsp;&nbsp;&nbsp;&nbsp; Graduated with Highest Distinction (Summa Cum Laude eq.)</p>
                </Col>
                <Col md={{ span: 2, offset: 1 }}>
                  <p className='date'>May 2019</p>
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 8 }}>
                  <p><b>Master of Biomedical Engineering</b></p>
                  <p style={{ marginBottom: '5px' }}><i>University of Wisconsin-Madison</i>, Madison, WI</p>
                </Col>
                <Col md={{ span: 2, offset: 2 }}>
                  <p className='date'>May 2020</p>
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 3 }}>
                  <h4><b>Professional Experience</b></h4>
                </Col>
                <hr width='100%' />
              </Row>
              <div style={{ marginBottom: '5px' }}>
                <Row>
                  <Col md={{ span: 8 }}>
                    <p><b>R&D Intern</b></p>
                    <p><i>Caerus Corp./Orthocor Medical</i>, Arden Hills, MN</p>
                  </Col>
                  <Col md={{ span: 3, offset: 1 }}>
                    <p className='date'>May 2019 - August 2019</p>
                  </Col>
                </Row>
                <Row>
                  <Col style={{ marginLeft: '2%', flex: '0 0 98%', maxWidth: '98%' }}>
                    <p>Led prototyping for a rework of an existing class II medical device, and created technical drawings and specifications to send to the device manufacturer.  Implemented customer feedback and receiving inspection automation tasks using Microsoft Visual Basic for Word and Excel.  Rewrote microcontroller code for existing medical device product line.  Worked with vendors and labs to source manufacturing materials and coordinate ASTM testing, and developed new compliance testing procedures.</p>
                  </Col>
                </Row>
              </div>
              <div style={{ marginBottom: '5px' }}>
                <Row>
                  <Col md={{ span: 8 }}>
                    <p><b>Student Network Engineer</b></p>
                    <p><i>Department of IT Network Services, University of Wisconsin-Madison</i>, Madison, WI</p>
                  </Col>
                  <Col md={{ span: 3, offset: 1 }}>
                    <p className='date'>October 2017 - May 2019</p>
                  </Col>
                </Row>
                <Row>
                  <Col style={{ marginLeft: '2%', flex: '0 0 98%', maxWidth: '98%' }}>
                    <p>Designed and implemented a system to deploy and maintain hundreds of raspberry pi agents to be used as user network monitoring endpoints.  Gained experience with Infoblox DDI and Cisco switching and routing to create a PXE boot network.  Used Ansible, as well as python and bash scripts for management and automation.  Gained additional experience using NodeJS and MySQL to adapt new production software to existing systems. </p>
                  </Col>
                </Row>
              </div>
              <div style={{ marginBottom: '5px' }}>
                <Row>
                  <Col md={{ span: 8 }}>
                    <p><b>Lab Scientist - Intern</b></p>
                    <p><i>CoreBiome, Inc.</i>, St. Paul, MN</p>
                  </Col>
                  <Col md={{ span: 3, offset: 1 }}>
                    <p className='date'>May 2018 - August 2018</p>
                  </Col>
                </Row>
                <Row>
                  <Col style={{ marginLeft: '2%', flex: '0 0 98%', maxWidth: '98%' }}>
                    <p>Lead development on a small team working to create a secure customer web portal using NodeJS, Meteor, React,
      d3, Docker, python, and NGINX.  Contributed to wet lab processes by helping with qPCR, DNA
      extraction and library preparation for Illumina sequencing.  Learned about and gained experience using lab
      techniques for high throughput DNA processing and sequencing.</p>
                  </Col>
                </Row>
              </div>
              <Row>
                <Col md={{ span: 5 }}>
                  <h4><b>Engineering Experience</b></h4>
                </Col>
                <hr width='100%' />
              </Row>
              <div style={{ marginBottom: '5px' }}>
                <Row>
                  <Col md={{ span: 8 }}>
                    <p><b>Intra-nasal support and saline diffusion device</b></p>
                    <p><i>BME 400/401 - Senior Design</i>, Prof. Mitch Tyler, Biomedical Engineering, UW-Madison</p>
                  </Col>
                  <Col md={{ span: 3, offset: 1 }}>
                    <p className='date'>September 2018 - May 2019</p>
                  </Col>
                </Row>
                <Row>
                  <Col style={{ marginLeft: '2%', flex: '0 0 98%', maxWidth: '98%' }}>
                    <p>Worked on a small team to develop a prototype device for the prevention and alleviation of cold and allergy symptoms.  The device worked by both maintaining structural integrity of the nasal passage and diffusing saline to help break up mucus build-ups.</p>
                  </Col>
                </Row>
                <Row>
                  <Col md={{ span: 8 }}>
                    <p><b><a href='/resources/resume/biofilms.pdf'>Investigation of Bacterial Biofilms Growth Response to Repeated Cyclical Loading</a></b></p>
                    <p><i>Hilldale Undergraduate Research Fellowship</i>, Melih Eriten, Mechanical Engineering, UW-Madison</p>
                  </Col>
                  <Col md={{ span: 3, offset: 1 }}>
                    <p className='date'>September 2017 - May 2018</p>
                  </Col>
                </Row>
                <Row>
                  <Col style={{ marginLeft: '2%', flex: '0 0 98%', maxWidth: '98%' }}>
                    <p>Proposed and conducted my own research on a novel question about Bacterial Biofilms for the
                Hilldale Undergraduate Research Fellowship.  Gained experience with research and design of methods,
                mechanical testing of samples using a Malvern Rheometer, MTS testing system, Hysitron nano/triboindenter,
                AFM (atomic force microscopy), mathematical model fitting, and statistical analysis of data</p>
                  </Col>
                </Row>
              </div>
              <Row>
                <Col md={{ span: 8 }}>
                  <h4><b>Skills</b></h4>
                </Col>
                <hr width='100%' />
              </Row>
              <Row style={{ marginBottom: '20px' }}>
                <Col md={6}>
                  <p style={{ textAlign: 'center', marginBottom: '5px' }}><strong>Biological techniques: </strong></p>
                  <p style={{ textAlign: 'center' }}>2D cell culture, 3D cell culture,  fluorescence microscopy, ELISA, DNA extraction, qPCR. </p>
                </Col>
                <Col md={6}>
                  <p style={{ textAlign: 'center', marginBottom: '5px' }}><strong>Engineering techniques: </strong></p>
                  <p style={{ textAlign: 'center' }}>Rheometry, mechanical testing (MTS), AFM, </p>
                </Col>
              </Row>
              <Row style={{ marginBottom: '20px' }}>
                <Col md={6}>
                  <p style={{ textAlign: 'center', marginBottom: '5px' }}><strong>Programming Languages: </strong></p>
                  <div style={{ display: 'flex', marginTop: '5px', marginLeft: '10%', marginRight: '10%' }}>
                    {programmingHtml}
                  </div>
                </Col>
                <Col md={6}>
                  <p style={{ textAlign: 'center', marginBottom: '5px' }}><strong>Manufacturing: </strong></p>
                  <p style={{ textAlign: 'center' }}>3D printing (FDM and SLA), laser cutting/engraving, MIG welding, metalwork (mill/lathe), woodwork</p>
                </Col>
              </Row>
              <Row style={{ marginBottom: '10px' }}>
                <Col md={{ span: 6, offset: 3 }}>
                  <p style={{ textAlign: 'center', marginBottom: '5px' }}><strong>Software: </strong></p>
                  <p>Microsoft Office (including VBA development), SolidWorks, R/RStudio, Simplify3D, Ultimaker Cura, MATLAB, LaTeX, git, Docker, NGINX, Ansible, MySQL/MariaDB, MongoDB</p>
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 8 }}>
                  <h4><b>Achievments</b></h4>
                </Col>
                <hr width='100%' />
              </Row>
              <Row style={{ marginTop: '10px' }}>
                <Col md={12}>
                  <p>Graduated with the Highest Distinction, Deans Honor List Fall/Spring 2015-2019, Hilldale Undergraduate Fellow 2017, Biomedical Student Advisory Committee (BSAC) exec committe (18/19), BSAC co-chair (19/20)</p>
                </Col>
              </Row>
            </Container>
          </Jumbotron>
          <Footer />
        </div>
      </div>
    )
  }
}

export default withRouter(Resume)
