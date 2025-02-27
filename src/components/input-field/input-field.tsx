import "./input-field.css"
interface Props{
    children: string;
    type?: string;
    fc: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string
}
export default function InputField({children, type="text",fc, value,...rest}:Props){
    const label = (newArr:string) =>{
        const Arr = []
        for(let i = 0; i< newArr.length; i++){
            Arr.push(<span key={i} style={{transitionDelay: `${i*50}ms`}}>{newArr[i]}</span>)
        }
        return Arr
    }
    return(
        <div className="form-control"{...rest}>
                    <input name={children} type={type} required onChange={(e)=> fc(e)} placeholder="" value={value}/>
                    <label htmlFor={children}>
                        {label(children)}
                    </label>
                  </div>
    )
}