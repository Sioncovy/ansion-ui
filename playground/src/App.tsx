import { Button, useTheme } from 'ansion-ui'

function App() {
  const { theme, setTheme } = useTheme()

  console.log(theme)

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Button>哈哈</Button>
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>切换主题</button>
    </div>
  )
}

export default App
