"use client";
/** react */
import { FC, useState, ChangeEvent, DragEvent, FormEvent } from "react";
import { NextApiRequest, NextApiResponse } from "next";

/** style */
import styles from "./styles.module.scss";
import { UploadSimple } from "@phosphor-icons/react";

import toast, { Toaster } from 'react-hot-toast';

interface Props {
  uploaded: boolean;
  setUploaded: (value: boolean) => void;
  data: Array<any>;
  setData: (value: Array<any>) => void;
}

const UploadCard: FC<Props> = ({
  uploaded,
  setUploaded,
  data,
  setData,
}: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>();

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFile(files[0]);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      console.error("Nenhum arquivo selecionado");
      return;
    }

    const formData = new FormData();

    formData.append("file", selectedFile);

    try {
      const load = toast.loading('Loading...');
      toast.bind(load)
      const response = await fetch("http://localhost:3001/link-lists/upload", {
        method: "POST",
        body: formData,
      });
      toast.remove(load)

      if (response.ok) {
        const data = await response.json();

        toast.remove(load)

        toast.success('Enviado com sucesso!', {
          duration: 5000,
        });

        console.log(data.data);
        setData(data.data);

        setUploaded(true);
      } else {
        toast.error(`Erro ao chamar a API: ${response.statusText}`);
        console.error("Erro ao chamar a API:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao chamar a API:", error);
      toast.error(`Erro ao chamar a API: ${error}`);
    }
  };

  return (
    <div className={styles.card}>
      <form onSubmit={handleSubmit}>
        <div
          className={styles.uploadContainer}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
        <UploadSimple size={32} color="var(--primary)" />
        <p>Arraste e solte ou</p>
        <label htmlFor="fileInput" className={styles.uploadLabel}>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileSelect}
            className={styles.fileInput}
          />
          Selecionar arquivo
        </label>
        <p>Tamanho máximo do arquivo: 50MB, mínimo de linhas: 2</p>
        {selectedFile && (
          <div className={styles.selectedFiles}>
            <div className={styles.fileItem}>{selectedFile.name}</div>
          </div>
        )}
          
        </div>
        <div className={styles.endrow_align}>
          <button type="submit" className={styles.button}>Enviar</button>
        </div>
      </form>
    </div>
  );
};

export default UploadCard;
