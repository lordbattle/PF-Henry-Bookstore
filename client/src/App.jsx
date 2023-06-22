import 'bootstrap/dist/css/bootstrap.min.css'
import Stack from 'react-bootstrap/Stack'
function App() {

  return (
    <div className='container'>
    <Stack direction="horizontal" gap={3}>
      <div className="p-2">NameStore</div>
      <div className="p-2 ms-auto">Products</div>
      <div className="vr" />
      <div className="p-2">Log in</div>
      <div className="p-2">Sign un</div>
    </Stack>
  </div>
  )
}

export default App
