import FileList from "./comp/FileList";
import FileUpload from "./comp/FileUpload";
import FileUploadForm from "./comp/FileUploadForm";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Gestionnaire de fichiers</h1>
      <FileUploadForm />
      <FileList />
    </main>
  );
}
