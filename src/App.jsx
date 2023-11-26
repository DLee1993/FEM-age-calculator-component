// import { useState, useEffect } from "react";
// import differenceInYears from "date-fns/differenceInYears";
// import differenceInMonths from "date-fns/differenceInMonths";
function App() {

    return (
        <section id="calculatorContainer">
            <form>
                <fieldset className="fieldSetContainer">
                    <fieldset>
                        <label htmlFor="day">day</label>
                        <input
                            type="text"
                            id="day"
                            placeholder="DD"
                            // onChange={}
                        />
                        <span id="errorMessage">
                            error message here
                        </span>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="month">month</label>
                        <input
                            type="text"
                            id="month"
                            placeholder="MM"
                            // onChange={}
                        />
                        <span id="errorMessage">
                            error message here
                        </span>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="year">year</label>
                        <input
                            type="text"
                            id="year"
                            placeholder="YYYY"
                            // onChange={}
                        />
                        <span id="errorMessage">
                            error message here
                        </span>
                    </fieldset>
                </fieldset>
                <div id="positionContainer">
                    <div id="line"></div>
                    <button id="submitButton">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="46"
                            height="44"
                            viewBox="0 0 46 44"
                        >
                            <g fill="none" stroke="#FFF" strokeWidth="2">
                                <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44" />
                            </g>
                        </svg>
                    </button>
                </div>
            </form>
            <section className="ageContainer">
                <ul>
                    <li id="years">
                        <span>--</span> years
                    </li>
                    <li id="months">
                        <span>--</span> months
                    </li>
                    <li id="days">
                        <span>--</span> days
                    </li>
                </ul>
            </section>
        </section>
    );
}

export default App;
