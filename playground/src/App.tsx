import { Button, useTheme } from 'ansion-ui'
import { useEffect } from 'react'

function App() {
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    console.log(theme)
  }, [theme])
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Button onClick={() => console.log('点击事件')}>哈哈</Button>
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>切换主题</button>
    </div>
  )
}

export default App
