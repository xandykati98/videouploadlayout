import Head from "next/head";
import Link from "next/link";
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

function MyDropzone() {
  const onDrop = useCallback((acceptedFiles:any) => {
    // Do something with the files
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    accept: {
      'video/mp4': ['.mp4', '.MP4'],
    },
    onDrop
  })

  return (
    <div {...getRootProps()} className="min-w-[320px] h-72 p-6 flex justify-center align-center border-solid border-2 border-dashed rounded">
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
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#fafafa] to-[#ffffff]">
        <MyDropzone />
      </main>
    </>
  );
}
