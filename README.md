#
import React, { useState } from "react";
// Site FelizDiaDosNamorados.com
// React + Tailwind + QR Code Generator - Página Finalizada

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import QRCode from "qrcode.react";

export default function AmorPage() {
  const [mensagem, setMensagem] = useState("");
  const [linkMusica, setLinkMusica] = useState("");
  const [foto, setFoto] = useState(null);
  const [urlGerada, setUrlGerada] = useState("");
  const [mostrarQR, setMostrarQR] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const gerarPagina = () => {
    const dados = {
      mensagem,
      linkMusica,
      foto,
    };
    const blob = new Blob([JSON.stringify(dados)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    setUrlGerada(url);
    setMostrarQR(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-pink-300 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-extrabold text-pink-800 mb-6 drop-shadow">💘 Feliz Dia dos Namorados 💘</h1>
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-xl">
        <Input
          type="text"
          placeholder="Escreva sua mensagem de amor"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          className="mb-4"
        />
        <Input
          type="text"
          placeholder="Link da música (YouTube, Spotify...)"
          value={linkMusica}
          onChange={(e) => setLinkMusica(e.target.value)}
          className="mb-4"
        />
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4"
        />
        <Button onClick={gerarPagina} className="w-full bg-pink-600 hover:bg-pink-700 text-white text-lg">
          💝 Gerar Página com QR Code
        </Button>
      </div>

      {mostrarQR && (
        <div className="mt-10 bg-white rounded-xl shadow p-6 text-center">
          <h2 className="text-2xl font-semibold text-pink-700 mb-4">Escaneie com amor 💞</h2>
          <QRCode value={urlGerada} size={200} />
          <p className="mt-4 text-sm text-gray-600">
            Ou <a href={urlGerada} className="text-pink-600 underline" target="_blank">clique aqui</a> para abrir a surpresa
          </p>
        </div>
      )}
    </div>
  );
}
