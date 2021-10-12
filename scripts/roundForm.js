/*************************************************************************
 * File: roundForm.js
 * This file defines a React controlled component for a logging a round.
 ************************************************************************/

class RoundForm extends React.Component {
    constructor(props) {
      super(props);
      const today = new Date(Date.now()-(new Date()).getTimezoneOffset()*60000);
      this.state = {date:  today.toISOString().substr(0,10),
        course: '',
        type: "practice",
        holes: "",
        strokes: "",
        minutes: "",
        seconds:"",
        submitIcon: "fa fa-save",
        submitLabel: "Log Round"
        }; 
    }
  
    handleChange = (event) => {  
        const name = event.target.name;
        this.setState({[name]: event.target.value});
      
      }

    handleSGS = (event) =>{  //handles the event that strokes, or time is changes and updates SGS
      this.handleChange(event);
      this.updateSGS(event);
      
     
    }

    updateSGS = (event) => {// updates the SGS field
      //alert('working');
      roundSGS.value = 
      (parseInt(this.state.strokes) + parseInt(this.state.minutes)) + 
      ":" + parseInt(this.state.seconds)


    }
      handleSubmit = (event) => {
        event.preventDefault();
        this.setState({submitIcon: "fa fa-spin fa-spinner", submitLabel: "Saving..."});
        setTimeout(this.handleSubmitCallback,1000);
      }

    handleSubmitCallback = () => {
        this.setState({submitIcon: "fa fa-save", submitLabel: "Log Round"});
        let userRounds = localStorage.getItem("userData");
        if (userRounds == null) {
            userRounds = [];
        } else {
            userRounds = JSON.parse(userRounds);
        }
        let round = this.state;
        delete round.submitIcon;
        delete round.submitLabel;
        userRounds.push(round);
        localStorage.setItem("userData",JSON.stringify(userRounds));
        alert("localStorage: " + localStorage.getItem("userData"));
    }
   /* function updateSGS() {
      roundSGS.value = 
        (roundStrokes.valueAsNumber + roundMinutes.valueAsNumber) + 
        ":" + roundSeconds.value
  }
  */
    render() {
        return (
        <form id="logRoundForm" 
              onSubmit={this.handleSubmit} noValidate>
            <div className="mb-3 centered">
                <label htmlFor="roundDate" className="form-label">Date:
                    <input name="date" id="roundDate" 
                       className="form-control centered" type="date" 
                       aria-describedby="roundDateDescr" value={this.state.date} 
                       onChange={this.handleChange} required/>
                </label>
                <div id="roundDateDescr" className="form-text">
                Enter a valid date
                </div>
            </div>
            <div className="mb-3 centered">
                <label htmlFor="roundCourse" className="form-label">Course:
                    <input name="course" id="roundCourse"  
                        className="form-control centered" type="text" 
                        aria-describedby="roundCourseDescr"
                        size="50" maxLength="50"  value={this.state.course} 
                        onChange={this.handleChange} required />
                </label>
                <div id="roundCourseDescr" className="form-text">
                Enter a course name of at most 50 characters
                </div>
            </div>
            <div className="mb-3 centered">
                <label htmlFor="roundType">Type:
                <select name="type" id="roundType" className="form-control centered"
                        value={this.state.type} onChange={this.handleChange}>
                    <option value="practice" selected>Practice</option>
                    <option value="tournament">Tournament</option>
                </select> 
                </label>
            </div>
         
          <div className="mb-3 centered">
                <label htmlFor="roundHoles" className="form-label">Holes:
                    <input name="holes" id="roundHoles"  
                        className="form-control centered" type="text" 
                        aria-describedby="roundHolesDescr"
                        size="5"  value={this.state.holes} 
                        onChange={this.handleChange} required />
                </label>
                <div id="roundHolesDescr" className="form-text">
                Enter number of holes in the round.
                </div>
            </div>
            <div className="mb-3 centered">
                <label htmlFor="roundStrokes" className="form-label">Strokes:
                    <input name="strokes" id="roundStrokes"  
                        className="form-control centered" type="number" 
                        aria-describedby="roundStrokesDescr"
                        size="5"  value={this.state.strokes} 
                        onChange={this.handleSGS} required />
                </label>
                <div id="roundStrokesDescr" className="form-text">
                Enter number of strokes in the round.
                </div>
            </div>
            <div className="mb-3 centered">
                <label htmlFor="roundTime" className="form-label">Time:
                    
                    <input name="minutes" id="roundMinutes"
                        className="form-control centered" type="number"
                        aria-describedby="roundTimeDescr"
                        size="5"  value={this.state.minutes} 
                        onChange={this.handleSGS} required /> 
                        :
                    <input name="seconds" id="roundSeconds"  
                        className="form-control centered" type="number"
                        aria-describedby="roundTimeDescr" 
                        size="5"  value={this.state.seconds} 
                        onChange={this.handleSGS} required />
                </label>
              
                <div id="roundTimeDescr" className="form-text">
                Enter a minutes value between 10 and 400, and a seconds value between 0 and 59
                </div>
            </div>

            <div className="mb-3 centered">
              <label htmlFor="roundSGS">Speedgolf Score:
                <input name ="roundSGS" id="roundSGS" className="form-control centered" type="text" 
                  size="6"  disabled />
              </label>
            </div>

            <div className="mb-3 centered">
              <label htmlFor="roundNotes">Notes:
                <textarea id="roundNotes" className="form-control" 
                  aria-describedby="roundNotesDescr"
                  rows="6" cols="75" maxLength="500"></textarea>
              </label>
              <div id="roundNotesDescr" className="form-text">
                Enter optional round notes of up to 500 characters
              </div>
            </div>


            <div className="centered">
                <button type="submit" className="btn-submit btn btn-primary">
                    <span className={this.state.submitIcon}></span>
                    &nbsp;{this.state.submitLabel}
                </button>
          </div>

        </form>
      );
    }
  }
  
  ReactDOM.render(
    <RoundForm />,
    document.getElementById('root')
  );