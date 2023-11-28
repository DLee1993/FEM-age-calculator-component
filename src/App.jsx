import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, number } from "yup";
import { differenceInYears, differenceInCalendarMonths, isExists } from "date-fns";
import { useAnimate } from "framer-motion";
function App() {
    const today = new Date();
    const [scope, animate] = useAnimate();

    const schema = object({
        day: number()
            .required("This field is required")
            .typeError("This field is required")
            .min(1, "Must be a valid day")
            .max(31, "Must be a valid day"),
        month: number()
            .required("This field is required")
            .typeError("This field is required")
            .min(1, "Must be a valid month")
            .max(12, "Must be a valid month"),
        year: number()
            .required("This field is required")
            .typeError("This field is required")
            .max(today.getFullYear(), "Must be in the past"),
    });

    const {
        register,
        handleSubmit,
        reset,
        setError,
        getValues,
        clearErrors,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [calculatedAge, setCalculatedAge] = useState({
        day: "--",
        month: "--",
        year: "--",
    });

    const validDate = (day, month, year) => {
        return isExists(Number(year), Number(month), Number(day));
    };

    const animateNumber = (number, changeState) => {
        animate(0, number, {
            duration: 2,
            onUpdate: (value) => {
                changeState(value);
            },
        });
    };

    const onSubmit = () => {
        const DOB = new Date(getValues("year"), getValues("month") - 1, getValues("day"));
        var today = new Date();

        if (new Date(DOB).getTime() > today.getTime()) {
            console.log("future");
            setError("invalidDate", {
                type: "invalidDate",
                message: "Must be in the past",
            });
        } else if (!validDate(getValues("day"), getValues("month") - 1, getValues("year"))) {
            setError("invalidDate", {
                type: "invalidDate",
                message: "Must be a valid date",
            });
        } else {
            clearErrors();

            const years_diff = differenceInYears(today, DOB);

            const months_diff = differenceInCalendarMonths(today, DOB);
            const calculatedMonths = months_diff - years_diff * 12;

            const days_diff = new Date().getDate() - getValues("day");

            animateNumber(years_diff, (value) => {
                setCalculatedAge((prevState) => ({
                    ...prevState,
                    year: value.toFixed(),
                }));
            });

            animateNumber(calculatedMonths, (value) => {
                setCalculatedAge((prevState) => ({
                    ...prevState,
                    month: value.toFixed(),
                }));
            });

            animateNumber(days_diff, (value) => {
                setCalculatedAge((prevState) => ({
                    ...prevState,
                    day: value.toFixed(),
                }));
            });

            reset;
        }
    };

    //- Register all validation with react-hook-form
    const validateDay = {
        required: true,
        min: 1,
        max: 31,
        validate: validDate,
    };

    const validateMonth = { required: true, min: 1, max: 12 };

    const validateYear = { required: true, max: today.getFullYear() };

    return (
        <section id="calculatorContainer">
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldSetContainer">
                    <fieldset>
                        <label
                            htmlFor="day"
                            className={`label ${
                                errors?.day || errors?.invalidDate ? "error" : "valid"
                            }`}
                        >
                            Day
                        </label>
                        <input
                            name="day"
                            id="day"
                            {...register("day", validateDay)}
                            placeholder="DD"
                            className={`input ${
                                errors?.day || errors?.invalidDate ? "error" : "valid"
                            }`}
                            type="number"
                        ></input>
                        <span id="errorMessage">
                            {" "}
                            {errors?.day?.message || errors?.invalidDate?.message}
                        </span>
                    </fieldset>
                    <fieldset>
                        <label
                            htmlFor="month"
                            className={`label ${
                                errors?.month || errors?.invalidDate ? "error" : "valid"
                            }`}
                        >
                            month
                        </label>
                        <input
                            {...register("month", validateMonth)}
                            name="month"
                            id="month"
                            placeholder="MM"
                            className={`input ${
                                errors?.month || errors?.invalidDate ? "error" : "valid"
                            }`}
                            type="number"
                        ></input>
                        <span id="errorMessage"> {errors?.month?.message}</span>
                    </fieldset>
                    <fieldset>
                        <label
                            htmlFor="year"
                            className={`label ${
                                errors?.year || errors?.invalidDate ? "error" : "valid"
                            }`}
                        >
                            year
                        </label>
                        <input
                            name="year"
                            id="year"
                            {...register("year", validateYear)}
                            placeholder="YYYY"
                            className={`input ${
                                errors?.year || errors?.invalidDate ? "error" : "valid"
                            }`}
                            type="number"
                        ></input>
                        <span id="errorMessage"> {errors?.year?.message}</span>
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
                <ul ref={scope}>
                    <li id="years">
                        <span>{calculatedAge.year}</span> years
                    </li>
                    <li id="months">
                        <span>{calculatedAge.month}</span> months
                    </li>
                    <li id="days">
                        <span>{calculatedAge.day}</span> days
                    </li>
                </ul>
            </section>
        </section>
    );
}

export default App;
