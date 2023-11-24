import React from 'react';
import Planner from '../components/Planner';
import AddCourse from '../components/AddCourse';
import Header from '../components/Header';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Page ({ signOut, user }) {
    return (
        <div data-testid="page">
            <Header user={user} signOut={signOut}/>
            <br></br>
            <div>
                <Container>
                    <Row>
                        <Col xs={9}>
                            <Planner user={user}/>
                        </Col>
                        <Col xs={3}>
                            <AddCourse user={user}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}