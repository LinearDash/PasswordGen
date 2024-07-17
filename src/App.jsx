import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numAllow, setNumAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState('');

  const PassRef = useRef(null)

  const copytoClipboard = useCallback(() => {
    PassRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numAllow) str += "0123456789"
    if (charAllow) str += "!@#$%^&*()_+-=[]{}|;:,.<>?/"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char);

    }
    setPassword(pass)
    // console.log(pass);

  }, [length, numAllow, charAllow])

  useEffect(() => {
    passwordGenerator()
  }, [length, numAllow, charAllow, passwordGenerator])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg text-black py-4 px-4 my-8 bg-gray-700'>
        <h1 className='text-center p-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='PASSWORD'
            readOnly
            ref={PassRef}
          />
          <button
            onClick={() => { copytoClipboard() }}
            className='bg-blue-700 text-black pr-2 border-solid border-gray-700 border-l-2'>
            Copy
          </button>

        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={25}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex text-sm gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={numAllow}
              id='numberInput'
              onChange={() => { setNumAllow((prev) => !prev) }} />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex text-sm gap-x-1 '>
            <input
              type="checkbox"
              defaultChecked={charAllow}
              id='charactersInput'
              onChange={() => { setCharAllow((prev) => !prev) }} />
            <label htmlFor="charactersInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
