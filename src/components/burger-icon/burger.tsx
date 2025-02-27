import "./burger.css"

interface Props{
    onClickProp: () => void;
    open: boolean;
}

export default function Burger({onClickProp, open}:Props){

    function handleClick(){
        onClickProp();
    }
    
    const topBurger = open ? "burger-top open" : "burger-top close";
    const bottomBurger = open ? "burger-bottom open" : "burger-bottom close";

    return(
        <div className="burger-container" onClick={()=> handleClick()} role="button" aria-pressed={open}>
            <div className={topBurger}></div>
            <div className={bottomBurger}></div>
        </div>
    )
}