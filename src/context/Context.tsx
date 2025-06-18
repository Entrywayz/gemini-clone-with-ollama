import { createContext, useState, type ReactNode } from "react"
import {chat} from "../config/gemini"

export const Context = createContext<any>(null);

interface ContextProviderProps {
  children: ReactNode;
}


const ContextProvider = ({ children }: ContextProviderProps) => {
    const [input, setInput] = useState("")
    const [recentPrompt, setRecentPrompt] = useState("")
    const [prevPrompts, setPrevPrompts] = useState<string[]>([])
    const [showResult, setShowResult] = useState(false)
    const [loading, setLoading] = useState(false)
    const [resultData, setResultData] = useState("")

    const delayPara = (index: number, nextWord: string) => {
        setTimeout(function() {
            setResultData(prev => prev + nextWord)
        }, 100 * index)
    }

    const newChat = () => {
        setLoading(false)
        setShowResult(false)        
    }

    const onSent = async (prompt) => {
        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response
        if(prompt !== undefined) {
            response = await chat(prompt)
            setRecentPrompt(prompt)
        } else {
            setPrevPrompts(prev => [...prev, input])
            setRecentPrompt(input)
            response = await chat(input)
        }
        let responseArray = response.split("**")
        let newResponse="";
        for(let i = 0; i < responseArray.length; i++) {
            if (i ===0 || i % 2 !== 1) {
                newResponse += responseArray[i]
            } else {
                newResponse += "<b>"+ responseArray[i] + "</b>"
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>")
        let newResponseArray = newResponse2.split(" ")
        for(let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i]
            delayPara(i, nextWord + " ")
        }
        setLoading(false)
        setInput("")
    }

    const contextValue = {
        prevPrompts: prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider