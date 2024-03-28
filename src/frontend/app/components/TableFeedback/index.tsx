import SlimCard from "../SlimCard"
import styles from "./styles.module.scss"
import { FC, FormEvent } from "react"

interface Props {
    uploaded:  boolean;
    setUploaded: (value: boolean) => void;
    data: Array<any>;
    setData: (value: Array<any>) => void
  }

const TableFeedback: FC<Props> = ({uploaded, setUploaded, data, setData}: Props) => {
    
    const handleReset = (event: FormEvent) => {
        setData([])
        setUploaded(false)
    }

    return(<div onReset={handleReset} className={styles.card}>
        <form>
            <h1>Importar clientes</h1>
            <hr />
            <p>
                Verifique se os nomes das colunas estão atribuídos corretamente. Os relatórios serão baseados e gerados com estas definições. Caso necessário, você pode editar a correspondência das colunas, atribuindo a uma coluna existente, criando um atributo ou ignorando.
            </p>
            <hr />
            <div className={styles.row}>
                <div className={styles.column}>
                    <div className={styles.row}>
                        <div className={`${styles.circle} ${styles['c-blue']}`}></div>
                        <p>
                            Padrão | Cliente
                        </p>
                    </div>
                    <p>
                        0
                    </p>
                    
                </div>
                <div className={styles.column}>
                    <div className={styles.row}>
                        <div className={`${styles.circle} ${styles['c-green']}`}></div>
                        <p>
                            Atributo | Cliente
                        </p>
                    </div>
                    <p>
                        0
                    </p>
                    
                </div>
                <div className={styles.column}>
                    <div className={styles.row}>
                        <div className={`${styles.circle} ${styles['c-yellow']}`}></div>
                        <p>
                            Atributo | Interação
                        </p>
                    </div>
                    <p>
                        0
                    </p>
                    
                </div>
                <div className={styles.column}>
                    <div className={styles.row}>
                        <div className={`${styles.circle} ${styles['c-red']}`}></div>
                        <p>
                            Sem Correspondência
                        </p>
                    </div>
                    <p>
                        0
                    </p>
                    
                </div>
                <div className={styles.column}>
                    <div className={styles.row}>
                        <div className={`${styles.circle} ${styles['c-grey']}`}></div>
                        <p>
                            Ignorado
                        </p>
                    </div>
                    <p>
                        0
                    </p>
                    
                </div> 
            </div>

            <br /><br />

            <div className={styles.cardscroll}>
                <div className={styles.cardrow}>

                {data && data.length > 0 && (
                    <>
                        {Object.keys(data[0]).map((key) => (
                            <SlimCard key={key} key_name={key} name={key} data={data}/>
                        ))}
                    </>
                )}

                </div>
            </div>
            <div className={styles.endrow_align}>
                <button type='reset' className={styles.button}>Cancelar</button>
                <button type='submit' className={styles.button}>Salvar</button>
            </div>
        </form>
    </div>)
}

export default TableFeedback;