import React, { Component } from 'react'
import API from "../adapters/API.js"
import '../css/createWorkout.css'

import { Dropdown, InputGroup, FormControl, Form, Toast, } from 'react-bootstrap'

const emptyExercise = {
    exercise_id: null,
    exercise_name: "",
    weight: "",
    reps: "",
    note: ""
}

export default class CreateWorkout extends Component {
    state = {
        allExercises: [],
        workout: {
            name: '',
            exercises: [
                {
                    ...emptyExercise
                }
            ]
        }
    }

    setCurrentExerciseKeyValue = (exerciseIndex, key, value) => {
        this.setState({
            workout: {
                ...this.state.workout,
                exercises: this.state.workout.exercises.map((exercise, i) => {
                    if (exerciseIndex !== i) return exercise

                    return {
                        ...exercise,
                        [key]: value
                    }
                })
            }
        })
    }

    setCurrentExerciseID = (ex, exerciseIndex) => {

        this.setState({
            workout: {
                ...this.state.workout,
                exercises: this.state.workout.exercises.map((exercise, i) => {
                    if (exerciseIndex !== i) return exercise

                    return {
                        ...exercise,
                        exercise_id: ex.id,
                        exercise_name: ex.title
                    }
                })
            }
        })
    }

    setCurrentExerciseTitle = event => {
        this.setState({
            workout: {
                ...this.state.workout,
                name: event.target.value
            }
        })
    }

    setCurrentExerciseWeight = (event, exerciseIndex) => {
        this.setCurrentExerciseKeyValue(exerciseIndex, "weight", event.target.value)
    }

    setCurrentExerciseReps = (event, exerciseIndex) => {
        this.setCurrentExerciseKeyValue(exerciseIndex, "reps", event.target.value)
    }

    setCurrentExerciseNote = (event, exerciseIndex) => {
        this.setCurrentExerciseKeyValue(exerciseIndex, "note", event.target.value)
    }

    componentDidMount() {
        API.getExercises()
            .then(fetchedExercises => {
                console.log(fetchedExercises)
                this.setState({
                    allExercises: fetchedExercises
                })
            })

    }


    renderAllExerciseItems = (exerciseIndex) => {
        return this.state.allExercises.map(exercise => <Dropdown.Item onClick={e => this.setCurrentExerciseID(exercise, exerciseIndex)} value={exercise.id}>{exercise.title}</Dropdown.Item>)
    }
    renderWorkoutExercises = () => {
        return this.state.workout.exercises.map(exercise => {
            return <div>
                <h2>Exercise name:{exercise.name}</h2>
                <h3>Weight:{exercise.weight}</h3>
                <h3>Reps:{exercise.reps}</h3>
                <h4>Note:{exercise.note}</h4>
            </div>
        })
    }

    addNewEmptyExercise = (event) => {
        event.preventDefault()
        this.setState({
            workout: {
                ...this.state.workout,
                exercises: [
                    ...this.state.workout.exercises,
                    {
                        ...emptyExercise
                    }
                ]
            }
        })
    }

    showConfirmationMessage = () => {
        return (<Toast>
            <Toast.Header>
                <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                <strong className="mr-auto">Bootstrap</strong>
                <small>11 mins ago</small>
            </Toast.Header>
            <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
        </Toast>)
    }


    handleSubmit = (event) => {
        event.preventDefault()
        API.postWorkout(this.state.workout)
            .then(this.showConfirmationMessage)
    }

    render() {
        return (
            <div className="container">
                <h1>Create a workout</h1>

                <div className="container">
                    <h3>Current exercises</h3>
                </div>
                <form onSubmit={this.handleSubmit}>

                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-default">Workout Name</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            onChange={this.setCurrentExerciseTitle}
                        />
                    </InputGroup>
                    {
                        this.state.workout.exercises.map((exercise, i) => {
                            return <div className="container">
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        {exercise.exercise_name || "Select an exercise"}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        {this.renderAllExerciseItems(i)}
                                    </Dropdown.Menu>
                                </Dropdown>

                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroup-sizing-default">Reps</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        aria-label="Default"
                                        aria-describedby="inputGroup-sizing-default"
                                        onChange={e => this.setCurrentExerciseReps(e, i)}

                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroup-sizing-default">Weight</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        aria-label="Default"
                                        aria-describedby="inputGroup-sizing-default"
                                        onChange={e => this.setCurrentExerciseWeight(e, i)}
                                    />
                                </InputGroup>
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Note</Form.Label>
                                    <Form.Control as="textarea" rows="3" onChange={e => this.setCurrentExerciseNote(e, i)} />
                                </Form.Group>
                            </div>
                        })
                    }
                    <button onClick={this.addNewEmptyExercise}>+ exercise</button>
                    <button>Save workout</button>
                </form>

            </div>

        )
    }
}