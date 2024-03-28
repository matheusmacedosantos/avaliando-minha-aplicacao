/** style */
import styles from "./styles.module.scss";
////////////////////////////////////////////////////////////////////////////////

const IntroCard = () => {
  return (
    <div className={styles.card}>
      <h1>Instruções básicas</h1>
      <hr />
      <ul>
        <li>1. Insira apenas um cliente por linha</li>
        <li>2. Nós consideramos a primeira linha como sendo o cabeçalho</li>
        <li>
          3. Tamanho do arquivo: <b>máximo 50MB</b>
        </li>
        <li>4. Quantidade de linhas: mínimo 2 e máximo 200.000</li>
        <li>
          5. Formatos suportados: <b>.CSV, .XLS, .XLSX</b>
        </li>
        <li>
          6. Configuração: <b>UTF-8</b> (delimitado por vírgulas)
        </li>
        <li>
          7. Sem formatações (cores de célula ou fontes, filtros ou congelamento
          de linhas)
        </li>
      </ul>
      <p>
        Se preferir, faça o{" "}
        <a id="linkModelo" href="data:text/csv;charset=utf-8,name,email,phone,CPF,Empresa,Company%0Aname%201,email%201,phone%201,CPF%201,Empresa%201,Company%201%0Aname%202,email%202,phone%202,CPF%202,Empresa%202,Company%202%0Aname%203,email%203,phone%203,CPF%203,Empresa%203,Company%203">
          download do modelo da planilha
        </a>
      </p>
    </div>
  );
};

export default IntroCard;
