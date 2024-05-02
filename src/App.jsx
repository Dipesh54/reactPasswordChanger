import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  //useState hook
  const [len, setLenght] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [Password, setPassword] = useState("");
  //ref hook
  const passwordRef = useRef(null);

  //useCallback hook
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = 
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllowed) str += "0123456789";

    if (charAllowed) str += "!@#$%^&*()_-+={}[]~`";

    for (let i = 1; i <= len; i++) {
      
      let char =Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [len, numAllowed, charAllowed, setPassword]);


  const copyPassToClip = useCallback(()=>{

    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(0, 9)
    window.navigator.clipboard.writeText(Password)
  }, [Password])

   
  //useEffect hook
  useEffect(()=>{
      passwordGenerator()
  }, [len, numAllowed, charAllowed, passwordGenerator])





  return (
    <>
      <div
        className="w-full max-w-lg mx-auto shadow-md rounded-lg px-6 py-4 my-8 
      text-orange-500 bg-gray-800"
      >
        <h1 className="text-xl text-center text-white my-3">Password Generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4 my-6">
          <input
            type="text"
            value={Password}
            className="ouline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />

          <button 
          onClick={copyPassToClip}
          className="outline-none bg-blue-700 hover:bg-blue-900 ease-out duration-300
           text-white px-3 py-1 shrink-0">
          
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={30}
              value={len}
              className="cursor-pointer"
              onChange={(e)=>{
                  setLenght(e.target.value)
              }}
              

            />
            <label className="">Lenght:{len}</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              id="numberInput"
              onChange={() => {
                setNumAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="numberInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>

      </div>

    </>
  );
}

export default App;
