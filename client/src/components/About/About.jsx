import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import lisandroPerfil from '../../images/lisandroPerfil.jpg';
import lucasPerfil from '../../images/lucasPerfil.jpg';
import francoPerfil from '../../images/francoPerfil.jpg';
import diegoPerfil from '../../images/diegoPerfil.jpg';
import cesarPerfil from '../../images/cesarPerfil.jpg';
import davidPerfil from '../../images/davidPerfil.jpg';
//import johanPerfil from '../../images/johanPerfil.jpg';
import naycolPerfil from '../../images/naycolPerfil.jpg';


//"https://www.unjobnet.org/assets/images/users/blank-profile.png"
const About = () => {
    return (
        <div style={{ paddingBottom: '20px', display: 'flex', flexWrap : 'wrap', justifyContent: 'center'}}>
            <p style={{ display: 'flex', justifyContent: 'space-around', fontSize: '40px' }}>Members</p>
            <div style={ {display:'flex', flexDirection:'row', marginBlock:'5em',marginInline:'6em' }}>
                <Card style={{ width: '20rem', marginInlineEnd :'2em'}}>
                    <Card.Img variant="top" src={lisandroPerfil} />
                    <Card.Body>
                        <Card.Title><h2 style={{ minHeight: '80px' }}>Lisandro Daniel Pereyra</h2></Card.Title>
                        <Card.Text>
                            <p style={{ fontSize: '26px' }}>Contactos: </p>
                            <a href='mailto:lisandro.pereyra123456@gmail.com'><img src='https://cdn.icon-icons.com/icons2/652/PNG/512/gmail_icon-icons.com_59877.png' width={'50px'}></img></a>
                            <a href='https://github.com/LisandroGG'><img src='https://cdn-icons-png.flaticon.com/512/25/25231.png' width={'50px'}></img></a>
                            <a href='https://www.linkedin.com/in/lisandro-pereyra-18503626a/'><img src='https://cdn-icons-png.flaticon.com/512/1384/1384014.png' width={'50px'}></img></a>

                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card style={{ width: '20rem' ,marginInlineEnd :'2em' }}>
                    <Card.Img variant="top" src={lucasPerfil} />
                    <Card.Body>
                        <Card.Title><h2 style={{ minHeight: '80px' }}>Lucas Leonardo Robledo</h2></Card.Title>
                        <Card.Text>
                            <p style={{ fontSize: '26px' }}>Contactos: </p>
                            <a href='mailto:lucas3leo94@gmail.com'><img src='https://cdn.icon-icons.com/icons2/652/PNG/512/gmail_icon-icons.com_59877.png' width={'50px'}></img></a>
                            <a href='https://github.com/RLucasLeo'><img src='https://cdn-icons-png.flaticon.com/512/25/25231.png' width={'50px'}></img></a>
                            <a href='https://www.linkedin.com/in/robledolucasleonardo'><img src='https://cdn-icons-png.flaticon.com/512/1384/1384014.png' width={'50px'}></img></a>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card style={{ width: '20rem' ,marginInlineEnd :'2em' }}>
                    <Card.Img variant="top" src={francoPerfil} />
                    <Card.Body>
                        <Card.Title><h2 style={{ minHeight: '80px' }}>Franco Chiovetta Falconier</h2></Card.Title>
                        <Card.Text>
                            <p style={{ fontSize: '26px' }}>Contactos: </p>
                            <a href='mailto:franchiovetta@gmail.com'><img src='https://cdn.icon-icons.com/icons2/652/PNG/512/gmail_icon-icons.com_59877.png' width={'50px'}></img></a>
                            <a href='https://github.com/chioveh'><img src='https://cdn-icons-png.flaticon.com/512/25/25231.png' width={'50px'}></img></a>
                            <a href='https://www.linkedin.com/in/chioveh/'><img src='https://cdn-icons-png.flaticon.com/512/1384/1384014.png' width={'50px'}></img></a>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card style={{ width: '20rem',marginInlineEnd :'2em' }}>
                    <Card.Img variant="top" src={diegoPerfil} />
                    <Card.Body>
                        <Card.Title><h2 style={{ minHeight: '80px' }}>Diego Hanssel Perez</h2></Card.Title>
                        <Card.Text>
                            <p style={{ fontSize: '26px' }}>Contactos: </p>
                            <a href='mailto:diegohansselp24@gmail.com'><img src='https://cdn.icon-icons.com/icons2/652/PNG/512/gmail_icon-icons.com_59877.png' width={'50px'}></img></a>
                            <a href='https://github.com/diegohansselperez'><img src='https://cdn-icons-png.flaticon.com/512/25/25231.png' width={'50px'}></img></a>
                            <a href='https://www.linkedin.com/in/hansselperez/'><img src='https://cdn-icons-png.flaticon.com/512/1384/1384014.png' width={'50px'}></img></a>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            <div style={ {display:'flex', flexDirection:'row', marginBlock:'5em',marginInline:'6em'}}>
                <Card style={{ width: '20rem',marginInlineEnd :'2em' }}>
                    <Card.Img variant="top" src={cesarPerfil} />
                    <Card.Body>
                        <Card.Title><h2 style={{ minHeight: '80px' }}>Cesar Daniel Sell</h2></Card.Title>
                        <Card.Text>
                            <p style={{ fontSize: '26px' }}>Contactos: </p>
                            <a href='mailto:cesar_ab05@hotmail.com'><img src='https://cdn.icon-icons.com/icons2/652/PNG/512/gmail_icon-icons.com_59877.png' width={'50px'}></img></a>
                            <a href='https://github.com/lordbattle'><img src='https://cdn-icons-png.flaticon.com/512/25/25231.png' width={'50px'}></img></a>
                            <a href='https://www.linkedin.com/in/cesar-daniel-sell-42a206157/'><img src='https://cdn-icons-png.flaticon.com/512/1384/1384014.png' width={'50px'}></img></a>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card style={{ width: '20rem',marginInlineEnd :'2em' }}>
                    <Card.Img variant="top" src={davidPerfil} />
                    <Card.Body>
                        <Card.Title><h2 style={{ minHeight: '80px' }}>David Antonio Escobar Zuñiga</h2></Card.Title>
                        <Card.Text>
                            <p style={{ fontSize: '26px' }}>Contactos: </p>
                            <a href='mailto:david_zu.17@hotmail.com'><img src='https://cdn.icon-icons.com/icons2/652/PNG/512/gmail_icon-icons.com_59877.png' width={'50px'}></img></a>
                            <a href='https://github.com/DavidZu17'><img src='https://cdn-icons-png.flaticon.com/512/25/25231.png' width={'50px'}></img></a>
                            <a href='https://linkedin.com/in/david-escobar-zuñiga-5646661bb/'><img src='https://cdn-icons-png.flaticon.com/512/1384/1384014.png' width={'50px'}></img></a>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card style={{ width: '20rem',marginInlineEnd :'2em' }}>
                    <Card.Img variant="top" src="https://www.unjobnet.org/assets/images/users/blank-profile.png" />
                    <Card.Body>
                        <Card.Title><h2 style={{ minHeight: '80px' }}>Johan David Rodriguez Ruiz</h2></Card.Title>
                        <Card.Text>
                            <p style={{ fontSize: '26px' }}>Contactos: </p>
                            <a href='mailto:johandavid1707@gmail.com'><img src='https://cdn.icon-icons.com/icons2/652/PNG/512/gmail_icon-icons.com_59877.png' width={'50px'}></img></a>
                            <a href='https://github.com/Johan1707'><img src='https://cdn-icons-png.flaticon.com/512/25/25231.png' width={'50px'}></img></a>
                            <a href='https://www.linkedin.com/in/johan-david-rodriguez-ruiz-b387b021b/'><img src='https://cdn-icons-png.flaticon.com/512/1384/1384014.png' width={'50px'}></img></a>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card style={{ width: '20rem',marginInlineEnd :'2em' }}>
                    <Card.Img variant="top" src={naycolPerfil} />
                    <Card.Body>
                        <Card.Title><h2 style={{ minHeight: '80px' }}>Naycol Rodolfo Linares Villasmil</h2></Card.Title>
                        <Card.Text>
                            <p style={{ fontSize: '26px' }}>Contactos: </p>
                            <a href='mailto:wuaicot8@gmail.com'><img src='https://cdn.icon-icons.com/icons2/652/PNG/512/gmail_icon-icons.com_59877.png' width={'50px'}></img></a>
                            <a href='https://github.com/wuaicot/'><img src='https://cdn-icons-png.flaticon.com/512/25/25231.png' width={'50px'}></img></a>
                            <a href='https://www.linkedin.com/in/wuaicot'><img src='https://cdn-icons-png.flaticon.com/512/1384/1384014.png' width={'50px'}></img></a>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>

        </div>
    )
}

export default About