import React from 'react';
import Planner from '../components/Planner';
import AddCourse from '../components/AddCourse';
import Header from '../components/Header';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Page () {
    return (
        <div data-testid="page">
            <Header/>
            <br></br>
            <div>
                <Container>
                    <Row>
                        <Col xs={9}>
                            <Planner/>
                        </Col>
                        <Col xs={3}>
                            <AddCourse/>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}