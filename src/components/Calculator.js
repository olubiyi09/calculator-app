import React, { useState } from 'react';
import { evaluate } from 'mathjs'
import { MdDarkMode, MdLightMode } from "react-icons/md"
import './Calculator.css';

const Calculator = () => {
    const [input, setInput] = useState("");
    const [result, setResult] = useState('');
    const [memory, setMemory] = useState(0);
    const [isOn, setIsOn] = useState(true)
    const [isDarkMode, setIsDarkMode] = useState(true);

    const handleDigitClick = (digit) => () => {
        if (!isOn) return;
        setInput(input + digit);
    };

    const handleOperatorClick = (operator) => () => {
        if (!isOn) return;
        //This function will check and control any consecutive operators been clicked
        let newInput;
        if (['+', '-', '*', '/'].includes(input.charAt(input.length - 1))) {
            newInput = input.slice(0, -1) + operator;
        } else {
            newInput = input + operator;
        }
        setInput(newInput);
    };

    const handleClear = () => {
        setInput('');
        setResult('');
    };

    const handleClearEntry = () => {
        setInput(input.slice(0, -1));
    };

    const clearMemory = () => {
        setMemory(0);
    };

    const handleMemoryPlus = () => {
        if (!isOn) return;
        clearMemory();
        setMemory(parseFloat(input));
    };

    const handleMemoryRecall = () => {
        setInput(input + memory);
    };

    const handleMemoryClear = () => {
        setMemory(0);
    };

    const handlePercentage = () => {
        //This function will Parse the input and divide it by 100 to get the percentage.
        const percentage = (parseFloat(input) / 100).toString();
        setInput(percentage);
        setResult(percentage);
    };

    const handleEqual = () => {
        try {
            const calculatedResult = evaluate(input);
            setResult(calculatedResult);
            setInput(calculatedResult.toString());
        } catch (error) {
            setResult('Error');
        }
    };

    const togglePower = () => {
        setIsOn(!isOn);
        setInput('');
        setResult('');
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <section>
            <div className={`calculator ${isDarkMode ? 'dark-mode' : ''}`}>

                <div className="top-bar">
                    <div className="status">Status: {isOn ? "Active" : "Not Active"}</div>

                    <div className={`dark-mode-switch ${isDarkMode ? 'dark' : 'light'}`}>
                        <div className="icon" onClick={toggleDarkMode}>
                            {isDarkMode ? <MdLightMode /> : <MdDarkMode />}
                        </div>
                    </div>
                </div>

                <div className="display">
                    <div className="input">{input}</div>
                    <div className="output">{result}</div>
                </div>


                <div className="wrapper">
                    <button className="item power-button" onClick={togglePower}>
                        {isOn ? 'Off' : 'On'}
                    </button>
                    <button className="item" onClick={handleMemoryPlus}>M+</button>
                    <button className="item" onClick={handleMemoryRecall}>MR</button>
                    <button className="item" onClick={handleMemoryClear}>MC</button>

                    <button className="item c-char" onClick={handleClear}>C</button>
                    <button className="item c-char" onClick={handleClearEntry}>CE</button>
                    <button className="item spc-item" onClick={handleOperatorClick('/')}>/</button>
                    <button className="item spc-item" onClick={handleOperatorClick('*')}>*</button>

                    <button className="item" onClick={handleDigitClick('7')}>7</button>
                    <button className="item" onClick={handleDigitClick('8')}>8</button>
                    <button className="item" onClick={handleDigitClick('9')}>9</button>
                    <button className="item spc-item" onClick={handleOperatorClick('-')}>-</button>

                    <button className="item" onClick={handleDigitClick('4')}>4</button>
                    <button className="item" onClick={handleDigitClick('5')}>5</button>
                    <button className="item" onClick={handleDigitClick('6')}>6</button>
                    <button className='item spc-item' onClick={handleOperatorClick('+')}>+</button>

                    <button className="item" onClick={handleDigitClick('1')}>1</button>
                    <button className="item" onClick={handleDigitClick('2')}>2</button>
                    <button className="item" onClick={handleDigitClick('3')}>3</button>

                    <button className='item spc-item special' onClick={handleEqual} >=</button>
                    <button className="item" onClick={handlePercentage}>%</button>
                    <button className="item" onClick={handleDigitClick('0')}>0</button>
                    <button className="item" onClick={handleDigitClick('.')}>.</button>

                </div>
            </div>

        </section>
    );
};

export default Calculator;
