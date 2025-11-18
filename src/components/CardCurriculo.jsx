import React, { useEffect, useState } from "react";
import {
  Card, CardContent, Typography, Box,
  IconButton, CircularProgress, Snackbar, Alert
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";

export default function CardCurriculo({ curriculoInputRef, handleCurriculoClick }) {
  const [curriculoFileName, setCurriculoFileName] = useState(""); // nome UUID+original
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const getOriginalName = (fileName) => {
    if (!fileName) return "";
    return fileName.replace(/^[0-9a-fA-F-]+-/, "");
  };

  const fetchCurriculo = async () => {
    try {
      const resp = await fetch("http://localhost:8080/api/curriculos", {
        method: "GET",
        credentials: "include",
      });

      if (!resp.ok) throw new Error("Erro ao buscar currículo");

      const data = await resp.json();
      setCurriculoFileName(data.filename || "");

    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurriculo();
  }, []);

  // Upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setSnackbarMessage("O arquivo deve ter no máximo 5MB.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8080/api/curriculos/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) throw new Error(await response.text());

      const data = await response.json();
      setCurriculoFileName(data.filename);

      setSnackbarMessage("Currículo enviado com sucesso!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

    } catch (err) {
      setSnackbarMessage(err.message);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);

    } finally {
      setIsUploading(false);
      e.target.value = null;
    }
  };

  // Download
  const handleDownload = async () => {
    if (!curriculoFileName) {
      setSnackbarMessage("Nenhum currículo para baixar.");
      setSnackbarSeverity("warning");
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/curriculos/download/${curriculoFileName}`,
        { method: "GET", credentials: "include" }
      );

      if (!response.ok) throw new Error("Erro no download");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = getOriginalName(curriculoFileName); // 🔹 baixa com nome original
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      setSnackbarMessage("Erro ao baixar currículo");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  // Delete
  const handleDelete = async () => {
    if (!curriculoFileName) {
      setSnackbarMessage("Nenhum currículo para excluir.");
      setSnackbarSeverity("warning");
      setSnackbarOpen(true);
      return;
    }

    const confirmDelete = window.confirm(
      `Excluir o currículo "${getOriginalName(curriculoFileName)}"?`
    );
    if (!confirmDelete) return;

    try {
      const resp = await fetch("http://localhost:8080/api/curriculos", {
        method: "DELETE",
        credentials: "include"
      });

      if (!resp.ok) throw new Error(await resp.text());

      setCurriculoFileName("");

      setSnackbarMessage("Currículo excluído com sucesso!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

    } catch (err) {
      setSnackbarMessage("Erro ao excluir currículo.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  return (
    <>
      <Card sx={{ flex: 1, borderRadius: 5, boxShadow: 4 }}>
        <CardContent sx={{ px: 5, py: 3 }}>

          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#006916" }}>
            Currículo
          </Typography>

          {loading ? (
            <CircularProgress size={22} sx={{ mt: 1 }} />

          ) : error ? (
            <Typography color="error">{error.message}</Typography>

          ) : curriculoFileName ? (
            <Typography sx={{ mt: 1 }}>
              {getOriginalName(curriculoFileName)}
            </Typography>

          ) : (
            <Typography sx={{ mt: 1, color: "#888" }}>
              Nenhum currículo anexado.
            </Typography>
          )}

          <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
            <input
              type="file"
              accept="application/pdf,.doc,.docx"
              style={{ display: "none" }}
              ref={curriculoInputRef}
              onChange={handleFileUpload}
            />

            <button
              type="button"
              onClick={handleCurriculoClick}
              disabled={isUploading || loading}
              style={{
                background: "#006916",
                color: "#fff",
                padding: "6px 18px",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              {isUploading ? "Enviando..." : curriculoFileName ? "Trocar currículo" : "Anexar currículo"}
            </button>

            <IconButton onClick={handleDownload} disabled={!curriculoFileName}>
              <DownloadIcon />
            </IconButton>

            <IconButton onClick={handleDelete} disabled={!curriculoFileName}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </CardContent>
      </Card>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
