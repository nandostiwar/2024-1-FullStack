import './styles/TextGenero.css';

function TextGenero({texto}){
    return (
        <textarea id="textoGenero" value={texto} cols="50" rows="10">

        </textarea>
    )
}

export default TextGenero;