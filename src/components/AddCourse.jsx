import React, { useState, useEffect } from 'react'
import { coursesList } from './functions/courses';
import { parseFullNameToCourseID } from './functions/courseFunctions';
import { predict, splitYearTerm } from './functions/termsPrediction';
import {
    Button,
    Form,
    FormGroup,
  } from "react-bootstrap";
import SchoolIcon from '@mui/icons-material/School';
import EventIcon from '@mui/icons-material/Event';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { IconButton } from '@mui/material';
import { Tooltip } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

import { useDispatch, useSelector } from 'react-redux';
import { plannerRefresh } from "../redux/refresh"

import { v4 as uuid} from 'uuid';

import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import config from '../amplifyconfiguration.json'

import { getTermsbyBoard, getCoursesbyTerm } from '../graphql/customQueries'
import { createCourse } from '../graphql/mutations'
import { generateClient } from 'aws-amplify/api'

Amplify.configure(config);
const client = generateClient()


const AddCourse = ({ user }) => {

    const boardID = useSelector((state) => state.boardCounter.board);
    const refreshPlannerListener = useSelector((state) => state.refreshBoard.value);
    const dispatch = useDispatch();

    const [terms, setTerms] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [coursesList2, setCoursesList2] = useState(coursesList)

    const [availabilitySection, setAvailabilitySection] = useState({
        availableTerm: [],
        pastTerms: []
    })

    const [showPredictButton, setShowPredictButton] = useState(false)
    const [showAvailability, setShowAvailability] = useState(false)
    const [maxWorkLoadWarning, setMaxWorkLoadWarning] = useState(false)
    const [repeatWarning, setRepeatWarning] = useState(false)
    const [emptyInputWarning, setEmptyInputWarning] = useState(false)

    const [uniqueId, setUniqueId] = useState("")

    const [isAdding, setAdding] = useState(false)
    const [isCheckingAva, setCheckingAva] = useState(false)

    useEffect(() => {
        getTerms()
        uuidFromV4();
    }, [refreshPlannerListener, boardID]);

    const getTerms = async () => {
        await client.graphql({
            query: getTermsbyBoard,
            variables: {
                id: `${user.userId}-board${boardID}`
            }
        }).then((res) => {
            let data = res.data.getBoard.terms.items
            setTerms(data)
            setLoading(false)
        })
        setAdding(false);
        setCheckingAva(false);
    }

    const [values, setValues] = useState({
        courseName: '', 
        courseTerm: '' // index of storedTerms
    })

    const uuidFromV4 = () => {
        const newUuid = uuid()
        setUniqueId(newUuid)
    }

    const handleCourseNameInputChange = (e) => {
        setShowAvailability(false)
        setMaxWorkLoadWarning(false)
        setRepeatWarning(false)
        setEmptyInputWarning(false)
        e.persist();
	    setValues((values) => ({
		    ...values,
		    courseName: e.target.value,
	    }));
        setCoursesList2(coursesList.filter(course => 
            (course.toLowerCase()).includes(e.target.value.toLowerCase())
        ))
        if (e.target.value.length > 0){
            setShowPredictButton(true)
        }
        else{
            setShowPredictButton(false)
        }
    }

    const handleCourseTermInputChange = (e) => {
        setMaxWorkLoadWarning(false)
        setRepeatWarning(false)
        setEmptyInputWarning(false)
        e.persist();
	    setValues((values) => ({
		    ...values,
		    courseTerm: e.target.value,
	    }));
    }

    const submit = async () => {

        setAdding(true)

        const courseName = values.courseName.toUpperCase();
        const courseTerm = values.courseTerm;

        // checks if course input is empty
        if (!courseName.trim() || courseTerm === ''){
            setEmptyInputWarning(true);
            setAdding(false);
            return;
        }

        // check if there are 6 or more courses in selected term
        // check if course about to add repeats with already selected course
        let repeat = false;
        let tooManyCourses = false;
        
        await client.graphql({
            query: getCoursesbyTerm,
            variables: {
                id: courseTerm
            }
        }).then((res) => {

            const courses = res.data.getTerm.courses.items

            if (courses.length >= 6){
                tooManyCourses = true
            }
            
            courses.forEach( course => {
                if (course.name === courseName){
                    repeat = true
                }
            })
        })

        if (repeat){
            setAdding(false);
            setRepeatWarning(true)
            return
        }
        if (tooManyCourses){
            setAdding(false);
            setMaxWorkLoadWarning(true)
            return
        }

        await client.graphql({
            query: createCourse,
            variables: {
                input: {
                    id: uniqueId,
                    name: courseName,
                    termCoursesId: courseTerm
                }
            }
        }).then(() => {dispatch(plannerRefresh())});
    }
    
    const checkAvailability = async () => {

        setCheckingAva(true);

        let predictedTerms = []
        let pastTerms = []
        await predict(values.courseName).then((val) => {
            predictedTerms = val.predictResult;
            pastTerms = val.pastTerms
        })

        setAvailabilitySection((section) => ({
            ...section,
            availableTerm: (values.courseName === '') ? [] : predictedTerms,
            pastTerms: (values.courseName === '') ? [] : pastTerms
        }))

        setShowAvailability(true)
        setCheckingAva(false);
    }

    if (isLoading) {
        return <div data-testid="loading" className="App">Loading...</div>;
    }

    const mappingTerms = () => {
        let storedTerms = terms
        
        // sort terms
        storedTerms.sort((t1, t2) => {

            const termValues = { 'Spring': 1, 'Summer': 2, 'Fall': 3 };

            let term1 = splitYearTerm(t1.name);
            let term2 = splitYearTerm(t2.name);

            // term1 = ['2023', 'spring']
            term1[1] = termValues[term1[1]] || 0; 
            term2[1] = termValues[term2[1]] || 0; 

            if (term1[0] !== term2[0]){
                return term1[0] - term2[0];
            } else {
                return term1[1] - term2[1];
            }
        })
        return storedTerms?.map((term) => (
            <option key={term.name} value={term.id}>{term.name}</option>
        ))
    }

    const mappingCourses = () => {
        return coursesList2?.map((course) => (
            <option key={course} value={parseFullNameToCourseID(course)}>{course}</option>
        ))
    }

    return (
        <div data-testid="addCourse">
            <br></br>
            <h5>Add Course</h5>
            <br></br>
            <Form>
                <FormGroup>
                    <Form.Label>Course ID <SchoolIcon color="primary" fontSize="small"/></Form.Label>
                    <Form.Control type="text" 
                        id="course-title" 
                        value={values.courseName}
                        onChange={handleCourseNameInputChange}
                        placeholder="Enter Course ID "
                        aria-label="Default select example">
                    </Form.Control>
                    <Form.Select 
                        type="text"
                        value={values.courseName}
                        onChange={handleCourseNameInputChange}>
                        {mappingCourses()}
                    </Form.Select>
                </FormGroup>

                {/* <FormGroup>
                    <Form.Label>Course ID <SchoolIcon color="primary" fontSize="small"/></Form.Label>
                    <Autocomplete
                        disablePortal
                        options={coursesList2 || []}
                        getOptionLabel={(option) => option}
                        value={values.courseName || null}
                        onChange={(_, newValue) =>
                        setValues({
                            ...values,
                            courseName: newValue ? parseFullNameToCourseID(newValue) : '',
                        })
                        }
                        renderInput={(params) => (
                        <option
                            {...params}
                            label="Select Course"
                            placeholder="Choose a course"
                        />
                        )}
                        sx={{ width: '100%', mt: 1 }}
                    />
                </FormGroup> */}

                <br></br>
                <FormGroup>
                    <Form.Label>Term <EventIcon color="primary" fontSize="small"/> </Form.Label>
                    <Form.Select type="text" 
                        id="course-term" 
                        value={values.courseTerm}
                        onChange={handleCourseTermInputChange}
                        placeholder="Select Term"
                        aria-label="Default select example">
                        <option value=''>Select A Term</option>
                        {mappingTerms()}
                    </Form.Select>
                </FormGroup>
            </Form>
            <br></br>
            <Button className="btn btn-primary" onClick={submit} disabled={isAdding}> 
                {isAdding ? 'Adding' : 'Add'}
            </Button>
            &nbsp;&nbsp;&nbsp;
            {showPredictButton ? <span>
                <Button className="btn btn-primary" onClick={checkAvailability} disabled={isCheckingAva}>
                     {isCheckingAva ? 'Predicting...' : 'Predict Availability'}
                </Button> 
                &nbsp;&nbsp;
                <Tooltip placement="top" title={"Predicts the terms which the course will be available"}>
                    <IconButton size="small">
                        <HelpOutlineIcon color="primary" fontSize="small"/>
                    </IconButton>
                </Tooltip>
            </span> : null}
            <br></br><br></br>
            {showAvailability ? <h5>{
                <>
                {availabilitySection.availableTerm.length === 0 ? <><button className="btn btn-outline-primary">Not Offered</button>&nbsp;</>: 
                (availabilitySection.availableTerm)?.map(term => (
                    <>
                        <button className="btn btn-outline-primary">{term}</button>
                        &nbsp;&nbsp;
                    </>
                ))}
                <Tooltip placement="bottom" 
                    title={
                        <React.Fragment>
                            <p><b>
                                {values.courseName.toUpperCase()}'s Available Terms (2022-2024)
                            </b></p>
                            {availabilitySection.pastTerms.length === 0 ? <>Never Offered</> : 
                                <thead>
                                    {(availabilitySection.pastTerms)?.map(term => (
                                        <tr>{term[1].charAt(0).toUpperCase() + term[1].slice(1) + " " + term[0]}</tr>
                                    ))}
                                </thead>}
                        </React.Fragment>
                    }>
                    <IconButton size="small">
                        <HelpOutlineIcon color="primary" fontSize="small"/>
                    </IconButton>
                </Tooltip>
                <br></br><br></br>
                <p style={{ fontSize: 11 }} > ^ Prediction model based on course offering data from past two years. Aware of inaccuracy.</p>
                </>
            }</h5> : null}
            {maxWorkLoadWarning ? <h5><p style={{ fontSize: 11 }} > ⚠ Warning: Course load exceeded maximum allowance for selected term </p></h5> : null}
            {repeatWarning ? <h5><p style={{ fontSize: 11 }} > ⚠ Warning: Course selected repeats with already selected course in same term </p></h5> : null}
            {emptyInputWarning ? <h5><p style={{ fontSize: 11 }}> ⚠ Warning: Course ID / Term input cannot be empty </p></h5> : null}
        </div>
    )
}

export default AddCourse;
