import { useState } from "react";
import SubpageTemplate from "../components/SubpageTemplate";
import { Upload, FolderDown, Check, RefreshCw } from "lucide-react";

export default function FileDropbox() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSelectedFile(null);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1200);
  };

  return (
    <SubpageTemplate
      title="File Dropbox"
      breadcrumb={[
        { name: "Employee Corner", to: "/employee-corner" },
        { name: "File Dropbox", to: null },
      ]}
    >
      <div className="max-w-xl mx-auto space-y-6">
        <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-[#FF6600]">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-[#002B5E]">
                Upload File
              </h2>
              <p className="text-xs text-gray-500">
                Select a document to upload to the secure server
              </p>
            </div>
          </div>

          {isSuccess && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold p-3.5 rounded-lg flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              File uploaded successfully!
            </div>
          )}

          <form onSubmit={handleUpload} className="space-y-4">
            {/* Upload Drop Zone */}
            <div>
              <div className="border-2 border-dashed border-slate-200 hover:border-[#002B5E] rounded-xl p-8 text-center cursor-pointer transition-all bg-slate-50/50 relative">
                <input
                  type="file"
                  required
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <FolderDown className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                {selectedFile ? (
                  <p className="text-xs text-[#002B5E] font-black truncate px-4">
                    {selectedFile.name} ({(selectedFile.size / 1024).toFixed(0)} KB)
                  </p>
                ) : (
                  <p className="text-xs text-gray-500 font-semibold">
                    Drag & drop file here, or click to browse
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={!selectedFile || isLoading}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-xs font-bold text-white bg-[#002B5E] hover:bg-[#001D40] disabled:bg-slate-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-all shadow-sm cursor-pointer"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Uploading file...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Upload File
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </SubpageTemplate>
  );
}
