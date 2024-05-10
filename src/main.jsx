import ReactDOM from 'react-dom/client'
import App from './App.jsx'

document.addEventListener("mousemove", (e) => {
    const x = document.elementsFromPoint(e.screenX, e.screenY)
    const y = x.find(x => x.id === "droppable")
    if(y)
        console.log(y);

})

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
)
