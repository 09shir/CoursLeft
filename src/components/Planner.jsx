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


const Planner = () => {

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
        refreshPlanner();
        uuidFromV4();
        setAdding(false);
        setDeleting(false);
    },[boardID, refreshPlannerListener]);

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

            // get all terms

            // let uniqueTerms = []

            // terms.forEach((term) => {
            //     if (!uniqueTerms.includes(term)){
            //         uniqueTerms.push(term);
            //     }
            // })

            // tmpNewTerms = terms.filter((item) => tmpNewTerms.indexOf(item) <= 0);

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
        return <div className="App">Loading...</div>;
    }

    const handleCourseDelete = (item) => {
        console.log(item.courseId)
        const data = {
            courseId: item.courseId
        }
        const config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: 'https://z4pw1ypqug.execute-api.us-west-2.amazonaws.com/prod/course',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          axios.request(config)
            .catch(function (error) {
                // console.log("Failed to delete a course: " + error)})
                console.log(error.request.response);
                throw(error);
            })
            .then((res) => {dispatch(plannerRefresh())})
    };

    const createTerm = () => {
        let lastTerm = ''
        if (terms.length === 0){
            lastTerm = getCurrentTerm() + ' ' + getCurrentYear()
            console.log(lastTerm)
        }
        else{
            lastTerm = terms[terms.length-1]
        }
        const newTerm = getNextTerm(lastTerm)

        // let duplicate = false;

        // checks for duplicated terms (when spamming create term button it may happen)
        // axios
        //     .get("https://z4pw1ypqug.execute-api.us-west-2.amazonaws.com/prod/terms")
        //     .then((res) => { 
        //         res.data = res.data.filter((item) => item.board === boardID);
        //         res.data.forEach((term) => {
        //             if (term.termName === newTerm){
        //                 duplicate = true;
        //             }
        //         })
        //     })
        const termData = {
            boardId: boardID,
            termId: uniqueId,
            termName: newTerm
        }
        console.log(termData)
        const termConfig = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://z4pw1ypqug.execute-api.us-west-2.amazonaws.com/prod/term',
            headers: { 
                'Content-Type': 'application/json'
              },
            data : termData
        }
        // if (!duplicate){
        axios
        .request(termConfig)
        .catch(function (error) {
            console.log(error.request.response);
            throw(error);
        })
        .then(() => {dispatch(plannerRefresh())})
        // }
    }

    const deleteTerm = () => {
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

        let courseData = {}
        let courseConfig = {}

        deleteCourses.forEach((course) => {
            courseData = {
                courseId: course.courseId
            };
            courseConfig = {
                method: 'delete',
                maxBodyLength: Infinity,
                url: 'https://z4pw1ypqug.execute-api.us-west-2.amazonaws.com/prod/course',
                headers: { 
                    'Content-Type': 'application/json'
                  },
                data : courseData
            }
            axios
                .request(courseConfig)
                .catch(function (error) {
                // console.log("Failed to delete a course: " + error)})
                    console.log(error.request.response);
                    throw(error);
                })
        })

        const termData = {
            termId: lastTermId
        }
        console.log(lastTerm)
        const termConfig = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: 'https://z4pw1ypqug.execute-api.us-west-2.amazonaws.com/prod/term',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : termData
        };
        axios.request(termConfig)
            .catch(function (error) {
            // console.log("Failed to delete a term: " + error)})
                console.log(error.request.response);
                throw(error);
            })
            .then((res) => {dispatch(plannerRefresh())})
    }

    const renderCourses = (term) => {
        const items = courses.filter((item) => item.term === term)
        return items.map((item) => (
            <tr key={item.courseId}>
                <span className='course-field-left'>
                    {item.courseName}
                </span>
                <span className='button-field-right'>
                    {/* <button className="btn btn-outline-danger"
                        onClick={() => this.handleCourseDelete(item)}> Delete </button> */}
                    <Tooltip placement="right" title={"Remove " + item.courseName}>
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
            {/* <ul> */}
                {renderTerms()}
            {/* </ul> */}
            <div className="container2">
                <div className="vertical-center">
                    <button className="btn btn-secondary" onClick={() => {setAdding(true); createTerm()}} disabled={isAdding}> 
                        {isAdding ? 'Adding...' : 'Add Term'}
                    </button> 
                    &nbsp;
                    <button className="btn btn-secondary" onClick={() => {setDeleting(true); deleteTerm()}} disabled={isDeleting}> 
                        {isDeleting ? 'Deleting...' : 'Delete Term'}
                    </button>
                </div>
            </div>
            <br></br><br></br><br></br>
        </div>
    )
}

export default Planner;