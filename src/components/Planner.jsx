// import React, { Component } from 'react'
import React, { useState, useEffect } from 'react'
import { getNextTerm, getCurrentTerm, getCurrentYear, sortTerms } from './functions/terms'
import axios from "axios";
import BackspaceIcon from '@mui/icons-material/Backspace';
import { IconButton } from '@mui/material';
import { Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { plannerRefresh } from "../redux/refresh";

import { v4 as uuid} from 'uuid';

import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import config from '../amplifyconfiguration.json'

import { listTerms, getCoursesbyTerm } from '../graphql/queries'
import { deleteCourse, createTerm, deleteTerm } from '../graphql/mutations'
import { generateClient } from 'aws-amplify/api'

Amplify.configure(config);
const client = generateClient()



const Planner = ({ user }) => {

    const [terms, setTerms] = useState([]);
    const [termIdPair, setTermIdPair] = useState([]);       // [[termName, termId], [termName, termId], ... ] 
    const [termsMapping, setTermsMapping] = useState([]);
    const [courses, setCourses] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isAdding, setAdding] = useState(false);
    const [isDeleting, setDeleting] = useState(false);

    const [uniqueId, setUniqueId] = useState("")

    const boardID = useSelector((state) => state.boardCounter.board);
    const refreshPlannerListener = useSelector((state) => state.refreshBoard.value);
    const dispatch = useDispatch();

    useEffect(() => {
        // setLoading(true)
        getTermsCoursesfromGraphQL();
        // refreshPlanner();
        uuidFromV4();
    },[boardID, refreshPlannerListener]);

    const getTermsCoursesfromGraphQL = async () => {
        const data = await client.graphql({query: listTerms})

        // get all terms objects
        let allTerms = data.data.listTerms.items;
        
        // get all terms objects on current board
        let sameBoard = allTerms.filter((term) => term.boardTermsId === `${user.userId}-board${boardID}`)

        // save term name/id pairs for deleting courses later
        let tmpTermIdPair = []
        sameBoard.forEach((term) => {
            tmpTermIdPair.push([term.name, term.id])
        })
        setTermIdPair(tmpTermIdPair)

        // get all term names
        let terms = []
        sameBoard.forEach((term) => {
            terms.push(term.name);
        })

        // sort terms
        let sortedTerms = sortTerms(terms);

        // -----------------------------------------------------------------
        // from [summer 2023, fall 2023, ... fall 2024]

        // to [[summer 2023, fall 2023, spring 2024]
        //     [summer 2024, fall 2024]
        // -----------------------------------------------------------------

        let newTerms = []
        let tmpTerms = []
        for (let i = 0; i < Math.ceil(sortedTerms.length/3); i++){
            for (let j = 0; j < 3; j++){
                if (sortedTerms[i*3+j] !== undefined){
                    tmpTerms.push(sortedTerms[i*3+j])
                }
            } 
            newTerms.push(tmpTerms)
            tmpTerms = []
        }

        // get all courses
        let courses = []
        let tmpCourses = []
        for (let i = 0; i < sameBoard.length; i++){
            tmpCourses = await client.graphql({
                query: getCoursesbyTerm,
                variables: {
                    id: sameBoard[i].id
                }
            })
            tmpCourses.data.getTerm.courses.items.forEach((course) => {
                courses.push({
                    id: course.id,
                    name: course.name,
                    termId: sameBoard[i].id,
                    term: sameBoard[i].name,
                    boardId: sameBoard[i].boardTermsId
                });
            })
        }

        setTerms(sortedTerms)
        setTermsMapping(newTerms)
        setCourses(courses)
        setLoading(false);
        setAdding(false);
        setDeleting(false);
    }

    const refreshPlanner = () => {
        axios
          .get("https://z4pw1ypqug.execute-api.us-west-2.amazonaws.com/prod/terms")
          .then((res) => {

            // get all terms objects on current board
            let sameBoard = res.data.filter((item) => item.boardId === boardID)

            // save term name/id pairs for deleting courses later
            let tmpTermIdPair = []
            sameBoard.forEach((term) => {
                tmpTermIdPair.push([term.termName, term.termId])
            })

            setTermIdPair(tmpTermIdPair)

            // get all term names
            let terms = []
            sameBoard.forEach((data) => {
                terms.push(data.termName);
            })

            // sort terms
            let sortedTerms = sortTerms(terms);

            // -----------------------------------------------------------------
            // from [summer 2023, fall 2023, ... fall 2024]

            // to [[summer 2023, fall 2023, spring 2024]
            //     [summer 2024, fall 2024]
            // -----------------------------------------------------------------

            let newTerms = []
            let tmpTerms = []
            for (let i = 0; i < Math.ceil(sortedTerms.length/3); i++){
                for (let j = 0; j < 3; j++){
                    if (sortedTerms[i*3+j] !== undefined){
                        tmpTerms.push(sortedTerms[i*3+j])
                    }
                } 
                newTerms.push(tmpTerms)
                tmpTerms = []
            }

            setTerms(sortedTerms)
            setTermsMapping(newTerms)
            console.log(terms)
          })
          .catch((err) => console.log(err));
        axios
          .get("https://z4pw1ypqug.execute-api.us-west-2.amazonaws.com/prod/courses")
          .then((res) => {console.log(res.data); setCourses(res.data.filter((course) => course.board === boardID))})
          .catch((err) => console.log(err));
        setLoading(false);
    }

    const uuidFromV4 = () => {
        const newUuid = uuid();
        setUniqueId(newUuid);
    }

    if (isLoading) {
        // return <div className="App">Loading...</div>;
        return (
            <div className="container2">
                <div className="vertical-center">
                    <button className="btn btn-secondary" onClick={() => {setAdding(true); handleTermCreation()}} disabled={isAdding}> 
                        {isAdding ? 'Adding...' : 'Add Term'}
                    </button> 
                    &nbsp;
                    <button className="btn btn-secondary" onClick={() => {setDeleting(true); handleTermDeletion()}} disabled={isDeleting}> 
                        {isDeleting ? 'Deleting...' : 'Delete Term'}
                    </button>
                </div>
            </div>
        )
    }

    const handleCourseDelete = async (item) => {
        await client.graphql({
            query: deleteCourse,
            variables: {
                input: {
                    id: item.id
                }
            }
        })
        dispatch(plannerRefresh())
    };

    const handleTermCreation = async () => {
        let lastTerm = ''
        if (terms.length === 0){
            lastTerm = getCurrentTerm() + ' ' + getCurrentYear()
            console.log(lastTerm)
        }
        else{
            lastTerm = terms[terms.length-1]
        }
        const newTerm = getNextTerm(lastTerm)

        await client.graphql({
            query: createTerm,
            variables: {
                input: {
                    id: uniqueId,
                    name: newTerm,
                    boardTermsId: `${user.userId}-board${boardID}`
                }
            }
        });
        
        dispatch(plannerRefresh())

    }

    const handleTermDeletion = async () => {
        if (terms.length === 0){
            return
        }
        const lastTerm = terms[terms.length-1]

        let lastTermId = ""
        termIdPair.forEach((termId) => {
            if (termId[0] === lastTerm){
                lastTermId = termId[1]
            }
        })

        let deleteCourses = courses.filter((course) => course.term === lastTerm)

        deleteCourses.forEach( async (course) => {
            await client.graphql({
                query: deleteCourse,
                variables: {
                    input: {
                        id: course.id
                    }
                }
            })
        })

        await client.graphql({
            query: deleteTerm,
            variables: {
                input: {
                    id: lastTermId
                }
            }
        })
        dispatch(plannerRefresh())
    }

    const renderCourses = (term) => {
        const items = courses.filter((item) => item.term === term && item.boardId === `${user.userId}-board${boardID}`)
        return items.map((item) => (
            <tr key={item.id}>
                <span className='course-field-left'>
                    {item.name}
                </span>
                <span className='button-field-right'>
                    <Tooltip placement="right" title={"Remove " + item.name}>
                        <IconButton onClick={() => handleCourseDelete(item)}>
                            <BackspaceIcon fontSize="medium"/>
                        </IconButton>
                    </Tooltip>
                </span>
            </tr>
        ))
    }

    const renderTerms = () => {
        const items = [...termsMapping]
        return items.map((item) => (
            <div className="ThreeTerms">
                {item.length >= 1 ? <table className="table table-bordered text-black float-left" style={{width: "30%"}}>
                    <thead>
                        <tr key={item[0]}>
                            <span>
                                <h5>{item[0]}</h5>
                            </span>
                        </tr>
                        {renderCourses(item[0])}
                    </thead>
                </table>  : null}
                {item.length >= 2 ? <table className="table table-bordered text-black float-mid" style={{width: "30%"}}>
                    <thead>
                        <tr key={item[1]}>
                            <span>
                                <h5>{item[1]}</h5>
                            </span>
                        </tr>
                        {renderCourses(item[1])}
                    </thead>
                </table>  : null}
                {item.length >= 3 ? <table className="table table-bordered text-black float-right" style={{width: "30%"}}>
                    <thead>
                        <tr key={item[2]}>
                            <span>
                                <h5>{item[2]}</h5>
                            </span>
                        </tr>
                        {renderCourses(item[2])}
                    </thead>
                </table>  : null}
            </div>
        ))
    }

    return (
        <div data-testid="planner">
                {renderTerms()}
            <div className="container2">
                <div className="vertical-center">
                    <button className="btn btn-secondary" onClick={() => {setAdding(true); handleTermCreation()}} disabled={isAdding}> 
                        {isAdding ? 'Adding...' : 'Add Term'}
                    </button> 
                    &nbsp;
                    <button className="btn btn-secondary" onClick={() => {setDeleting(true); handleTermDeletion()}} disabled={isDeleting}> 
                        {isDeleting ? 'Deleting...' : 'Delete Term'}
                    </button>
                </div>
            </div>
            <br></br><br></br><br></br>
        </div>
    )
}

export default Planner;