import Head from "next/head";
import Link from "next/link";
import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { set } from "zod";

function MyDropzone(props:any) {
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    accept: {
      'video/mp4': ['.mp4', '.MP4'],
    },
    multiple: false,
    onDrop: props.onDrop
  })

  return (
    <div {...getRootProps()} className="min-w-[320px] h-72 p-6 flex justify-center align-center border-2 border-dashed rounded">
      <input {...getInputProps()}/>
      {
        isDragActive ?
          <p>Coloque os vídeos aqui ...</p> :
          <p>Mova para cá os vídeos ou selecione clicando</p>
      }
    </div>
  )
}
export default function Home() {
  const onDrop = useCallback((acceptedFiles:File[]) => {
    // Do something with the files
    console.log({acceptedFiles})
    setSelectedFile(acceptedFiles[0] as File)
  }, [])
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const uploadToYoutube = async () => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('file', selectedFile as File)
      const response = await fetch('http://localhost:3000/api/youtube', { // adicionar rota pro treco de upload
        // seria bom essa rota vincular a resposta do upload (url) ao video no banco
        method: 'POST',
        body: formData
      })
      const data = await response.json()
      
      console.log({data})
    } catch (error) {
      console.log(error)
      alert('Algo deu errado')
      setLoading(false)
    }
    setLoading(false)
  }

  const uploadToVimeo = async () => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('file', selectedFile as File)
      const response = await fetch('http://localhost:3000/api/vimeo', { // adicionar rota pro treco de upload
        // seria bom essa rota vincular a resposta do upload (url) ao video no banco
        method: 'POST',
        body: formData
      })
      const data = await response.json()
      
      console.log({data})
    } catch (error) {
      console.log(error)
      alert('Algo deu errado')
      setLoading(false)
    }
    setLoading(false)
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#fafafa] to-[#ffffff]">
        {
          selectedFile && (
            <div>
              <h3 className="text-2xl font-bold text-center">{selectedFile.name}</h3>
              <button disabled={loading} onClick={uploadToYoutube} className={`inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-red-900 text-white hover:bg-red-700 my-2.5 mx-2 ${loading && 'opacity-50'}`}>Fazer upload pro youtube</button>
              <button disabled={loading} onClick={uploadToVimeo} className={`inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-cyan-900 text-white hover:bg-cyan-700 my-2.5 mx-2 ${loading && 'opacity-50'}`}>Fazer upload pro vimeo</button>
            </div>
          )
        }
        <MyDropzone onDrop={onDrop}/>
      </main>
    </>
  );
}
