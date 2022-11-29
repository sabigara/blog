import { useState, useRef, ReactNode } from "react"
import { BiCopy, BiCheck } from "react-icons/bi"

interface Props {
  children: ReactNode
}

const Pre = ({ children }: Props) => {
  const textInput = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [copied, setCopied] = useState(false)

  const onEnter = () => {
    setHovered(true)
  }
  const onExit = () => {
    setHovered(false)
    setCopied(false)
  }
  const onCopy = () => {
    setCopied(true)
    navigator.clipboard.writeText(textInput.current.textContent)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <div ref={textInput} onMouseEnter={onEnter} onMouseLeave={onExit} className="relative">
      {hovered && (
        <button
          aria-label="Copy code"
          type="button"
          className={`absolute right-2 top-2 h-8 w-8 p-1 text-gray-100`}
          onClick={onCopy}
        >
          {copied ? <BiCheck className="h-6 w-6" /> : <BiCopy className="h-6 w-6" />}
        </button>
      )}

      <pre>{children}</pre>
    </div>
  )
}

export default Pre
