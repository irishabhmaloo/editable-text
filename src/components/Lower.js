import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import '../Style/Lower.css';


export default function Lower() {

  // setting font options
  const defaultProps = {
    options: top100Films,
    getOptionLabel: (option) => option.title,
  };


  // state
  const [color, setColor] = useState("black");
  const [size, setSize] = useState(20);
  const [text, setText] = useState("");
  const [fF, setFf] = useState("Arial");


  // handlers
  const changeSizeHandler = (e) => {
    let sizePrompt = e.target.value + "px";
    setSize(sizePrompt);
  };

  const changeColorHandler = (e) => {
    setColor(e.target.value);
  };

  const changeTextHandler = (e) => {
    setText(e.target.value)
  }

  const changeFfHandler = (e) => {
    setFf(e.target.value)
  }

  const [stack, setStack] = useState([]);
  const [stack2, setStack2] = useState([]);

  // undo 
  const onUndo = () => {
    console.log(stack)
    stack2.push(stack.pop());
    let newProp = stack[stack.length - 1]
    let { color, size, text, fF } = newProp;
    setColor(color)
    setSize(size)
    setText(text)
    setFf(fF)
  }


  // redo
  const onRedo = () => {
    stack.push(stack2.pop());
    let newProp = stack[stack.length - 1]
    let { color, size, text, fF } = newProp;
    setColor(color)
    setSize(size)
    setText(text)
    setFf(fF)
  }

  useEffect(() => {
    stack.push({ color: color, size: size, text: text, fontFamily: fF })
  }, [color, size, text, fF])


  return (
    <>
      {/* reset options */}
      <div className='reset'>
        <div className="on-undo">
          <Button variant="contained" onClick={onUndo}>Undo</Button>
        </div>

        <div className="on-redo">
          <Button variant="contained" onClick={onRedo}>Redo</Button>
        </div>

      </div>

      <div className="container">

        {/* main editing area */}
        <div className="left">
          <div className="textArea">
            <Draggable>
              <input className="editable" type="text" style={{ color: color, fontSize: size, fontFamily: fF }} value={text} onChange={(e) => { changeTextHandler(e) }} />
            </Draggable>
          </div>
        </div>

        <div className="right">
          {/* edit options */}

          <div className="options">

            <div className="ff">
              <Autocomplete
                {...defaultProps}
                id="disable-close-on-select"
                disableCloseOnSelect
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Font-Family"
                    variant="standard"
                    onSelect={(e) => changeFfHandler(e)}
                  />
                )}
              />
            </div>

            <div className="other-vals">
              <div className="num">
                <input
                  type="number"
                  name="size"
                  id="size"
                  placeholder = {size}
                  onBlur={(e) => changeSizeHandler(e)}
                />
              </div>


              <div className="col">
                <input
                  type="color"
                  name="color"
                  id="color"
                  onMouseLeave={(e) => changeColorHandler(e)}
                />
              </div>
            </div>

            <div className="final-button">
              <Button className="fb" variant="contained">Add Text</Button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}


// font family options
const top100Films = [
  { title: "Arial" },
  { title: "Verdana" },
  { title: "Tahoma" },
  { title: "Trebuchet MS" },
  { title: "Times New Roman" },
  { title: "Georgia" },
  { title: "Garamond" },
  { title: "Courier New" },
];
