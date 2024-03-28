import { FC } from 'react';
import styles from './styles.module.scss'
import { useState, useEffect } from 'react';

interface Props {
    name: string,
    key_name: string,
    data: Array<any>,
}

const SlimCard: FC<Props> = ({name, key_name, data}: Props) =>  {

    name = name.charAt(0).toUpperCase() + name.slice(1)

    const [cardColor, setCardColor] = useState<string>('c-blue');
    const [cardState, setCardState] = useState<string>('');

    useEffect(() => {
        if (key_name) {
            if (key_name === "id" || key_name === "name" || key_name === "email" || key_name === "phone") {
                setCardColor('c-blue');
            } else if (key_name === "company" || key_name === "cpf" || key_name === "empresa" || key_name === "timestamp" ) {
                setCardColor('c-green');
            }
        }
    }, [key_name]);


    return(<div className={`${styles.slimcard}`}>
        <div className={`${styles.header} ${styles[`${cardColor}`]}`}>
            <p>{name}</p>
        </div>
        <div className={`${styles.cardcontent}`}>
            <ul>
                {
                    data ? data.map((item, index) => (
                        <li key={index}>
                            <h4>{data[index][key_name]}</h4>
                        </li>
                    )) : ''
                }
            </ul>
        </div>
    </div>)
}

export default SlimCard;